package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.MyProfileDto;
import com.example.backend.dtos.UpdateUserDto;
import com.example.backend.entities.User;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@AllArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<MyProfileDto> getMyProfileData(){
        ExtendUserDetails userDetails=authService.getUserFromContext();
        return ResponseEntity.ok(userService.findPersonalDataById(userDetails.getId()));
    }

    @PutMapping("/me/update")
    public ResponseEntity<String> updateMyInfo(@Valid @RequestBody UpdateUserDto updatedUser){
        ExtendUserDetails user=authService.getUserFromContext();
        User oldUser=userService.findById(user.getId());
        String passwordNew=authService.changeUserPassword(oldUser.getPassword(),updatedUser.getPassword(),updatedUser.getPasswordNew());
        oldUser.setPassword(passwordNew);
        User updatedUserInfo=userService.updateUserInfo(oldUser, updatedUser);
        return ResponseEntity.ok("Ваши данные успешно изменены.");
    }

    @GetMapping("/me/update")
    public ResponseEntity<UpdateUserDto> getMyInfo(){
        ExtendUserDetails user=authService.getUserFromContext();
        User userInfo=userService.findById(user.getId());
        return ResponseEntity.ok(userService.getUpdateUserDtoFromUser(userInfo));
    }


}
