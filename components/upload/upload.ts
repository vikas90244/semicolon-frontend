import {CREATE_RESOURCE} from "@/components/upload/endpoints";
import {createResourceResponse, resourceOptions} from "@/components/upload/type";
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
