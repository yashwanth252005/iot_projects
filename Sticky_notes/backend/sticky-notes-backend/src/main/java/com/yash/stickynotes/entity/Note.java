package com.yash.stickynotes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    private String id;

    private String username;

    private String title;

    private String content;

    private String color;

    private String category;

    private String time;

    private int x;

    private int y;

    private boolean pinned;
}