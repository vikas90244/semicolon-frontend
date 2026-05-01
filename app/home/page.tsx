import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import FileUpload from "@/components/upload/FileInput";
import PendingUploads from "@/components/upload/PendingUploads";

async function page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="mx-auto max-w-xl py-10">
      <FileUpload />
      <PendingUploads />
    </div>
  );
}

export default page;
