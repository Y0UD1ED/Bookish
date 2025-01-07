package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.MyProfileDto;
import com.example.backend.dtos.NotificationDto;
import com.example.backend.dtos.UpdateUserDto;
import com.example.backend.dtos.UserDto;
import com.example.backend.entities.Notification;
import com.example.backend.entities.User;
import com.example.backend.services.AuthService;
import com.example.backend.services.NotificationService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Validated
@AllArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    private final NotificationService notificationService;

    @GetMapping("/me")
    public ResponseEntity<MyProfileDto> getMyProfileData(){
        ExtendUserDetails userDetails=authService.getUserFromContext();
        return ResponseEntity.ok(userService.findPersonalDataById(userDetails.getId()));
    }

    @GetMapping("/me/notifications")
    public ResponseEntity<List<NotificationDto>> getMyNotifications(){
        ExtendUserDetails userDetails=authService.getUserFromContext();
        List<Notification> notifications=notificationService.getUserNotification(userDetails.getId());
        return ResponseEntity.ok(notificationService.getNotificationDtoListFromNotifications(notifications));
    }

    @PutMapping("/me/update")
    public ResponseEntity<String> updateMyInfo(@Valid @RequestPart("user") UpdateUserDto updatedUser, @RequestPart(value = "image",required = false) MultipartFile file){
        ExtendUserDetails user=authService.getUserFromContext();
        User oldUser=userService.findById(user.getId());
        String passwordNew=authService.changeUserPassword(oldUser.getPassword(),updatedUser.getPassword(),updatedUser.getPasswordNew());
        oldUser.setPassword(passwordNew);
        User updatedUserInfo=userService.updateUserInfo(oldUser, updatedUser,file);
        return ResponseEntity.ok("Ваши данные успешно изменены.");
    }

    @GetMapping("/me/update")
    public ResponseEntity<UpdateUserDto> getMyInfo(){
        ExtendUserDetails user=authService.getUserFromContext();
        User userInfo=userService.findById(user.getId());
        return ResponseEntity.ok(userService.getUpdateUserDtoFromUser(userInfo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable int id){
        return ResponseEntity.ok(userService.getStudentData(id));
    }


}
