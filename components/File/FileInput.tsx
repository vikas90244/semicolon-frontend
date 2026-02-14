"use client";

import { useState } from "react";
import {FaFileUpload} from "react-icons/fa";

interface FileMetadataType {
    fileName: string;
    fileSize: number;
};
export default function FileUpload() {

    const [fileMetadata, setFileMetadata] = useState<FileMetadataType | null>(null);

    function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (file) {
            setFileMetadata({
                fileName: file.name,
                fileSize: file.size,
            })

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
                        Maximum file size: 5MB
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
                        <span className="text-sm text-rose-400">{((fileMetadata.fileSize)/(1024*1024)).toFixed(2)}MB</span>
                    </div>


                )}

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
                    >
                        Upload Now
                    </button>
                )}

            </div>
        </div>
    );
}
