package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.BookDto;
import com.example.backend.dtos.UpdateBookDto;
import com.example.backend.entities.Book;
import com.example.backend.entities.Note;
import com.example.backend.services.AuthService;
import com.example.backend.services.BookService;
import com.example.backend.services.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/books")
@RestController
public class BookController {
    private final BookService bookService;

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBook(@PathVariable("id") int id, @RequestPart MultipartFile file, @RequestPart UpdateBookDto book){
        bookService.updateBook(id,book,file);
        return ResponseEntity.ok("Кинга успешно изменена!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") int id){
        bookService.deleteBook(id);
        return ResponseEntity.ok("Кинга удалена!");
    }

    @PostMapping("/list/parse")
    public ResponseEntity<List<BookDto>> parseBookList(@RequestPart MultipartFile file){
        return ResponseEntity.ok(bookService.getBookDtoListFromWordDoc(file));
    }



}
