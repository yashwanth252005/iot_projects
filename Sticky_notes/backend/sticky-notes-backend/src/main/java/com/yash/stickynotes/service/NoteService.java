package com.yash.stickynotes.service;

import com.yash.stickynotes.dto.request.NoteRequest;
import com.yash.stickynotes.entity.Note;
import com.yash.stickynotes.repository.NoteRepository;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(NoteRequest request, String username){

        Note note = Note.builder()
                .username(username)
                .title(request.getTitle())
                .content(request.getContent())
                .color(request.getColor())
                .category(request.getCategory())
                .time(request.getTime())
                .x(request.getX())
                .y(request.getY())
                .pinned(request.isPinned())
                .build();

        return noteRepository.save(note);

    }

    public List<Note> getAllNotes(String username){

        return noteRepository.findByUsername(username);

    }

    public void deleteNote(String id, String username) {

        noteRepository.deleteByIdAndUsername(id, username);

    }

    public Note updateNote(String id,
                           String username,
                           NoteRequest request) {

        Note note = noteRepository
                .findByIdAndUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setColor(request.getColor());
        note.setCategory(request.getCategory());
        note.setTime(request.getTime());
        note.setX(request.getX());
        note.setY(request.getY());
        note.setPinned(request.isPinned());

        return noteRepository.save(note);
    }

}