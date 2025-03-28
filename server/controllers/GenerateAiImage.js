import { fal } from "@fal-ai/client";
import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

// Setup Fal API key
fal.config({
  credentials: process.env.FAL_KEY,
});

// Controller to generate images
export const generateImages = async (req, res, next) => {
  try {
      const { prompt } = req.body;

      // Validate input
      if (!prompt || typeof prompt !== "string") {
          return next(createError(400, "Prompt is required and must be a string."));
      }

      const result = await fal.subscribe("fal-ai/flux/dev", {
          input: { prompt },
          logs: true,
          "image_size": { width: 1024, height: 1024 },
          "num_inference_steps": 28,
          "guidance_scale": 3.5,
          "num_images": 1,
          "enable_safety_checker": true,
      });

      if (!result || !result.data?.images?.length) {
          throw createError(500, "Failed to generate image.");
      }

      
      console.log(result);
      
      return res.status(200).json({
          photo: result.data.images[0].url,
          metadata: { prompt, size: "1024x1024" },
        });
        
    } catch (error) {
        
        // console.log(error);
        // console.log("gappppp");
        
    
    // console.error("Fal AI API Error:", error.message);

    // Handle specific API errors
    // Handle specific API errors dynamically
    // if (error.status >400 && error.body?.detail) {
    //     return next(createError(error.status, error.message, error.body.detail)); // Use API response message
    // }

    
    res.status(error.status || 500).json({
        success: false,
        error: error,
        message: error.body.detail || "Something went wrong",
    });
    return next(createError(
        error.status || 500,
        error.body?.detail || "An unexpected error occurred.",
        error.message
    ));
  }
};









// import { fal } from "@fal-ai/client";
// import * as dotenv from "dotenv";
// // import { Configuration, OpenAIApi } from "openai";
// import { createError } from "../error.js";

// dotenv.config();

// // Setup OpenAI API key
// // const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);



// fal.config({
//     credentials: process.env.FAL_KEY
//   });

// // Controller to generate images
// export const generateImages = async (req, res, next) => {
//     try {
//         const { prompt } = req.body;
//   // Validate input
//   if (!prompt || typeof prompt !== "string") {
//     return next(createError(400, "Prompt is required and must be a string."));
// }



// const result = await fal.subscribe("fal-ai/flux/dev", {
//   input: {
//     prompt: prompt
//   },
//   logs: true,
//   "image_size": {
//   "width": 1024,
//   "height": 1024
// },
//   "num_inference_steps": 28,
//   "guidance_scale": 3.5,
//   "num_images": 1,
//   "enable_safety_checker": true,
  
// //   onQueueUpdate: (update) => {
// //     if (update.status === "IN_PROGRESS") {
// //       update.logs.map((log) => log.message).forEach(console.log);
// //     }
// //   },
// });
// // console.log(result.data.images[0].url);
// // console.log(result.requestId);

      

//         // const response = await openai.createImage({
//         //     model: "dall-e-2",
//         //     prompt,
//         //     n: 1,
//         //     size: "1024x1024",
//         //     response_format: "b64_json",
//         // });

//         // const generatedImage = result?.data?.data?.[0]?.b64_json;

//         if (!result) {
//             throw createError(500, "Failed to generate image.");
//         }
//         console.log(result);
        

//         return res.status(200).json({
//             photo: result.data.images[0].url,
//             metadata: {
//                 prompt,
//                 size: "1024x1024",
//             },
//         });
//     } catch (error) {
//       console.error(error);
//         next(
//             createError(
//                 error.status || 500,
//                 error.body,
//                 error?.response?.data?.error?.message || error.message
//             )
//         );
//     }
// };
