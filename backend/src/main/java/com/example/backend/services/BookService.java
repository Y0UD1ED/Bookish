package com.example.backend.services;

import com.example.backend.dtos.BookDto;
import com.example.backend.dtos.UpdateBookDto;
import com.example.backend.entities.Book;
import com.example.backend.entities.Class;
import com.example.backend.exceptions.BookNotFoundException;
import com.example.backend.exceptions.FileIsEmptyException;
import com.example.backend.repositories.BookRepository;
import lombok.AllArgsConstructor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;
    private final ImageService imageService;
   /* public List<Book> findBooksByUser(int userId){
        List<Class> classes=classService.findClassesByUser(userId);
        return classes.stream().flatMap(c->c.getBooks().stream()).toList();
    }
*/
    public List<BookDto> getBookDtoListFromBookList(List<Book> books){
        return books.stream().map(b->new BookDto(b.getId(),b.getName(),b.getAuthor(),b.getImage())).toList();
    }

    public List<BookDto> getBookDtoListFromWordDoc(MultipartFile file) {
        List<BookDto> books = new ArrayList<>();

        try {
            if (file.isEmpty()) {
                throw new FileIsEmptyException("Файл с изображением пустой!");
            }
            File tempFile=File.createTempFile("temp",null);
            file.transferTo(tempFile);
            FileInputStream fis = new FileInputStream(tempFile);
            XWPFDocument document = new XWPFDocument(fis);
            int i=0;
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                String text = paragraph.getText();
                if (!text.trim().isEmpty()) {
                    // Предполагаем, что формат записи: "1. Автор - Название"
                    String[] parts = text.split(" - ");
                    if (parts.length == 2) {
                        String author = parts[0].trim().split("\\.",2)[1].trim();
                        String title = parts[1].trim().substring(1,parts[1].trim().length()-1);
                        books.add(new BookDto(i++,title,author,"defaultBookImage.png"));
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Error");
        }

        return books;
    }

    public List<Book> saveBooksFromBookDtoList(List<BookDto> books,int classId){
        List<Book> saveBooks=books.stream()
                .map(b->new Book(b.getName(),b.getAuthor(),b.getImage(),classId))
                .toList();
        return bookRepository.saveAll(saveBooks);
    }

    public void updateBook(int bookId, UpdateBookDto book, MultipartFile file) {
        Book oldBook=bookRepository.findById(bookId).orElseThrow(()->new BookNotFoundException("Книга не найдена!"));
        if(book.getImage().isEmpty()){
            book.setImage(imageService.uploadImage(file));
        }
        oldBook.setName(book.getName());
        oldBook.setAuthor(book.getAuthor());
        oldBook.setImage(book.getImage());
        bookRepository.save(oldBook);
    }

    public void deleteBook(int bookId) {
        Book oldBook=bookRepository.findById(bookId).orElseThrow(()->new BookNotFoundException("Книга не найдена!"));
        bookRepository.deleteById(bookId);
    }

    public void deleteBooks(List<Book> books) {
        bookRepository.deleteAll(books);
    }
}
