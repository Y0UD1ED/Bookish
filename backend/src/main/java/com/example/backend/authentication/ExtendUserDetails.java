package com.example.backend.authentication;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;

public class ExtendUserDetails extends User {
    private int id;
    private String role;

    public ExtendUserDetails(Integer id, String username, String password, String authority) {
        super(username, password, Collections.singleton(new SimpleGrantedAuthority(authority)));
        this.id=id;
        this.role=authority;
    }

    public ExtendUserDetails(Integer id, String username, String authority) {
        super(username,"null", Collections.singleton(new SimpleGrantedAuthority(authority)));
        this.id=id;
        this.role=authority;
    }



    public ExtendUserDetails(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, String authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, Collections.singleton(new SimpleGrantedAuthority(authorities)));
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
