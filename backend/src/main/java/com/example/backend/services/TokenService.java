package com.example.backend.services;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.entities.Token;
import com.example.backend.repositories.TokenRepository;
import com.example.backend.utils.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public String generateAccessToken(ExtendUserDetails user) {
        return jwtTokenUtil.generateToken(user);

    }

    public String generateRefreshToken(ExtendUserDetails user) {
        String refreshToken = jwtTokenUtil.generateRefreshToken(user);
        Token token = tokenRepository.findById(user.getId()).orElse(new Token(user.getId(), ""));
        token.setRefreshToken(refreshToken);
        tokenRepository.save(token);
        return refreshToken;
    }

    public String generateAccessToken(String refreshToken) {
        String accessToken = null;
        ExtendUserDetails user = getUserFromToken(refreshToken);
        Token savedToken=tokenRepository.findById(user.getId()).orElse(new Token(user.getId(), ""));
        if (savedToken.getRefreshToken().equals(refreshToken)) {
            accessToken = jwtTokenUtil.generateToken(user);
        }
        return accessToken;
    }

    private ExtendUserDetails getUserFromToken(String token) {
        String roles = jwtTokenUtil.getRole(token);
        String mail = jwtTokenUtil.getMail(token);
        Integer id = jwtTokenUtil.getId(token);
        return new ExtendUserDetails(id, mail, roles);
    }

    public void deleteToken(Integer id) {
        tokenRepository.deleteById(id);
    }
}
