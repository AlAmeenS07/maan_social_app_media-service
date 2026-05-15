
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3";
import { ALLOWED_MIME_TYPES, AVATAR_FOLDER, SIGNED_UPLOAD_URL_EXPIRY, SIGNED_VIEW_URL_EXPIRY, statusCodes, } from "../utils/constants";
import { errorResponse } from "../utils/response.handle";
import { IImageService } from "./interface/image.service.interface";
import { SignedUploadResponse } from "../types/media.types";


export class ImageService implements IImageService {

    async generateImageUploadUrl(fileName: string, contentType: string, userId: string) : Promise<SignedUploadResponse>{

        if (!ALLOWED_MIME_TYPES.includes(contentType)) {
            errorResponse("Invalid file type", statusCodes.BAD_REQUEST);
        }

        const ext = fileName.split(".").pop();

        const key = `${AVATAR_FOLDER}/${userId}/${crypto.randomUUID()}.${ext}`;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(
            s3,
            command,
            {
                expiresIn: SIGNED_UPLOAD_URL_EXPIRY,
            }
        );

        return { uploadUrl, key }
    }

    async generateImageViewUrl(key: string) {

        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
        });

        const url = await getSignedUrl(
            s3,
            command,
            {
                expiresIn:
                    SIGNED_VIEW_URL_EXPIRY,
            }
        );

        return url;
    }
}

