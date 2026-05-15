export interface GenerateUploadUrlBody {
  fileName: string;
  contentType: string;
}

export type SignedUploadResponse = {
  uploadUrl: string;
  key: string;
}