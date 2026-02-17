export interface resourceOptions{
    filename: string;
    totalbyte:string;
    totalchunks:number;
    chunksize: number;
};

export interface createResourceResponse{
    upload_id:string;
    upload_url:string;
};


export interface FileMetadataType {
    fileName: string;
    fileSize: number;
};

