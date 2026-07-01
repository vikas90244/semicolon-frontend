import { BACKEND_URI } from "@/lib/uri";

// For apiClient (adds BACKEND_URL automatically)
export const CREATE_RESOURCE = `/api/upload/init-upload/`;
export const FAILED_UPLOADS_RESOURCE = `/api/upload/failed-upload/`;

// For raw fetch (needs full URL)
export const UPLOAD_RESOURCE = `${BACKEND_URI}/api/upload/receive-chunks`;

export const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB chunks for smooth progress updates