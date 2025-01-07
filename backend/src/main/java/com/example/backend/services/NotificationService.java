package com.example.backend.services;

import com.example.backend.dtos.NotificationDto;
import com.example.backend.entities.*;
import com.example.backend.entities.Class;
import com.example.backend.repositories.NotificationReaderRepository;
import com.example.backend.repositories.NotificationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationReaderRepository notificationReaderRepository;
    private final ClassService classService;

    public void notifyAllClassMembersAboutReadingStatus(Note note, User user) {
        StringBuilder content = new StringBuilder();
        content.append("Ученик ").append(user.getLastName()).append(" ").append(user.getFirstName()).append(" ");
        content.append(note.getReadingStatus()).append(" книгу автора ").append(note.getAuthor()).append(" ").append(note.getName());
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType("change reading status");
        notification.setNote(note);
        notification.setContent(content.toString());
        notificationRepository.save(notification);
        Class myClass = classService.findClassByBook(note.getBookId());
        List<NotificationReader> notificationReaders = new ArrayList<>(myClass.getStudents().stream()
                .filter(s -> s.getId() != user.getId())
                .map(s -> new NotificationReader(s, notification))
                .toList());
        User teacher = new User();
        teacher.setId(myClass.getOwner());
        notificationReaders.add(new NotificationReader(teacher, notification));
        notificationReaderRepository.saveAll(notificationReaders);
    }

    public List<Notification> getUserNotification(int userId){
        return notificationRepository.findNotificationsByUserId(userId);
    }
    public List<NotificationDto> getNotificationDtoListFromNotifications(List<Notification> notifications){
        return notifications.stream()
                .map(n->new NotificationDto(n.getContent(),n.getType().equals("change reading status")?n.getUser().getPhoto() : n.getNote().getImage(),n.getType()))
                .toList();
    }
}
