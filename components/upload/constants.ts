import { BACKEND_URI } from "@/lib/uri";

export const CREATE_RESOURCE = `${BACKEND_URI}/api/upload/init`;
export const CHUNK_SIZE= 2* 1024 * 1024;
export const UPLOAD_RESOURCE = `${BACKEND_URI}/api/upload/receive-chunks`;