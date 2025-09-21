package com.aura.wellnessbot.service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuraService {

    // Injects the API key from application.properties
    @Value("${gemini.api.key}")
    private String apiKey;
    
    // Injects the project configuration from application.properties
    @Value("${vertex.ai.project-id}")
    private String projectId;

    @Value("${vertex.ai.location}")
    private String location;

    @Value("${vertex.ai.model-name}")
    private String modelName;

    // The old hardcoded final variables have been removed.

    public String getAuraResponse(String userMessage) throws IOException {
        // This is the core instruction for the AI model
        String systemPrompt = "You are Aura, a supportive and empathetic AI companion for a young person. "
            + "Your tone is gentle and encouraging. You are not a doctor or a therapist. "
            + "Your goal is to listen and validate their feelings. Do not give medical advice. "
            + "Keep your responses concise and conversational. User says: ";

        String fullPrompt = systemPrompt + userMessage;

        // Using try-with-resources for automatic cleanup
        // MODIFIED: Now uses the injected properties (projectId, location)
        try (VertexAI vertexAi = new VertexAI(projectId, location)) {
            // MODIFIED: Now uses the injected property (modelName)
            GenerativeModel model = new GenerativeModel(modelName, vertexAi);

            // Send the prompt to the model
            GenerateContentResponse response = model.generateContent(fullPrompt);

            // Extract and return the text from the response
            return ResponseHandler.getText(response);
        }
    }

    public String getAuraInsight(String userJournal) throws IOException {
        String systemPrompt = "You are a thoughtful and insightful wellness assistant. "
            + "Analyze the following journal entries from a user. "
            + "Identify one or two key themes, patterns, or underlying feelings. "
            + "Present your observation in a gentle, supportive, and constructive tone. "
            + "Do not give medical advice. Start with a phrase like 'I've noticed that...' or 'It seems like...'. "
            + "Here are the entries:\n\n";

        String fullPrompt = systemPrompt + userJournal;

        // MODIFIED: Now uses the injected properties (projectId, location)
        try (VertexAI vertexAi = new VertexAI(projectId, location)) {
            // MODIFIED: Now uses the injected property (modelName)
            GenerativeModel model = new GenerativeModel(modelName, vertexAi);
            GenerateContentResponse response = model.generateContent(fullPrompt);
            return ResponseHandler.getText(response);
        }
    }
}