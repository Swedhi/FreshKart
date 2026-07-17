package com.example.demo.controller;

import com.example.demo.dto.AIRequest;
import com.example.demo.dto.AIResponse;
import com.example.demo.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final GeminiService geminiService;

    @GetMapping("/ask")
    public AIResponse ask(@RequestParam String prompt) {
        return geminiService.askGemini(prompt);
    }

    @PostMapping("/analyze-image")
public AIResponse analyzeImage(
        @RequestParam("image") MultipartFile image
) throws Exception {

    System.out.println("File Name : " + image.getOriginalFilename());
    System.out.println("Content Type : " + image.getContentType());
    System.out.println("Size : " + image.getSize());

    return geminiService.analyzeImage(image);
}
    @PostMapping("/chat")
public AIResponse chat(@RequestBody AIRequest request) {

    return geminiService.chat(request.getPrompt());

}

}