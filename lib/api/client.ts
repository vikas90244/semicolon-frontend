import { getSession } from "next-auth/react";
import { BACKEND_URI } from "../uri";
import { ApiResponse } from "../types";
import { ApiException } from "./exception";


export async function apiClient<T> (
    URL:string,
    options?:RequestInit
): Promise<T> {

    const session = await getSession();
    const token = session?.accessToken;

    const res = await fetch(`${URL}`, {
        ...options,
        headers: {
            ...(options?.headers||{}),
            ...(token? {Authorization: `Bearer ${token}`}:{}),
            ...(options?.body instanceof Blob ? {}: {"Content-Type":"application/json"}),
        }
    })

    const json:ApiResponse<T> = await res.json();

    if(!json.success) {
        throw new ApiException(json.error);
    }

    return json.data;
}