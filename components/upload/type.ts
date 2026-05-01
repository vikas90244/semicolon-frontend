export interface resourceOptions{
    filename: string;
    totalbyte:string;
    totalchunks:number;
    chunksize: number;
};

export interface resourceUploadOption {
    chunk:Blob,
    offset:number,
    uploadId: string;
    filename:string;
}
export interface createResourceResponse{
    upload_id:string;
    upload_url:string;
};


export interface FileMetadataType {
    fileName: string;
    fileSize: number;
};

export interface PendingUpload {
    upload_id: string;
    filename: string;
    size: number;
    offset: number;
    status: "PENDING" | "UPLOADING" | "COMPLETED" | "FAILED";
    created_at: string;
};

