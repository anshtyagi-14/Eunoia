package com.aura.wellnessbot.controller;

import com.aura.wellnessbot.dto.ChatRequest;
import com.aura.wellnessbot.dto.ChatResponse;
import com.aura.wellnessbot.service.AuraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/aura") // Base URL for all endpoints in this controller
// 👇 ADD THIS ANNOTATION 👇
@CrossOrigin(origins = "*") // Allows requests from your Vite frontend
public class AuraController {

    private final AuraService auraService;

    // Dependency injection of the service
    @Autowired
    public AuraController(AuraService auraService) {
        this.auraService = auraService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> handleChat(@RequestBody ChatRequest chatRequest) {  
    System.out.println("✅ Received chat request with message: " + chatRequest.getMessage());

    try {
        String reply = auraService.getAuraResponse(chatRequest.getMessage());
        return ResponseEntity.ok(new ChatResponse(reply));
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(new ChatResponse("Sorry, I'm having trouble connecting right now."));
    }
}
    @PostMapping("/insights")
    public ResponseEntity<ChatResponse> handleInsights(@RequestBody ChatRequest insightRequest) {
        try {
            String reply = auraService.getAuraInsight(insightRequest.getMessage());
            return ResponseEntity.ok(new ChatResponse(reply));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ChatResponse("Sorry, failed to generate insight."));
        }
    }
}