import FileUpload from "@/components/upload/FileInput";
import PendingUploads from "@/components/upload/PendingUploads";
import CompletedUploads from "@/components/upload/CompletedUploads";

function page() {
  return (
    <div className="mx-auto max-w-xl py-10">
      <FileUpload />
      <PendingUploads />
      <CompletedUploads />
    </div>
  );
}

export default page;
