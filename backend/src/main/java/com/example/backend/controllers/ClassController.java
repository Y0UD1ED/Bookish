package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.ClassDto;
import com.example.backend.dtos.ClassResponse;
import com.example.backend.dtos.ProgressDto;
import com.example.backend.entities.Class;
import com.example.backend.services.AuthService;
import com.example.backend.services.ClassService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<Class> classes=classService.findClassesByUser(user.getId());
        return ResponseEntity.ok(classService.getClassDtoListFromClassList(classes));
    }

    @GetMapping("/my/{id}")
    public ResponseEntity<ClassResponse> getClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getClassData(id, user.getId()));
    }

    @GetMapping("/my/{id}/progress/read_all")
    public ResponseEntity<ProgressDto> getDataForReadAllInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadAll(id, user.getId()));
    }

    @GetMapping("/my/{id}/progress/read_nothing")
    public ResponseEntity<ProgressDto> getDataForReadNothingInClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadNothing(id, user.getId()));
    }

    @GetMapping("/my/{id}/progress/read_max")
    public ResponseEntity<ProgressDto> getDataForReadMaxClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadMax(id, user.getId()));
    }

    @GetMapping("/my/{id}/progress/read_min")
    public ResponseEntity<ProgressDto> getDataForReadMinClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadMin(id, user.getId()));
    }

    @GetMapping("/my/{id}/progress/read_avg")
    public ResponseEntity<Integer> getDataForReadAvgClass(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(classService.getDataForReadAvg(id, user.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginClass(@RequestParam String code){
        ExtendUserDetails userDetails=authService.getUserFromContext();
        classService.addStudentInClass(userDetails.getId(), code);
        return ResponseEntity.ok("Вы были успешно добавлены в класс!");
    }
}
