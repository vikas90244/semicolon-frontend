import {CHUNK_SIZE, CREATE_RESOURCE, FAILED_UPLOADS_RESOURCE, UPLOAD_RESOURCE} from "@/components/upload/constants";
import {createResourceResponse, PendingUpload, resourceOptions, resourceUploadOption} from "@/components/upload/type";
import { apiClient } from "@/lib/api/client";
/***
    POST request used to create the resource.
 ***/
export const createUploadResource = async (options: resourceOptions)=>{
  return apiClient<createResourceResponse>(CREATE_RESOURCE, {
    method:"POST",
    body:JSON.stringify(options),
  })
};


/***
 * PATCH request used to upload resource.
***/
export const uploadChunks = async ({chunk, offset, filename, uploadId}: resourceUploadOption) =>{
  // Build URL with upload_id in path
  const uploadUrl = `${UPLOAD_RESOURCE}/${uploadId}/`;
  
  const res = await fetch(uploadUrl, {
    method: "PATCH",
    body:chunk,
    credentials: 'include', // Send cookies automatically
    headers:{
      "Upload-Offset": offset.toString(),
      "Content-Type": "application/offset+octet-stream",
      "Upload-Id": uploadId,
      "Upload-Metadata": `filename ${filename}`,
    }
  });
   if(!res.ok) throw new Error("Chunk upload failed");
   const uploadOffset =  Number(res.headers.get("Upload-Offset"));
   console.log("uploadOffset in the upload chunk function: ", uploadOffset);
  return uploadOffset;
}


/***
 * Function to initiate File Upload with progress tracking
***/
export async function uploadFile(
  file: File, 
  uploadId: string,
  onProgress?: (progress: number, uploaded: number, total: number) => void
) {
  let offset = 0;
  const chunkSize = CHUNK_SIZE;
  const filename = btoa(file.name);
  const totalSize = file.size;

  while (offset < totalSize) {
    console.log('offset is: ', offset);
    console.log("file size is: ", totalSize);
    const chunk = file.slice(offset, offset + chunkSize);

    try {
      offset = await uploadChunks({chunk, offset, filename, uploadId});
      
      // Calculate and report progress
      const progress = Math.min(100, Math.round((offset / totalSize) * 100));
      if (onProgress) {
        onProgress(progress, offset, totalSize);
      }
      
      console.log("offset is: ", offset, "progress:", progress + "%");
    } catch (err) {
      throw err;
    }
  }
}


/***
 * Resume a previously interrupted upload from its saved offset
***/
export async function resumeUpload(file: File, uploadId: string, fromOffset: number) {
  let offset = fromOffset;
  const chunkSize = CHUNK_SIZE;
  const filename = btoa(file.name);

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);
    offset = await uploadChunks({ chunk, offset, filename, uploadId });
  }
}

/**
 * Fetch failed uploads
 */

export const fetchPendingUploads = async (): Promise<PendingUpload[]> => {
  try {
    console.log('Fetching pending uploads from:', FAILED_UPLOADS_RESOURCE);
    const data = await apiClient<{ failed_uploads: PendingUpload[] }>(FAILED_UPLOADS_RESOURCE);
    console.log('Pending uploads response:', data);
    return data.failed_uploads;
  } catch (error) {
    console.error('Error fetching pending uploads:', error);
    throw error;
  }
};
