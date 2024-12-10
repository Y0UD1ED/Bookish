package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.BookDto;
import com.example.backend.entities.Book;
import com.example.backend.entities.Note;
import com.example.backend.services.AuthService;
import com.example.backend.services.BookService;
import com.example.backend.services.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/books")
@RestController
public class BookController {
    private final AuthService authService;
    private final BookService bookService;
    private final NoteService noteService;

    @GetMapping("/my")
    public ResponseEntity<List<BookDto>> getMyBooks(){
        ExtendUserDetails user=authService.getUserFromContext();
        List<Note> notes=noteService.getImportantStudentsNotes(user.getId());
        return ResponseEntity.ok(noteService.getBookDtoListFromNoteList(notes));
    }


}
