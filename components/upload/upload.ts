import {CHUNK_SIZE, CREATE_RESOURCE, UPLOAD_RESOURCE} from "@/components/upload/constants";
import {createResourceResponse, resourceOptions, resourceUploadOption} from "@/components/upload/type";
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
  const res = await fetch(UPLOAD_RESOURCE, {
    method: "PATCH",
    body:chunk,
    headers:{
      "Upload-Offset": offset.toString(),
      "Content-Type": "application/offset+octet-stream",
      "Upload-Id": uploadId,
      "Upload-Metadata": `filename ${filename}`
    }
  });
   if(!res.ok) throw new Error("Chunk upload failed");
   const uploadOffset =  Number(res.headers.get("Upload-Offset"));
   console.log("uploadOffset in the upload chunk function: ", uploadOffset);
  return uploadOffset;
}


/***
 * Function to initiate File Upload
***/
export async function uploadFile(file: File, uploadId: string) {
  let offset = 0;
  const chunkSize = CHUNK_SIZE;
  const filename = btoa(file.name);

  while (offset < file.size) {
    console.log('offset is: ', offset);
    console.log("file size is: ", file.size);
    const chunk = file.slice(offset, offset + chunkSize);

    try {
      offset = await uploadChunks({chunk, offset, filename, uploadId});
      
      console.log("offset is: ", offset);
    } catch (err) {

      throw err;
    }
  }
}