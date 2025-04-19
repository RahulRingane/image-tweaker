import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse, UploadStream } from "cloudinary";
import { handleManipulateImage } from "../lib/image";
import axios from "axios"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const addImage = async (request: Request, response: Response) => {
    try {
        if (!request.file) {
             response.status(500).json({ message: "no file uploaded" });
             return;
        }

        const uploadStream = cloudinary.uploader.upload_stream((error, result: UploadApiResponse | undefined) => {
            if (error) {
                response.status(500).json({ message: error.message });
            } else {
                if (result) {
                    const public_id = result.public_id;
                    response
                        .status(200)
                        .json({ message: "Upload Successful", public_id });
                } else {
                    response
                        .status(500)
                        .json({ message: "Upload result is undefined" });
                }
            }
        });

        uploadStream.end(request.file.buffer);

    } catch (error) {
        response.status(500).json({ message: (error as Error).message });
    }
}

export const getImageById = async (request: Request, response: Response) => {
    try {
        const public_id = request.params;
        const searchParams = request.query;
        const imageUrl = "";

        if (!imageUrl) {
             response
                .status(404)
                .json({ message: "Image not found" });
                return;
        }

        const imageResponse = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });

        const manipulatedImage = await handleManipulateImage(
            imageResponse.data,
            searchParams
        );

        if (!manipulatedImage) {
            response
                .status(500)
                .json({ message: "Failed to manipulate the image" });
                 return;
        }

        const buffer = await manipulatedImage.getBufferAsync(
            manipulatedImage.getMIME());
        response.writeHead(200, {
            "Content-Type": manipulatedImage.getMIME(),
            "Content-Length": buffer.length,
        });
        response.end(buffer);

    } catch (error) {
        response
            .status(500)
            .json({ error })
    }
};


