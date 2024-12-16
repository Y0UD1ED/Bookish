package com.example.backend.controllers;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.*;
import com.example.backend.entities.Moderation;
import com.example.backend.entities.Note;
import com.example.backend.services.AuthService;
import com.example.backend.services.ImageService;
import com.example.backend.services.ModerationService;
import com.example.backend.services.NoteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Validated
@AllArgsConstructor
@RequestMapping("/notes")
@RestController
public class NoteController {
    private final AuthService authService;
    private final NoteService noteService;
    private final ModerationService moderationService;

    @GetMapping("/my")
    public ResponseEntity<List<BookDto>> getMyNotes(@RequestParam String type){
        ExtendUserDetails user=authService.getUserFromContext();
        List<Note> notes=noteService.getStudentsNotes(type,user.getId());
        return ResponseEntity.ok(noteService.getBookDtoListFromNoteList(notes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getNote(@PathVariable(name = "id") int id){
        ExtendUserDetails user=authService.getUserFromContext();
        Note note=noteService.findNoteById(id, user.getId());
        Moderation moderation=moderationService.getModerationByNoteId(note.getId());
        return ResponseEntity.ok(noteService.getNoteResponseFromNoteAndModeration(note,moderation));
    }

    @GetMapping("/{id}/moderation")
    public ResponseEntity<ModerationDto> getModerationForNote(@PathVariable(name = "id") int id){
        Moderation moderation=moderationService.getModerationByNoteId(id);
        return ResponseEntity.ok(moderationService.getModerationDtoFromModeration(moderation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNote(@PathVariable(name = "id") int id,@RequestPart(required = false) MultipartFile image,@Valid @RequestPart("note") UpdateNoteRequest newNote){
        ExtendUserDetails user=authService.getUserFromContext();
        noteService.updateNote(id,newNote,image,user.getId());
        return ResponseEntity.ok("Запись успешна изменена!");
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNote(@Valid @RequestPart(value = "note") CreateNoteRequest createNoteRequest,@RequestPart(required = false) MultipartFile image){
        ExtendUserDetails user=authService.getUserFromContext();
        noteService.addNote(createNoteRequest, image,user.getId());
        return ResponseEntity.ok("Книга успешно добавлена в читательский дневник!");
    }
}
