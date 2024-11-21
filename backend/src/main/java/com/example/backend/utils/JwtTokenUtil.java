package com.example.backend.utils;

import com.example.backend.authentication.ExtendUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.lifetime}")
    private Duration lifetime;


    public String generateToken(ExtendUserDetails user){
        Map<String,Object> claims=new HashMap<>();
        claims.put("role",user.getRole());
        claims.put("id",user.getId());
        Date issuedDate=new Date();
        Date expiredDate=new Date(issuedDate.getTime()+lifetime.toMillis());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256,secret)
                .compact();
    }

    public String generateRefreshToken(ExtendUserDetails user) {
        Date issuedDate=new Date();
        Date expiredDate=new Date(issuedDate.getTime()+lifetime.toMillis());
        Map<String,Object> claims=new HashMap<>();
        claims.put("id",user.getId());
        claims.put("role",user.getRole());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256,secret)
                .compact();
    }

    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(secret).build().parseSignedClaims(token).getPayload();
    }

    public String getMail(String token){
        return  getAllClaimsFromToken(token).getSubject();
    }

    public Integer getId(String token){
        return  getAllClaimsFromToken(token).get("id",Integer.class);
    }

    public  String getRole(String token){return getAllClaimsFromToken(token).get("role",String.class);}
}
