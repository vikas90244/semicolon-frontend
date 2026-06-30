"use client";

import { useState } from "react";
import {FaFileUpload} from "react-icons/fa";
import {createUploadResource, uploadChunks, uploadFile} from "@/components/upload/upload";
import {createResourceResponse, resourceOptions, FileMetadataType} from "@/components/upload/type";
import { handleApiError } from "@/lib/api/handleApirError";
import { CHUNK_SIZE } from "./constants";
import { BiErrorCircle } from "react-icons/bi";


export default function FileUpload() {

    const [fileMetadata, setFileMetadata] = useState<FileMetadataType | null>(null);
    const [file, setFile] = useState<File|null>(null);
    const [error, setError] = useState<string|null>(null);
    
    // Validation constants (matching backend)
    const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
    const ALLOWED_EXTENSIONS = [
        '.pdf', '.doc', '.docx', '.txt', '.csv',
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
        '.mp4', '.avi', '.mov', '.mkv', '.webm',
        '.mp3', '.wav', '.flac', '.ogg',
        '.zip', '.rar', '.7z', '.tar', '.gz',
    ];

    function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setError(null);

        const selectedFile = e.target.files?.[0] ?? null;
        
        if (!selectedFile) {
            setFile(null);
            setFileMetadata(null);
            return;
        }

        // Validate file size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024*1024)}MB`);
            return;
        }
        
        if (selectedFile.size === 0) {
            setError("File is empty");
            return;
        }
        
        // Validate file extension
        const fileName = selectedFile.name.toLowerCase();
        const fileExt = '.' + fileName.split('.').pop();
        
        if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
            setError(`File type '${fileExt}' not allowed. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
            return;
        }
        
        // Validate filename length
        if (selectedFile.name.length > 255) {
            setError("Filename too long (max 255 characters)");
            return;
        }
        
        setFile(selectedFile);
        setFileMetadata({
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
        });
    }


    // function to handle file upload click
    async function handleFileUpload(){

        const totalbyte = file?.size.toString() ?? "0";
        const chunksize = CHUNK_SIZE;
        const totalchunks = Number(totalbyte)/chunksize;
        const filename = file?.name ?? "";

        const options:resourceOptions = {
            filename: filename,
            totalbyte: totalbyte,
            totalchunks:totalchunks,
            chunksize: chunksize,
        }

        try {
            const data: createResourceResponse= await createUploadResource(options);
            const uploadId= data.upload_id;
            const res = await uploadFile(
                file!,
                uploadId
            )

            console.log("response is: ", res);
            setFile(null);
            setFileMetadata(null);

        } catch (error) {
            handleApiError(error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">

            <div
                className="rounded-2xl border border-gray-200
                    shadow-sm p-3 space-y-4
                    md:p-6 md:space-y-4
                    mt-4
                     md:mt-16
                   dark:bg-gray-950 dark:border-white/10"
            >

                <h2 className=" text-md md:text-lg font-semibold text-gray-900 dark:text-white">
                    Upload your file
                </h2>



                <label
                    className="group relative flex flex-col items-center justify-center
                     h-24 md:h-40 w-full rounded-xl
                     border-2 border-dashed border-gray-300
                     bg-gray-50

                     cursor-pointer
                     transition

                     hover:border-indigo-500
                     hover:bg-indigo-50

                     dark:bg-zinc-800
                     dark:border-zinc-700
                     dark:hover:border-indigo-400
                     dark:hover:bg-zinc-700"
                >

                 <FaFileUpload
                     className="w-10 h-10 text-gray-400
                       group-hover:text-indigo-500
                       transition"
                 />

                    <p className="mt-3 text-xs  md:text-md text-gray-600 dark:text-gray-300">
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              Click to upload
            </span>{" "}
                        or drag and drop
                    </p>

                    <p className="mt-1 text-xs hidden md:block text-gray-400">
                        Maximum file size: 500MB
                    </p>

                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                {fileMetadata && (
                    <div
                        className="flex items-center gap-2
                       rounded-lg bg-gray-100
                       px-3 py-2
                       text-sm text-gray-700
                       dark:bg-zinc-800 dark:text-gray-300"
                    >
                        📄
                        <span className="truncate">{fileMetadata.fileName}</span>
                        <span className="text-sm text-rose-400">{((fileMetadata.fileSize)/(1000*1000)).toFixed(1)} MB</span>
                    </div>


                )}
                {error&& (<div className="border border-red-500 text-red-500 rounded-md flex gap-2 py-2 items-center px-2 text-sm font-semibold"> 
                    <BiErrorCircle size={20} /> {error}
                </div>)}
                {fileMetadata && (
                    <button
                        className="w-full rounded-lg
                       bg-gradient-to-r
                       from-rose-300 to-rose-500
                       px-3 py-2
                       text-sm font-medium text-white
                       shadow
                       hover:cursor-pointer
                       hover:opacity-90
                       active:scale-[0.98]
                       transition"
                        onClick={handleFileUpload}
                    >
                        Upload Now
                    </button>
                )}

            </div>
        </div>
    );
}
