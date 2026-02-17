import { getSession } from "next-auth/react";
import { BACKEND_URI } from "../uri";
import { ApiResponse } from "../types";
import { ApiException } from "./exception";


export async function apiClient<T> (
    path:string,
    options?:RequestInit
): Promise<T> {

    const session = await getSession();
    const token = session?.accessToken;

    const res = await fetch(`${BACKEND_URI}/${path}`, {
        ...options,
        headers: {
            "Content-Type":"application/json",
            ...(token? {Authorization: `Bearer ${token}`}:{}),
            ...(options?.headers||{}),
        }
    })

    const json:ApiResponse<T> = await res.json();

    if(!json.success) {
        throw new ApiException(json.error);
    }

    return json.data;
}