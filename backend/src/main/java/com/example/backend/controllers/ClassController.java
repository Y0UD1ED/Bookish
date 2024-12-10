package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.*;
import com.example.backend.entities.Class;
import com.example.backend.services.AuthService;
import com.example.backend.services.ClassService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/classes")
public class ClassController {
    private final AuthService authService;
    private final ClassService classService;

    @GetMapping("/my")
    public ResponseEntity<List<ClassDto>> getMyClasses(){
        ExtendUserDetails user=authService.getUserFromContext();
        List<Class> classes=new ArrayList<>();
        if(user.getRole().equals("student")) {
            classes = classService.findClassesByUser(user.getId());
        }
        else if(user.getRole().equals("teacher")){
            classes=classService.findClassesByOwner(user.getId());
        }
        return ResponseEntity.ok(classService.getClassDtoListFromClassList(classes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassResponse> getClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getClassData(id, user.getId()));
    }

    @GetMapping("/{id}/progress/read_all")
    public ResponseEntity<ProgressDto> getDataForReadAllInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadAll(id, user.getId()));
    }

    @GetMapping("/{id}/progress/read_nothing")
    public ResponseEntity<ProgressDto> getDataForReadNothingInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadNothing(id, user.getId()));
    }

    @GetMapping("/{id}/progress/read_max")
    public ResponseEntity<ProgressDto> getDataForReadMaxClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadMax(id, user.getId()));
    }

    @GetMapping("/{id}/progress/read_min")
    public ResponseEntity<ProgressDto> getDataForReadMinClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadMin(id, user.getId()));
    }

    @GetMapping("/{id}/progress/read_avg")
    public ResponseEntity<ProgressDto> getDataForReadAvgClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadAvg(id, user.getId()));
    }


    @GetMapping("/{id}/books")
    public ResponseEntity<List<ClassBookResponse>> getBooksInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.findBooksProgressByClassId(id, user.getId()));
    }

    @GetMapping("/{id}/students")
    public ResponseEntity<List<ClassStudentResponse>> getStudentsInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.findStudentProgressByClassId(id, user.getId()));
    }

    @GetMapping("/{id}/books/{bookId}/progress/have_read")
    public ResponseEntity<ProgressDto> getDataForHaveReadBookInClass(@PathVariable(name = "id") int id,@PathVariable(name = "bookId") int bookId){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.findHaveReadBookProgressByClassIdAndBookId(id, bookId,user.getId()));
    }

    @GetMapping("/{id}/books/{bookId}/progress/is_reading")
    public ResponseEntity<ProgressDto> getDataForIsReadingBookInClass(@PathVariable(name = "id") int id,@PathVariable(name = "bookId") int bookId){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.findIsReadingBookProgressByClassIdAndBookId(id, bookId,user.getId()));
    }

    @GetMapping("/{id}/books/{bookId}/progress/want_read")
    public ResponseEntity<ProgressDto> getDataForWantReadingBookInClass(@PathVariable(name = "id") int id,@PathVariable(name = "bookId") int bookId){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.findWantReadBookProgressByClassIdAndBookId(id, bookId,user.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginClass(@RequestParam String code){
        ExtendUserDetails userDetails=authService.getUserFromContext();
        classService.addStudentInClass(userDetails.getId(), code);
        return ResponseEntity.ok("Вы были успешно добавлены в класс!");
    }
}
