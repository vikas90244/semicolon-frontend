import { ApiError } from "../types";

export class ApiException extends Error {
    code: string;
    status: number;

    constructor(error:ApiError) {
        super(error.message);
        this.code = error.code;
        this.status = error.status;
    }
};