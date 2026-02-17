import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ApiException } from "./exception";
export function handleApiError(error: unknown) {
    
  if (!(error instanceof ApiException)) {
    toast.error("Unexpected error occurred");
    return;
  }

  switch (error.code) {
    case "UNAUTHORIZED":
      signIn();
      break;

    case "FORBIDDEN":
      toast.error("You don't have permission");
      break;

    case "VALIDATION_ERROR":
      toast.error(error.message);
      break;

    default:
      toast.error("Something went wrong");
  }
}
