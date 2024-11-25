package com.example.backend.services;

import com.example.backend.dtos.*;
import com.example.backend.entities.Book;
import com.example.backend.entities.Class;
import com.example.backend.entities.Note;
import com.example.backend.entities.User;
import com.example.backend.exceptions.BookNotFoundException;
import com.example.backend.exceptions.ClassNotFoundException;
import com.example.backend.exceptions.ClassToLoginError;
import com.example.backend.exceptions.NoAccessToClassException;
import com.example.backend.repositories.ClassRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ClassService {
    private final ClassRepository classRepository;


    public List<Class> findFirst5ClassesByUser(int userId){
        return classRepository.findTop5ByUserId(userId);
    }

    public List<Class> findFirst5ClassesByOwner(int owner){
        return classRepository.findTop5ByOwner(owner);
    }

    public List<Class> findClassesByUser(int userId){
        return classRepository.findClassesByUserId(userId);
    }

    public List<ClassDto> getClassDtoListFromClassList(List<Class> classes){
        return classes.stream().map(c->new ClassDto(c.getId(),c.getName(),c.getImage())).toList();
    }

    public void addStudentInClass(int studentId, String code){
        Class classIn=classRepository.findClassByCode(code);
        if(classIn==null){
            throw new ClassNotFoundException("К сожалению, не нашли никакой класс.");
        }
        if(classIn.getStudents().stream().anyMatch(s->s.getId()==studentId)){
            throw new ClassToLoginError("Вы уже добавлены в данный класс");
        }
        if(classIn.getOwner()==studentId){
            throw new ClassToLoginError("Вы являетесь владельцем данного класса");
        }
        User student=new User();
        student.setId(studentId);
        classIn.getStudents().add(student);
        classRepository.save(classIn);
    }

    public ClassResponse getClassData(int classId,int userId){
        ClassResponse classResponse=new ClassResponse();
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        List<StudentDto> studentDtos=students.stream()
                .map(s->new StudentDto(s.getId(),s.getLastName().concat(s.getFirstName()),s.getPhoto()))
                .toList();
        List<BookDto> bookDtos=myClass.getBooks().stream()
                .map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage()))
                .toList();
        int bookSize=myClass.getBooks().size();
        int studentSize=students.size();
        AtomicInteger allRead= new AtomicInteger(0);
        AtomicInteger nothingRead= new AtomicInteger(0);
        AtomicInteger minRead= new AtomicInteger(bookSize);
        AtomicInteger maxRead= new AtomicInteger(0);
        AtomicInteger avgRead= new AtomicInteger(0);
        if(bookSize>0) {
            Map<Integer, List<Note>> userNotes = myClass.getBooks().stream()
                    .flatMap(b -> b.getNotes().stream())
                    .collect(Collectors.groupingBy(Note::getUserId));
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                allRead.addAndGet(readCount == bookSize ? 1 : 0);
                nothingRead.addAndGet(readCount == 0 ? 1 : 0);
                readCount = readCount * 100 / bookSize;
                avgRead.addAndGet((int) readCount);
                minRead.set((int) Math.min(minRead.get(), readCount));
                maxRead.set((int) Math.max(maxRead.get(), readCount));
            });
        }
        if(studentSize>0){
            avgRead.set(avgRead.get()/studentSize);
            allRead.set(allRead.get()*100/studentSize);
            nothingRead.set(nothingRead.get()*100/studentSize);
        }
        classResponse.setId(classId);
        classResponse.setName(myClass.getName());
        classResponse.setCode(myClass.getCode());
        classResponse.setImage(myClass.getImage());
        classResponse.setStudentCount(students.size());
        classResponse.setStudents(studentDtos);
        classResponse.setBooks(bookDtos);
        classResponse.setAllRead(allRead.get());
        classResponse.setNothingRead(nothingRead.get());
        classResponse.setMaxRead(maxRead.get());
        classResponse.setMinRead(minRead.get());
        classResponse.setAvgRead(avgRead.get());
        return classResponse;
    }

    public ProgressDto getDataForReadAll(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        int bookSize=myClass.getBooks().size();
        AtomicInteger progress= new AtomicInteger(0);
        List<StudentDto> studentDtoList=new ArrayList<>();
        if(bookSize>0) {
            Map<Integer, List<Note>> userNotes = myClass.getBooks().stream()
                    .flatMap(b -> b.getNotes().stream())
                    .collect(Collectors.groupingBy(Note::getUserId));
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                if (readCount == bookSize) {
                    progress.incrementAndGet();
                    studentDtoList.add(students.stream()
                            .filter(s -> s.getId() == k)
                            .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                            .findFirst()
                            .orElse(new StudentDto()));
                }
            });
        }
        if(!students.isEmpty()){
            progress.set(progress.get()*100/students.size());
        }
        return new ProgressDto(progress.get(),studentDtoList);
    }

    public ProgressDto getDataForReadNothing(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        AtomicInteger progress = new AtomicInteger(0);
        List<StudentDto> studentDtoList=new ArrayList<>();
        if(!myClass.getBooks().isEmpty()) {
            Map<Integer, List<Note>> userNotes = myClass.getBooks().stream()
                    .flatMap(b -> b.getNotes().stream())
                    .collect(Collectors.groupingBy(Note::getUserId));
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                if (readCount == 0) {
                    progress.incrementAndGet();
                    studentDtoList.add(students.stream()
                            .filter(s -> s.getId() == k)
                            .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                            .findFirst()
                            .orElse(new StudentDto()));
                }
            });
        }
        if(!students.isEmpty()){
            progress.set(progress.get()*100/students.size());
        }
        return new ProgressDto(progress.get(),studentDtoList);
    }

    public ProgressDto getDataForReadMax(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        Map<Integer,List<Note>> userNotes=myClass.getBooks().stream()
                .flatMap(b->b.getNotes().stream())
                .collect(Collectors.groupingBy(Note::getUserId));
        int bookSize=myClass.getBooks().size();
        AtomicInteger progress = new AtomicInteger(0);
        AtomicReference<List<StudentDto>> studentDtoList= new AtomicReference<>(new ArrayList<>());
        if(bookSize>0) {
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                if (readCount > progress.get()) {
                    progress.set((int) readCount);
                    studentDtoList.set(new ArrayList<>());
                }
                if (readCount >= progress.get()) {
                    studentDtoList.get().add(students.stream()
                            .filter(s -> s.getId() == k)
                            .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                            .findFirst()
                            .orElse(new StudentDto()));
                }
            });
            progress.set(progress.get()*100/bookSize);
        }

        return new ProgressDto(progress.get(),studentDtoList.get());
    }

    public ProgressDto getDataForReadMin(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        Map<Integer,List<Note>> userNotes=myClass.getBooks().stream()
                .flatMap(b->b.getNotes().stream())
                .collect(Collectors.groupingBy(Note::getUserId));
        int bookSize=myClass.getBooks().size();
        AtomicInteger progress = new AtomicInteger(0);
        AtomicReference<List<StudentDto>> studentDtoList= new AtomicReference<>(new ArrayList<>());
        if(bookSize>0) {
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                if (readCount < progress.get()) {
                    progress.set((int) readCount);
                    studentDtoList.set(new ArrayList<>());
                }
                if (readCount <= progress.get()) {
                    studentDtoList.get().add(students.stream()
                            .filter(s -> s.getId() == k)
                            .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                            .findFirst()
                            .orElse(new StudentDto()));
                }
            });
            progress.set(progress.get() * 100 / bookSize);
        }
        return new ProgressDto(progress.get(),studentDtoList.get());
    }

    public int getDataForReadAvg(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        Map<Integer,List<Note>> userNotes=myClass.getBooks().stream()
                .flatMap(b->b.getNotes().stream())
                .collect(Collectors.groupingBy(Note::getUserId));
        int bookSize=myClass.getBooks().size();
        AtomicInteger progress = new AtomicInteger(0);
        if(bookSize>0) {
            userNotes.forEach((k, v) -> {
                long readCount = v.stream().filter(n -> n.getReadingStatus().equals("прочитал")).count();
                readCount=readCount*100/bookSize;
                progress.addAndGet((int) readCount);
            });
        }
        if(!students.isEmpty()){
            progress.set(progress.get()/students.size());
        }
        return progress.get();
    }

    public List<ClassBookResponse> findBooksProgressByClassId(int classId, int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        if(myClass.getStudents().stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        AtomicInteger studentSize=new AtomicInteger(myClass.getStudents().size());
        List<ClassBookResponse> classBookResponseList =new ArrayList<>();
        if(studentSize.get()==0) {
            studentSize.set(1);
        }
        myClass.getBooks().forEach(b->{
            int haveRead=(int)b.getNotes().stream()
                    .filter(n->n.getReadingStatus().equals("прочитал"))
                    .count();
            haveRead=haveRead*100/studentSize.get();
            int isReading=(int)b.getNotes().stream()
                    .filter(n->n.getReadingStatus().equals("читаю"))
                    .count();
            isReading=isReading*100/studentSize.get();
            int wantToRead=(int)b.getNotes().stream()
                    .filter(n->n.getReadingStatus().equals("планирую читать"))
                    .count();
            wantToRead=wantToRead*100/studentSize.get();
            classBookResponseList.add(new ClassBookResponse(b.getId(),b.getName(),b.getAuthor(),b.getImage(),haveRead,isReading,wantToRead));
        });

        return classBookResponseList;
    }

    public ProgressDto findHaveReadBookProgressByClassIdAndBookId(int classId,int bookId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        int studentSize=students.size();
        List<StudentDto> studentDtoList= new ArrayList<>();
        int haveRead=0;
        if(studentSize==0) {
            studentSize=1;
        }
        Book book=myClass.getBooks().stream()
                        .filter(b->b.getId()==bookId)
                        .findFirst().orElseThrow(()->new BookNotFoundException("Книга не найдена!"));
        studentDtoList=book.getNotes().stream()
                .filter(n -> n.getReadingStatus().equals("прочитал"))
                .map(n -> students.stream().filter(u -> u.getId() == n.getUserId()).findFirst().orElse(new User()))
                .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                .toList();
        haveRead=studentDtoList.size()*100/studentSize;
        return new ProgressDto(haveRead,studentDtoList);
    }

    public ProgressDto findIsReadingBookProgressByClassIdAndBookId(int classId,int bookId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        int studentSize=students.size();
        List<StudentDto> studentDtoList= new ArrayList<>();
        int isReading=0;
        if(studentSize==0) {
            studentSize=1;
        }
        Book book=myClass.getBooks().stream()
                .filter(b->b.getId()==bookId)
                .findFirst().orElseThrow(()->new BookNotFoundException("Книга не найдена!"));
        studentDtoList=book.getNotes().stream()
                .filter(n -> n.getReadingStatus().equals("читаю"))
                .map(n -> students.stream().filter(u -> u.getId() == n.getUserId()).findFirst().orElse(new User()))
                .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                .toList();
        isReading=studentDtoList.size()*100/studentSize;
        return new ProgressDto(isReading,studentDtoList);
    }

    public ProgressDto findWantReadBookProgressByClassIdAndBookId(int classId,int bookId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        int studentSize=students.size();
        List<StudentDto> studentDtoList= new ArrayList<>();
        int wantToRead=0;
        if(studentSize==0) {
            studentSize=1;
        }
        Book book=myClass.getBooks().stream()
                .filter(b->b.getId()==bookId)
                .findFirst().orElseThrow(()->new BookNotFoundException("Книга не найдена!"));
        studentDtoList=book.getNotes().stream()
                .filter(n -> n.getReadingStatus().equals("планирую читать"))
                .map(n -> students.stream().filter(u -> u.getId() == n.getUserId()).findFirst().orElse(new User()))
                .map(s -> new StudentDto(s.getId(), s.getLastName().concat(s.getFirstName()), s.getPhoto()))
                .toList();
        wantToRead=studentDtoList.size()*100/studentSize;
        return new ProgressDto(wantToRead,studentDtoList);
    }

    public List<ClassStudentResponse> findStudentProgressByClassId(int classId,int userId){
        Class myClass=classRepository.findById(classId).orElseThrow(()->new ClassNotFoundException("К сожалению, не нашли никакой класс."));
        List<User> students=myClass.getStudents();
        if(students.stream().noneMatch(s->s.getId()==userId)&&myClass.getOwner()!=userId){
            throw new NoAccessToClassException("Вы не являетесь учеником данного класса!");
        }
        Map<Integer,List<Note>> userNotes=myClass.getBooks().stream()
                .flatMap(b->b.getNotes().stream())
                .collect(Collectors.groupingBy(Note::getUserId));
        List<ClassStudentResponse> studentResponseList=new ArrayList<>();
        AtomicInteger bookSize=new AtomicInteger(myClass.getBooks().size());
        if(bookSize.get()==0){
            bookSize.set(1);
        }
        userNotes.forEach((k,v)->{
            int haveRead=(int)v.stream()
                    .filter(n->n.getReadingStatus().equals("прочитал"))
                    .count();
            haveRead=haveRead*100/bookSize.get();
            int isReading=(int)v.stream()
                    .filter(n->n.getReadingStatus().equals("читаю"))
                    .count();
            isReading=isReading*100/bookSize.get();
            int wantToRead=(int)v.stream()
                    .filter(n->n.getReadingStatus().equals("планирую читать"))
                    .count();
            wantToRead=wantToRead*100/bookSize.get();
            User user=students.stream()
                            .filter(u->u.getId()==k)
                            .findFirst().orElse(new User());
            StringBuilder sb =new StringBuilder(); //сделать что-то со значениями null
            sb.append(user.getLastName()).append(" ").append(user.getFirstName()).append(" ").append(user.getMiddleName());
            studentResponseList.add(new ClassStudentResponse(user.getId(),sb.toString(),user.getPhoto(),haveRead,isReading,wantToRead));
        });
        return studentResponseList;
    }

}
