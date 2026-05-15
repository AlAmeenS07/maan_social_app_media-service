export enum statusCodes{
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}


export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const SIGNED_UPLOAD_URL_EXPIRY = 60;

export const SIGNED_VIEW_URL_EXPIRY = 3600;

export const AVATAR_FOLDER = "avatars";


export const  messages = {
  USER_NOT_FOUND : "User not found",
  UPLOAD_URL_GENERATED : "Upload url generated successfully",
  KEY_REQUIRED : "Key is required",
  VIEW_URL_GENERATED : "View url generated successfully"
}