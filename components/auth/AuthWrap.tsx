import React from "react";
import LoginBtn from "@/components/auth/login-btn";
import icon from "@/app/icon.svg";
import Image from "next/image";

function AuthWrap({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-gray-950/90 backdrop-blur-md">
                <div className="flex h-full items-center justify-between  px-4 md:px-20">
                    <div className="flex items-center gap-2">
                        <Image

                            width={12}
                            height={12}
                            alt="semicolon"
                            src={icon}
                        />
                        <span className="text-xl font-bold text-zinc-200">
              semicolon
            </span>
                    </div>

                    <LoginBtn  cls="flex"/>
                </div>
            </header>

            <main className="pt-16 px-4 md:px-20">
                {children}
            </main>
        </div>
    );
}

export default AuthWrap;
