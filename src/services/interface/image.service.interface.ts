import { SignedUploadResponse } from "../../types/media.types"

export interface IImageService {
    generateImageUploadUrl(fileName: string, contentType: string, userId: string): Promise<SignedUploadResponse>
    generateImageViewUrl(key: string) : Promise<string>
}