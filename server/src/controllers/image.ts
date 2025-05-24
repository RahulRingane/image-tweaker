import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse, UploadStream } from "cloudinary";
import { handleManipulateImage } from "../lib/image";
import axios from "axios"
import { UserType } from "../schema/user";
import {
    addImageToDb,
    getImagesFromDb,
    getImageUrlById,
    deleteImageFromDb
} from "../db/user";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const matchPublicId = (imageUrl: string) => imageUrl.match(/\/v\d+\/(.+)\./);


export const getImages = async (request: Request, response: Response) => {

    try {
        const user = response.locals.user as UserType
        console.log("userid", user)
        const images = await getImagesFromDb(user.id)
        response.status(200).json(images)
    } catch (error) {
        response.status(500).json({
            message: (error as Error).message
        })
    }
};

export const addImage = async (request: Request, response: Response) => {

    const user = response.locals.user as UserType
    try {
        if (!request.file) {
            response.status(500).json({ message: "no file uploaded" });
            return;
        }

        const uploadStream = cloudinary.uploader.upload_stream(async (error, result: UploadApiResponse | undefined) => {

            if (error) {
                response.status(500).json({ message: error.message });
            } else {
                if (result) {
                    const imageData = await addImageToDb(result.secure_url, user.id);;
                    response.status(200).json({ message: "Upload Successful", ...imageData });
                } else {
                    response.status(500).json({ message: "Upload result is undefined" });
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

        const user = response.locals.user as UserType;
        const { public_id } = request.params;
        const searchParams = request.query;
        const selectedImgUrl = await getImageUrlById(public_id, user.id);

        if (!selectedImgUrl) {
            response.status(404).json({ message: "Image not found" });
            return;
        }

        const imageResponse = await axios.get(selectedImgUrl, {
            responseType: "arraybuffer",
        });

        const manipulatedImage = await handleManipulateImage(
            imageResponse.data,
            searchParams
        );

        if (!manipulatedImage) {
            response.status(500).json({ message: "Failed to manipulate the image" });
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
        response.status(500).json({ error })
    }
};

export const handleDeleteImage = async (
    request: Request,
    response: Response
) => {
    const user = response.locals.user as UserType;
    const { public_id } = request.params;
    try {
        const imageUrlFromDb = await getImageUrlById(public_id, user.id);
        if (!imageUrlFromDb) {
             response.status(400).json({ message: "Image Not Found" });
             return;
        }

        console.log(matchPublicId(imageUrlFromDb));
        const publicId = matchPublicId(imageUrlFromDb)?.[1];
        console.log(publicId);
        if (!publicId) {
             response.status(400).json({ message: "Invalid image URL" });
             return;
        }

        const deleteImage = await cloudinary.uploader.destroy(publicId);
        if (deleteImage.result !== "ok") {
             response.status(500).json({ message: "Failed to delete image" });
             return;
        }
        const deleteImageId = await deleteImageFromDb(public_id, user.id);
        response.status(200).json({ message: "Deletion successful", id: deleteImageId });
    } catch (error) {
        response.status(500).json({
            message: (error as Error).message
        });
    }
}


