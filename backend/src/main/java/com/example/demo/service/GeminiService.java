package com.example.demo.service;

import com.example.demo.dto.AIResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=";

    // ===========================
    // TEXT CHAT
    // ===========================

    public AIResponse askGemini(String prompt) {

        try {

            JSONObject part = new JSONObject();
            part.put("text", prompt);

            JSONArray parts = new JSONArray();
            parts.put(part);

            JSONObject content = new JSONObject();
            content.put("parts", parts);

            JSONArray contents = new JSONArray();
            contents.put(content);

            JSONObject body = new JSONObject();
            body.put("contents", contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity =
                    new HttpEntity<>(body.toString(), headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            GEMINI_URL + apiKey,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JSONObject json = new JSONObject(response.getBody());

            String answer =
                    json.getJSONArray("candidates")
                            .getJSONObject(0)
                            .getJSONObject("content")
                            .getJSONArray("parts")
                            .getJSONObject(0)
                            .getString("text");

            return new AIResponse(answer);

        } catch (Exception e) {

            e.printStackTrace();

            return new AIResponse(
                    "Unable to connect to Gemini API.\n\n" + e.getMessage()
            );
        }
    }

    // ===========================
    // IMAGE ANALYSIS
    // ===========================

    public AIResponse analyzeImage(MultipartFile image) {

        try {

            if (image == null || image.isEmpty()) {
                return new AIResponse("No image uploaded.");
            }

            String mimeType = image.getContentType();

            if (mimeType == null ||
                    (!mimeType.equals("image/jpeg")
                            && !mimeType.equals("image/png")
                            && !mimeType.equals("image/webp"))) {

                mimeType = "image/jpeg";
            }

            String base64Image =
                    Base64.getEncoder()
                            .encodeToString(image.getBytes());

            JSONObject inlineData = new JSONObject();
            inlineData.put("mimeType", mimeType);
            inlineData.put("data", base64Image);

            JSONObject imagePart = new JSONObject();
            imagePart.put("inlineData", inlineData);

            JSONObject textPart = new JSONObject();
            textPart.put("text",
                    """
                    You are FreshKart AI.

                    Analyze this grocery image.

                    Return ONLY:

                    Product Name:
                    Category:
                    Freshness Score (1-10):
                    Freshness:
                    Ripeness:
                    Estimated Shelf Life:
                    Health Benefits:
                    Nutrients:
                    Storage Tips:
                    Buying Recommendation:

                    If this is NOT a grocery item reply only:

                    This is not a grocery item.
                    """);

            JSONArray parts = new JSONArray();
            parts.put(textPart);
            parts.put(imagePart);

            JSONObject content = new JSONObject();
            content.put("parts", parts);

            JSONArray contents = new JSONArray();
            contents.put(content);

            JSONObject body = new JSONObject();
            body.put("contents", contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity =
                    new HttpEntity<>(body.toString(), headers);

            System.out.println("===== Sending Image to Gemini =====");
            System.out.println("Mime Type : " + mimeType);
            System.out.println("Image Size : " + image.getSize());

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            GEMINI_URL + apiKey,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            System.out.println(response.getBody());

            JSONObject json =
                    new JSONObject(response.getBody());

            String answer =
                    json.getJSONArray("candidates")
                            .getJSONObject(0)
                            .getJSONObject("content")
                            .getJSONArray("parts")
                            .getJSONObject(0)
                            .getString("text");

            return new AIResponse(answer);

        } catch (Exception e) {

            e.printStackTrace();

            return new AIResponse(
                    "Image analysis failed.\n\n" + e.getMessage()
            );
        }
    }

    // ===========================
    // CHAT
    // ===========================

    public AIResponse chat(String prompt) {

        String finalPrompt =
                """
                You are FreshKart AI Assistant.

                Answer ONLY grocery, food,
                fruits, vegetables,
                nutrition,
                cooking,
                shopping related questions.

                If unrelated say:

                I can only answer grocery and food related questions.

                Question:
                """
                        + prompt;

        return askGemini(finalPrompt);
    }
}