package com.example.backend.services;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.entities.User;
import com.example.backend.exceptions.UserAlreadyExistsException;
import com.example.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.hibernate.mapping.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

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

    public ExtendUserDetails createUser(User user){
        if(userRepository.existsByMail(user.getMail())){
            throw new UserAlreadyExistsException("Пользователь с такой почтой уже существует.");
        }
        user=userRepository.save(user);
        return new ExtendUserDetails(user.getId(),user.getMail(), user.getPassword(), user.getRole());
    }
}
