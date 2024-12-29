package com.example.backend.services;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.*;
import com.example.backend.entities.*;
import com.example.backend.entities.Class;
import com.example.backend.exceptions.UserAlreadyExistsException;
import com.example.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ClassService classService;
    private final NoteService noteService;
    private final ShelfService shelfService;
    private final ImageService imageService;
    private final NotificationService notificationService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByMail(username);
        if(user==null){
            throw new UsernameNotFoundException(String.format("User '%s' not founded", username));
        }
        return new ExtendUserDetails(user.getId(),user.getMail(), user.getPassword(), user.getRole());
    }

    public User findByMail(String mail) {
        return userRepository.findByMail(mail);
    }

    public User findById(int userId ){
        return userRepository.findById(userId).orElseThrow(()->new UsernameNotFoundException("Пользователь не существует."));
    }

    public ExtendUserDetails createUser(User user){
        if(userRepository.existsByMail(user.getMail())){
            throw new UserAlreadyExistsException("Пользователь с такой почтой уже существует.");
        }
        user=userRepository.save(user);
        return new ExtendUserDetails(user.getId(),user.getMail(), user.getPassword(), user.getRole());
    }

    public User updateUserInfo(User user, UpdateUserDto updateUserDto, MultipartFile file){
        user.setFirstName(updateUserDto.getFirstName());
        user.setLastName(updateUserDto.getLastName());
        user.setMiddleName(updateUserDto.getMiddleName());
        if(updateUserDto.getImage().isEmpty()){
            updateUserDto.setImage(imageService.uploadImage(file));
            imageService.deleteImage(user.getPhoto());
        }
        user.setPhoto(updateUserDto.getImage());
        if(!user.getMail().equals(updateUserDto.getMail())){
            user.setActivated(false);
            user.setMail(updateUserDto.getMail());
        }
        return userRepository.save(user);
    }

    public MyProfileDto findPersonalDataById(int userId){
        MyProfileDto personalData=null;
        User user=userRepository.findById(userId).orElse(null);
        if(user==null){
            throw new UsernameNotFoundException(String.format("User not founded"));
        }
        switch (user.getRole()){
            case "student"->personalData=getStudentPersonalData(user);
            case "teacher"->personalData=getTeacherPersonalData(user);
            case "moderator"->personalData=null;
            default -> throw new RuntimeException("Неопределенная роль у пользователя");
        }
        personalData.setNotificationCount(notificationService.getUserNotification(user.getId()).size());
        return personalData;
    }

    private MyStudentProfileDto getStudentPersonalData(User user){
        MyStudentProfileDto studentPersonalData=new MyStudentProfileDto(user.getId(),user.getFullName(), user.getPhoto(),user.getAbout(),user.getRole());
        List<Class> classes=classService.findFirst5ClassesByUser(user.getId());
        List<ClassDto> studentClasses=classService.getClassDtoListFromClassList(classes);
        List<BookDto> studentImportantBooks=noteService.getImportantStudentsNotes(user.getId()).stream()
                .limit(5)
                .map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage()))
                .toList();
        List<Note> notes=noteService.getPersonalStudentsNotes(user.getId()).stream()
                .limit(5)
                .toList();
        List<BookDto> studentPersonalBooks=noteService.getBookDtoListFromNoteList(notes);
        List<Shelf> shelves=shelfService.findPersonalStudentShelfs(user.getId()).stream()
                .limit(5)
                .toList();
        List<ShelfDto> studentShelfs=shelfService.getShelfDtoListFromShelfList(shelves);
        studentPersonalData.setMyClasses(studentClasses);
        studentPersonalData.setMyImportantBooks(studentImportantBooks);
        studentPersonalData.setMyPersonalBooks(studentPersonalBooks);
        studentPersonalData.setMyShelfs(studentShelfs);
        return studentPersonalData;
    }

    private MyTeacherProfileDto getTeacherPersonalData(User user){
        MyTeacherProfileDto teacherProfileDto=new MyTeacherProfileDto(user.getId(), user.getFullName(), user.getPhoto(),user.getAbout(),user.getRole());
        List<Class> classes=classService.findClassesByOwner(user.getId()).stream().limit(5).toList();
        List<ClassDto> teacherClasses=classService.getClassDtoListFromClassList(classes);
        teacherProfileDto.setMyClasses(teacherClasses);
        return teacherProfileDto;
    }

    public UpdateUserDto getUpdateUserDtoFromUser(User user){
        return new UpdateUserDto(user.getFirstName(), user.getLastName(), user.getMiddleName(),user.getPhoto(), user.getAbout(), user.getMail(),"","");
    }

    public UserDto getStudentData(int studentId) {
        User user=findById(studentId);
        UserDto student=null;
        if(user.getRole().equals("teacher")){
            throw new UsernameNotFoundException("Студент не найден!");
        }
        List<BookDto> studentImportantBooks=noteService.getImportantStudentsNotes(studentId).stream()
                .limit(5)
                .map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage()))
                .toList();
        List<Note> notes=noteService.getPersonalStudentsNotes(studentId).stream()
                .filter(n->!n.isHidden())
                .limit(5)
                .toList();
        List<BookDto> studentPersonalBooks=noteService.getBookDtoListFromNoteList(notes);
        List<Shelf> shelves=shelfService.findPersonalStudentShelfs(studentId).stream()
                .filter(s->!s.isHidden())
                .limit(5)
                .toList();
        List<ShelfDto> studentShelfs=shelfService.getShelfDtoListFromShelfList(shelves);
        student=new UserDto(user.getId(), user.getFullName(), user.getPhoto(), user.getAbout(), studentShelfs,studentPersonalBooks,studentImportantBooks);
        return student;
    }
}
