package com.yash.stickynotes.repository;

import com.yash.stickynotes.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, String> {

    List<Note> findByUsername(String username);

    Optional<Note> findByIdAndUsername(String id, String username);

    void deleteByIdAndUsername(String id, String username);

}