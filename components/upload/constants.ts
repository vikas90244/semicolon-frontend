import { BACKEND_URI, UPLOAD_ENGINE } from "@/lib/uri";

export const CREATE_RESOURCE = `${BACKEND_URI}/api/upload/init`;
export const CHUNK_SIZE= 2* 1024 * 1024;
export const UPLOAD_RESOURCE = `${UPLOAD_ENGINE}/upload`;