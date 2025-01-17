package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.*;
import com.example.backend.entities.Shelf;
import com.example.backend.services.AuthService;
import com.example.backend.services.ShelfService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Validated
@AllArgsConstructor
@RequestMapping("/shelfs")
@RestController
public class ShelfController {
    private final AuthService authService;
    private final ShelfService shelfService;

    @GetMapping("/my")
    public ResponseEntity<List<ShelfDto>> getMyShelfs(){
        ExtendUserDetails user=authService.getUserFromContext();
        List<Shelf> shelfs=shelfService.findPersonalStudentShelfs(user.getId());
        return ResponseEntity.ok(shelfService.getShelfDtoListFromShelfList(shelfs));
    }

    @GetMapping
    public ResponseEntity<List<ShelfDto>> getStundetShelfs(@RequestParam("user") int id){
        List<Shelf> shelfs=shelfService.findPersonalStudentShelfs(id).stream()
                .filter(s->!s.isHidden())
                .toList();
        return ResponseEntity.ok(shelfService.getShelfDtoListFromShelfList(shelfs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BigShelfDto> getShelf(@PathVariable("id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        Shelf shelf=shelfService.getShelfById(id, user.getId());
        return ResponseEntity.ok(shelfService.getBigShelfDtoFromShelf(shelf));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateShelf(@PathVariable("id") int id, @Valid @RequestPart("shelf") UpdateShelfDto newShelf, @RequestPart(required = false) MultipartFile image){
        ExtendUserDetails user=authService.getUserFromContext();
        shelfService.updateShelf(id,newShelf, image,user.getId());
        return ResponseEntity.ok("Полка была успешно изменена!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShelf(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        shelfService.deleteShelf(id,user.getId());
        return ResponseEntity.ok("Полка была успешно удалена");
    }

    @GetMapping("/{id}/notes/excluded")
    public ResponseEntity<List<BookDto>> getExcludedNotesInShelf(@PathVariable("id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        return ResponseEntity.ok(shelfService.getExcludedNotesInShelf(id, user.getId()));

    }

    @PutMapping("/{id}/notes")
    public ResponseEntity<String> addNotesInShelf(@RequestBody List<Integer> notes,@PathVariable("id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        shelfService.addNotesInShelf(id,notes,user.getId());
        return ResponseEntity.ok("В полку были успешно добавлены книги!");
    }

    @DeleteMapping("/{id}/notes")
    public ResponseEntity<String> deleteNotesInShelf(@PathVariable(name = "id") int id,@RequestBody List<Integer> notes){
        ExtendUserDetails user=authService.getUserFromContext();
        shelfService.deleteNotesInShelf(id,notes,user.getId());
        return ResponseEntity.ok("Записи были успешно удалены из полки!");
    }

    @PostMapping("/create")
    public ResponseEntity<String> createShelf(@Valid @RequestPart(value = "shelf") CreateShelfRequest createShelfRequest,@RequestPart(required = false) MultipartFile image){
        ExtendUserDetails user=authService.getUserFromContext();
        shelfService.addShelf(createShelfRequest,image, user.getId());
        return ResponseEntity.ok("Полка успешно создана!");
    }
}
