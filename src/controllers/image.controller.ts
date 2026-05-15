import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { GenerateUploadUrlBody } from "../types/media.types";
import { errorResponse, successResponse } from "../utils/response.handle";
import { messages, statusCodes } from "../utils/constants";
import { IImageService } from "../services/interface/image.service.interface";

export class ImageController {

    constructor(
        private _mediaService : IImageService
    ){}

  generateUploadUrl = expressAsyncHandler( async ( req: Request, res: Response ) => {

      const {fileName,contentType} = req.body as GenerateUploadUrlBody;

      const userId = req.headers["x-user-id"] as string;

      if (!userId) {
        errorResponse(messages.USER_NOT_FOUND, statusCodes.UNAUTHORIZED);
      }

      const data = await this._mediaService.generateImageUploadUrl(fileName, contentType, userId);

      successResponse(res, data, messages.UPLOAD_URL_GENERATED, statusCodes.OK);
  });

  generateViewUrl = expressAsyncHandler(async (req: Request, res: Response) => {

      const key = req.query.key as string;

      if (!key) {
        errorResponse(messages.KEY_REQUIRED, statusCodes.BAD_REQUEST);
      }

      const url = await this._mediaService.generateImageViewUrl(key);

      successResponse(res, { url }, messages.VIEW_URL_GENERATED, statusCodes.OK)
  })
}

