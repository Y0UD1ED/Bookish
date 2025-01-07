package com.example.backend.configs;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.authentication.JwtAuthentication;
import com.example.backend.utils.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String mail = null;
        Integer id=null;
        String jwt = null;
        String role=null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            if(!jwt.equals("null")&&!jwt.equals("undefined")){
            try {
                mail = jwtTokenUtil.getMail(jwt);
                role=jwtTokenUtil.getRole(jwt);
                id=jwtTokenUtil.getId(jwt);
            } catch (ExpiredJwtException e) {
                System.out.println("Время жизни токена истекло!");
            } catch (SignatureException e) {
                System.out.println("Неправильная подпись!");
            }
        }}
        if (mail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            ExtendUserDetails userDetails = new ExtendUserDetails(id,mail, role);
            JwtAuthentication token=new JwtAuthentication(userDetails,null);
            SecurityContextHolder.getContext().setAuthentication(token);
        }
        filterChain.doFilter(request, response);
    }
}
