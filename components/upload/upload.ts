import {CREATE_RESOURCE, UPLOAD_RESOURCE} from "@/components/upload/constants";
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
export const uploadChunks = async ({chunk, offset}: resourceUploadOption) =>{
  const res = await fetch(UPLOAD_RESOURCE, {
    method: "PATCH",
    body:chunk,
    headers:{
      "Upload-Offset": offset.toString(),
      "Content-Type": "application/offset+octet-stream"
    }
  });
   if(!res.ok) throw new Error("Chunk upload failed");

  return Number(res.headers.get("Upload-Offset"));
}


