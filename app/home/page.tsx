"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FileUpload from "@/components/upload/FileInput";
import PendingUploads from "@/components/upload/PendingUploads";
import CompletedUploads from "@/components/upload/CompletedUploads";

function HomePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-xl py-10">
        <FileUpload />
        <PendingUploads />
        <CompletedUploads />
      </div>
    </ProtectedRoute>
  );
}

export default HomePage;
