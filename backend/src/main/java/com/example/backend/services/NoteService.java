package com.example.backend.services;

import com.example.backend.dtos.BookDto;
import com.example.backend.dtos.CreateNoteRequest;
import com.example.backend.dtos.NoteResponse;
import com.example.backend.dtos.UpdateNoteRequest;
import com.example.backend.entities.Moderation;
import com.example.backend.entities.Note;
import com.example.backend.exceptions.NotOwnerForNoteException;
import com.example.backend.exceptions.NoteNotFoundException;
import com.example.backend.repositories.NoteRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public List<Note> getFirst5PersonalStudentsNotes(int studentId){
        return noteRepository.findTop5ByUserIdAndBookId(studentId,null);
    }

    public List<Note> getPersonalStudentsNotes(int studentId){
        return noteRepository.findNotesByUserIdAndBookId(studentId,null);
    }

    public List<BookDto> getBookDtoListFromNoteList(List<Note> notes){
        return notes.stream().map(n->new BookDto(n.getId(),n.getName(),n.getAuthor(),n.getImage())).toList();
    }

    public void addNote(CreateNoteRequest createNoteRequest, int userId) {
        Note note=new Note(userId,
                null,
                createNoteRequest.getName(),
                createNoteRequest.getAuthor(),
                createNoteRequest.getImage(),
                createNoteRequest.isHidden());
        noteRepository.save(note);
    }

    public List<Note> findNotesByIds(List<Integer> ids){
        return noteRepository.findAllById(ids); //подумать над тем, что кто-то может получить чужие записи!!!!
    }
    public Note findNoteById(int noteId,int userId){
        Note note=noteRepository.findById(noteId).orElseThrow(()->new NoteNotFoundException("Запись не найдена!"));
        if(note.getUserId()!=userId&&note.isHidden()&&note.getBookId()==null){
            throw new NotOwnerForNoteException("Вы не можете посмотреть данную полку!");
        }
        return note;
    }

    public NoteResponse getNoteResponseFromNoteAndModeration(Note note,Moderation moderation){
        boolean isModerationPassed=true;
        if(moderation!=null){
            isModerationPassed=moderation.getStatus()!=-1;
        }
        return new NoteResponse(note.getId(),
                note.getName(),
                note.getAuthor(),
                note.getImage(),
                note.getReadingStatus(),
                note.getGenre(),
                note.getStartDate(),
                note.getEndDate(),
                note.getHeroes(),
                note.getPlot(),
                note.getMessage(),
                note.getOpinion(),
                note.isHidden(),
                note.getBookId()!=null,
                isModerationPassed);
    }

    public void updateNote(int noteId,UpdateNoteRequest newNote, int userId) {
        Note note=noteRepository.findById(noteId).orElseThrow(()->new NoteNotFoundException("Запись не найдена!"));
        if(note.getUserId()!=userId){
            throw new NotOwnerForNoteException("Вы не можете изменить данную полку!");
        }
        note.setImage(newNote.getImage());
        note.setName(newNote.getName());
        note.setAuthor(newNote.getAuthor());
        note.setReadingStatus(newNote.getReadingStatus());
        note.setHidden(newNote.isHidden());
        note.setStartDate(newNote.getStartDate());
        note.setEndDate(newNote.getEndDate());
        note.setGenre(newNote.getGenre());
        note.setHeroes(newNote.getHeroes());
        note.setPlot(newNote.getPlot());
        note.setMessage(newNote.getMessage());
        note.setOpinion(newNote.getOpinion());
        noteRepository.save(note);
    }

}
