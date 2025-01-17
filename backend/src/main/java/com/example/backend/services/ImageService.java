package com.example.backend.services;

import com.example.backend.exceptions.FileIsEmptyException;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@AllArgsConstructor
public class ImageService {

    private final String uploadDir = "uploads/";

    private String generateName(){
        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = true;
        return RandomStringUtils.random(length, useLetters, useNumbers);
    }

    public void deleteImage(String name) {
        try {
            if (Files.exists(Paths.get(uploadDir, name))) {
                Files.delete(Paths.get(uploadDir, name));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String uploadImage(MultipartFile file)  {
        try {
            if (!Files.exists(Paths.get(uploadDir))) {
                Files.createDirectories(Paths.get(uploadDir));
            }
            String name=file.getOriginalFilename();
            while (Files.exists(Paths.get(uploadDir,name))){
                name=generateName();
            }
            Path path = Paths.get(uploadDir, name);
            Files.write(path, file.getBytes());
            return name;
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return "defaultMessage";
    }

}
