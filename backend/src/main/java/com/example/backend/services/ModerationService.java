package com.example.backend.services;

import com.example.backend.dtos.ModerationDto;
import com.example.backend.entities.Moderation;
import com.example.backend.exceptions.NoModerationForNote;
import com.example.backend.repositories.ModerationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ModerationService {
    private final ModerationRepository moderationRepository;

    public Moderation getModerationByNoteId(int noteId){
        return moderationRepository.findModerationByNoteId(noteId);
    }

    public ModerationDto getModerationDtoFromModeration(Moderation moderation) {
        if(moderation==null){
           throw new NoModerationForNote("Не найдено решение модератора для этой записи!");
        }
        return new ModerationDto(moderation.getStatus()!=-1,moderation.getComment() );
    }
}
