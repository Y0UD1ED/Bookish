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

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ClassService classService;
    private final NoteService noteService;
    private final ShelfService shelfService;

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
        return userRepository.findById(userId).orElseThrow(()->new UserAlreadyExistsException("Пользователь не существует."));
    }

    public ExtendUserDetails createUser(User user){
        if(userRepository.existsByMail(user.getMail())){
            throw new UserAlreadyExistsException("Пользователь с такой почтой уже существует.");
        }
        user=userRepository.save(user);
        return new ExtendUserDetails(user.getId(),user.getMail(), user.getPassword(), user.getRole());
    }

    public User updateUserInfo(User user,UpdateUserDto updateUserDto){
        user.setFirstName(updateUserDto.getFirstName());
        user.setLastName(updateUserDto.getLastName());
        user.setMiddleName(updateUserDto.getMiddleName());
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
        return personalData;
    }

    private MyStudentProfileDto getStudentPersonalData(User user){
        StringBuilder sb =new StringBuilder(); //сделать что-то со значениями null
        sb.append(user.getLastName()).append(" ").append(user.getFirstName()).append(" ").append(user.getMiddleName());
        MyStudentProfileDto studentPersonalData=new MyStudentProfileDto(user.getId(),sb.toString(),user.getAbout(),user.getRole());
        List<Class> classes=classService.findFirst5ClassesByUser(user.getId());
        List<ClassDto> studentClasses=classService.getClassDtoListFromClassList(classes);
        List<BookDto> studentImportantBooks=classes.stream()
                .flatMap(c->c.getBooks().stream())
                .map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage()))
                .limit(5)
                .toList();
        List<Note> notes=noteService.getFirst5PersonalStudentsNotes(user.getId());
        List<BookDto> studentPersonalBooks=noteService.getBookDtoListFromNoteList(notes);
        List<Shelf> shelves=shelfService.findFirst5PersonalStudentShelfs(user.getId());
        List<ShelfDto> studentShelfs=shelfService.getShelfDtoListFromShelfList(shelves);
        studentPersonalData.setMyClasses(studentClasses);
        studentPersonalData.setMyImportantBooks(studentImportantBooks);
        studentPersonalData.setMyPersonalBooks(studentPersonalBooks);
        studentPersonalData.setMyShelfs(studentShelfs);
        return studentPersonalData;
    }

    private MyTeacherProfileDto getTeacherPersonalData(User user){
        StringBuilder sb =new StringBuilder(); //сделать что-то со значениями null
        sb.append(user.getLastName()).append(" ").append(user.getFirstName()).append(" ").append(user.getMiddleName());
        MyTeacherProfileDto teacherProfileDto=new MyTeacherProfileDto(user.getId(),sb.toString(),user.getAbout(),user.getRole());
        List<Class> classes=classService.findFirst5ClassesByUser(user.getId());
        List<ClassDto> teacherClasses=classService.getClassDtoListFromClassList(classes);
        teacherProfileDto.setMyClasses(teacherClasses);
        return teacherProfileDto;
    }

    public UpdateUserDto getUpdateUserDtoFromUser(User user){
        return new UpdateUserDto(user.getFirstName(), user.getLastName(), user.getMiddleName(), user.getAbout(), user.getMail(),"","");
    }
}
