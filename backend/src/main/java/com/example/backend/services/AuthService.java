package com.example.backend.services;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.authentication.JwtAuthentication;
import com.example.backend.dtos.AuthRequest;
import com.example.backend.dtos.JwtResponse;
import com.example.backend.dtos.RefreshJwtRequest;
import com.example.backend.dtos.RegRequest;
import com.example.backend.entities.User;
import com.example.backend.exceptions.PasswordsDoNotMatchException;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@AllArgsConstructor
@Service
public class AuthService {
    private final UserService userService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public JwtResponse login(AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getMail(), authRequest.getPassword()));
        ExtendUserDetails user = (ExtendUserDetails) authentication.getPrincipal();
        String accessToken = tokenService.generateAccessToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);
        return new JwtResponse(accessToken, refreshToken);
    }

    public JwtResponse getAccessToken(String refreshToken) {
        String accessToken=tokenService.generateAccessToken(refreshToken);
        return new JwtResponse(accessToken, null);
    }


   public JwtResponse regUser(RegRequest regRequest){
        if(!(regRequest.getPassword().equals(regRequest.getPasswordRepeat()))){
            throw new PasswordsDoNotMatchException("Пароли не совпадают");
        }
        User user=new User(passwordEncoder.encode(regRequest.getPassword()), regRequest.getMail(), regRequest.getRole(), regRequest.getLastName(), regRequest.getFirstName());
        ExtendUserDetails userDetails=userService.createUser(user);
        String accessToken = tokenService.generateAccessToken(userDetails);
        String refreshToken = tokenService.generateRefreshToken(userDetails);
        return new JwtResponse(accessToken, refreshToken);
    }

    public String changeUserPassword(String password,String passwordOld,String passwordNew) {
        if(passwordOld.isEmpty()&&passwordNew.isEmpty()){
            return password;
        }
        if(passwordNew.length()<6){
            throw new ValidationException("Слишком короткий пароль");
        }
        if(!passwordEncoder.matches(passwordOld,password)){
            throw new PasswordsDoNotMatchException("Текущий пароль не совпадает");
        }
        return passwordEncoder.encode(passwordNew);
    }

    public void logout() {
        ExtendUserDetails user=getUserFromContext();
        tokenService.deleteToken(user.getId());
    }

    public ExtendUserDetails getUserFromContext(){
        JwtAuthentication authentication= (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
        return (ExtendUserDetails) authentication.getPrincipal();
    }



}
