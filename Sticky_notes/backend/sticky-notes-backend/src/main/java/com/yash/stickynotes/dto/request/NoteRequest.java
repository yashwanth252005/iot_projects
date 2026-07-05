package com.yash.stickynotes.dto.request;

import lombok.Data;

@Data
public class NoteRequest {

    private String title;

    private String content;

    private String color;

    private String category;

    private String time;

    private int x;

    private int y;

    private boolean pinned;

}