package com.example.backend.services;

import com.example.backend.dtos.BookDto;
import com.example.backend.dtos.CreateNoteRequest;
import com.example.backend.dtos.NoteResponse;
import com.example.backend.dtos.UpdateNoteRequest;
import com.example.backend.entities.Book;
import com.example.backend.entities.Moderation;
import com.example.backend.entities.Note;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotOwnerForNoteException;
import com.example.backend.exceptions.NoteNotFoundException;
import com.example.backend.repositories.NoteRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final ImageService imageService;
    private final SimpleDateFormat dateFormat=new SimpleDateFormat("dd.MM.yyyy");

    public List<Note> getPersonalStudentsNotes(int studentId){
        return noteRepository.findNotesByUserIdAndBookId(studentId,null);
    }

    public List<Note> getImportantStudentsNotes(int studentId){
        return noteRepository.findNotesByUserIdAndBookIdIsNotNull(studentId);
    }

    public List<Note> getAllStudentsNotes(int studentId){
        return noteRepository.findNotesByUserId(studentId);
    }

    public List<BookDto> getBookDtoListFromNoteList(List<Note> notes){
        return notes.stream().map(n->new BookDto(n.getId(),n.getName(),n.getAuthor(),n.getImage())).toList();
    }

    public void addNote(CreateNoteRequest createNoteRequest, MultipartFile image, int userId) {
        if(createNoteRequest.getImage().isEmpty()){
            createNoteRequest.setImage(imageService.uploadImage(image));
        }
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
            throw new NotOwnerForNoteException("Вы не можете посмотреть данную запись!");
        }
        return note;
    }

    public NoteResponse getNoteResponseFromNoteAndModeration(Note note,Moderation moderation){
        boolean isModerationPassed=true;
        if(moderation!=null){
            isModerationPassed=moderation.getStatus()!=-1;
        }

        String startDate="-";
        String endDate="-";
        if(note.getStartDate()!=null){
            startDate=dateFormat.format(note.getStartDate());
        }
        if(note.getEndDate()!=null){
           endDate=dateFormat.format(note.getEndDate());
        }
        return new NoteResponse(note.getId(),
                note.getUserId(),
                note.getName(),
                note.getAuthor(),
                note.getImage(),
                note.getReadingStatus(),
                note.getGenre(),
                startDate,
                endDate,
                note.getHeroes(),
                note.getPlot(),
                note.getMessage(),
                note.getOpinion(),
                note.isHidden(),
                note.getBookId()!=null,
                isModerationPassed);
    }

    public Note updateNote(Note note, UpdateNoteRequest newNote, MultipartFile image, int userId) {

        if(note.getUserId()!=userId){
            throw new NotOwnerForNoteException("Вы не можете изменить данную полку!");
        }
        if(newNote.getImage().isEmpty()){
            newNote.setImage(imageService.uploadImage(image));
            imageService.deleteImage(note.getImage());
        }
        String oldReadingStatus=note.getReadingStatus();
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
        return note;
    }

    public void addBooksForStudents(List<Book> books, List<User> students){
        List<Note> notes=students.stream()
                .flatMap(s->books.stream()
                        .map(b->new Note(s.getId(),b.getId(),b.getName(),b.getAuthor(),b.getImage(),false)))
                .toList();
        noteRepository.saveAll(notes);
    }

    public List<Note> getStudentsNotes(String type, int studentId) {
        List<Note> notes=new ArrayList<>();
        switch (type){
            case "personal":notes=getPersonalStudentsNotes(studentId);
            break;
            case "important":notes=getImportantStudentsNotes(studentId);
            break;
            case "all":notes=getAllStudentsNotes(studentId);
            break;
            default:break;
        }
        return notes;
    }

    public void makeUnimportant(List<Note> notes) {
        notes.forEach(n->n.setBookId(null));
        noteRepository.saveAll(notes);
    }
}
