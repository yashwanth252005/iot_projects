package com.yash.stickynotes.controller;

import com.yash.stickynotes.dto.request.NoteRequest;
import com.yash.stickynotes.entity.Note;
import com.yash.stickynotes.security.JwtService;
import com.yash.stickynotes.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteService noteService;
    private final JwtService jwtService;

    public NoteController(NoteService noteService,
                          JwtService jwtService) {

        this.noteService = noteService;
        this.jwtService = jwtService;
    }

    @PostMapping
    public ResponseEntity<Note> createNote(

            @RequestHeader("Authorization") String authHeader,
            @RequestBody NoteRequest request) {

        String token = jwtService.extractToken(authHeader);

        if (token == null || !jwtService.isTokenValid(token)) {

            return ResponseEntity.status(401).build();

        }

        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(

                noteService.createNote(request, username)

        );

    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(

            @RequestHeader("Authorization") String authHeader){

        String token = jwtService.extractToken(authHeader);

        if(token == null || !jwtService.isTokenValid(token)){
            return ResponseEntity.status(401).build();
        }

        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(
                noteService.getAllNotes(username)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(

            @PathVariable String id,

            @RequestHeader("Authorization") String authHeader){

        String token = jwtService.extractToken(authHeader);

        if(token == null || !jwtService.isTokenValid(token)){
            return ResponseEntity.status(401).build();
        }

        String username = jwtService.extractUsername(token);

        noteService.deleteNote(id, username);

        return ResponseEntity.ok().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(

            @PathVariable String id,

            @RequestHeader("Authorization") String authHeader,

            @RequestBody NoteRequest request){

        String token = jwtService.extractToken(authHeader);

        if(token == null || !jwtService.isTokenValid(token)){
            return ResponseEntity.status(401).build();
        }

        String username = jwtService.extractUsername(token);

        return ResponseEntity.ok(
                noteService.updateNote(id, username, request)
        );

    }

}