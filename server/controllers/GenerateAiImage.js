import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { createError } from "../error.js";

dotenv.config();

// Setup OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to generate images
export const generateImages = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // Validate input
        if (!prompt || typeof prompt !== "string") {
            return next(createError(400, "Prompt is required and must be a string."));
        }

        const response = await openai.createImage({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const generatedImage = response?.data?.data?.[0]?.b64_json;

        if (!generatedImage) {
            throw createError(500, "Failed to generate image.");
        }

        return res.status(200).json({
            photo: generatedImage,
            metadata: {
                prompt,
                size: "1024x1024",
            },
        });
    } catch (error) {
        next(
            createError(
                error.status || 500,
                error?.response?.data?.error?.message || error.message
            )
        );
    }
};
