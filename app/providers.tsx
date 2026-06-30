"use client";

import { AuthProvider } from "@/components/auth/AuthContext";
import { Toaster } from "sonner";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
