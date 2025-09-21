package com.aura.wellnessbot.dto;

import lombok.Data;

@Data // Lombok annotation to generate getters, setters, etc.
public class ChatRequest {
    private String message;
}