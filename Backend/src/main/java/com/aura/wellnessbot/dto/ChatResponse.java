package com.aura.wellnessbot.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor // Lombok annotation for a constructor with all fields
public class ChatResponse {
    private String reply;
}