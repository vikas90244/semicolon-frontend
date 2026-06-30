import { ApiResponse } from "../types";
import { ApiException } from "./exception";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function apiClient<T> (
    URL:string,
    options?:RequestInit
): Promise<T> {
    const res = await fetch(`${BACKEND_URL}${URL}`, {
        ...options,
        credentials: 'include', // Send cookies automatically
        headers: {
            ...(options?.headers||{}),
            ...(options?.body instanceof Blob ? {}: {"Content-Type":"application/json"}),
        }
    });

    const json:ApiResponse<T> = await res.json();

    if(!json.success) {
        throw new ApiException(json.error);
    }

    return json.data;
}