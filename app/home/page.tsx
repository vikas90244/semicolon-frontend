import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/lib/auth';
import FileUpload from "@/components/File/FileInput";
async function page() {
     const session = await getServerSession(authOptions);
     console.log("session in home page: ", session);
  if (!session) {
    redirect("/");
  }

  return (
   <>
       <FileUpload />
   </>
  );

}

export default page