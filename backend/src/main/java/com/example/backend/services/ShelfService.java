package com.example.backend.services;

import com.example.backend.authentication.ExtendUserDetails;
import com.example.backend.dtos.*;
import com.example.backend.entities.Note;
import com.example.backend.entities.Shelf;
import com.example.backend.exceptions.NoAccessToShelf;
import com.example.backend.exceptions.NotOwnerForNoteException;
import com.example.backend.exceptions.ShelfNotFoundException;
import com.example.backend.repositories.ShelfRepository;
import lombok.AllArgsConstructor;
import org.apache.el.stream.Stream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Service
public class ShelfService {
    private final ShelfRepository shelfRepository;
    private final NoteService noteService;
    private final ImageService imageService;

    public List<Shelf> findFirst5PersonalStudentShelfs(int studentId){
        return shelfRepository.findTop5ByOwner(studentId);
    }

    public List<Shelf> findPersonalStudentShelfs(int studentId){
        return shelfRepository.findShelfsByOwner(studentId);
    }

    public Shelf getShelfById(int shelfId,int userId){
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.isHidden()&&shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете посмотреть данную полку!");
        }
        return shelf;
    }

    public List<BookDto> getExcludedNotesInShelf(int shelfId,int userId){
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете управлять данной полкой!");
        }
        List<Integer> shelfNote=shelf.getNotes().stream().map(Note::getId).toList();
        List<Note> notes=noteService.getPersonalStudentsNotes(userId);
        notes=notes.stream().filter(n->!shelfNote.contains(n.getId())).toList();
        return noteService.getBookDtoListFromNoteList(notes);
    }

    public List<ShelfDto> getShelfDtoListFromShelfList(List<Shelf> shelfs){
        return shelfs.stream().map(s->new ShelfDto(s.getId(),s.getName(),s.getImage())).toList();
    }

    public BigShelfDto getBigShelfDtoFromShelf(Shelf shelf){
        BigShelfDto bigShelfDto=new BigShelfDto();
        bigShelfDto.setId(shelf.getId());
        bigShelfDto.setOwner(shelf.getOwner());
        bigShelfDto.setDescription(shelf.getDescription());
        bigShelfDto.setName(shelf.getName());
        bigShelfDto.setImage(shelf.getImage());
        bigShelfDto.setHidden(shelf.isHidden());
        List<BookDto> books=shelf.getNotes().stream().map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage())).toList();
        bigShelfDto.setBooks(books);
        return bigShelfDto;
    }
    public void addShelf(CreateShelfRequest createShelfRequest, MultipartFile image,int userId){
        List<Note> notes=noteService.findNotesByIds(createShelfRequest.getBooks());
        if(notes.stream().anyMatch(n->n.getUserId()!=userId)){
            throw new NotOwnerForNoteException("Вы не можете добавить в свою полку чужие записи!");
        }
        if(createShelfRequest.getImage().isEmpty()){
            createShelfRequest.setImage(imageService.uploadImage(image));
        }
        Shelf shelf=new Shelf(userId, createShelfRequest.getName(), createShelfRequest.getDescription(), createShelfRequest.isHidden(), createShelfRequest.getImage(), notes);
        shelfRepository.save(shelf);
    }

    public void addNotesInShelf(int shelfId, List<Integer> notes, int userId) {
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете управлять данной полкой!");
        }
        List<Note> notesToAdd=noteService.findNotesByIds(notes);
        List<Note> notesInShelf=shelf.getNotes();
        if(notesToAdd.stream().anyMatch(n->n.getUserId()!=userId)){
            throw new NotOwnerForNoteException("Вы не можете добавить в свою полку чужие записи!");
        }
        List<Integer> noteInShelfIds=notesInShelf.stream().map(Note::getId).toList();
        notesToAdd=notesToAdd.stream().filter(n->!noteInShelfIds.contains(n.getId())).toList();
        notesInShelf.addAll(notesToAdd);
        shelf.setNotes(notesInShelf);
        shelfRepository.save(shelf);
    }

    public void updateShelf(int shelfId, UpdateShelfDto newShelf, MultipartFile image, int userId) {
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете управлять данной полкой!");
        }
        if(newShelf.getImage().isEmpty()){
            newShelf.setImage(imageService.uploadImage(image));
        }
        shelf.setName(newShelf.getName());
        shelf.setImage(newShelf.getImage());
        shelf.setDescription(newShelf.getDescription());
        shelf.setHidden(newShelf.isHidden());
        shelfRepository.save(shelf);
    }

    public void deleteShelf(int shelfId, int userId) {
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете управлять данной полкой!");
        }
        shelfRepository.deleteById(shelfId);
    }

    public void deleteNotesInShelf(int shelfId, List<Integer> notes, int userId) {
        Shelf shelf =shelfRepository.findById(shelfId).orElseThrow(()->new ShelfNotFoundException("Полку не удалось найти!"));
        if(shelf.getOwner()!=userId){
            throw new NoAccessToShelf("Вы не можете управлять данной полкой!");
        }
        List<Note> notesNew=shelf.getNotes();
        notesNew.removeIf(n->notes.contains(n.getId()));
        shelf.setNotes(notesNew);
        shelfRepository.save(shelf);
    }
}
