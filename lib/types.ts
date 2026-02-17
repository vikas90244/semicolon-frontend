import { User } from "next-auth";

export interface AuthenticatedUser extends User {
  accessToken?: string,
  refreshToken?: string,
}


export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR";

export interface ApiError {
  message: string;
  code: ApiErrorCode;
  status: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  success: false;
  error: ApiError;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
