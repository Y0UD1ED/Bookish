package com.example.backend.services;

import com.example.backend.dtos.BookDto;
import com.example.backend.entities.Book;
import com.example.backend.entities.Class;
import com.example.backend.repositories.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;
    private final ClassService classService;
    public List<Book> findBooksByUser(int userId){
        List<Class> classes=classService.findClassesByUser(userId);
        return classes.stream().flatMap(c->c.getBooks().stream()).toList();
    }

    public List<BookDto> getBookDtoListFromBookList(List<Book> books){
        return books.stream().map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage())).toList();
    }
}
