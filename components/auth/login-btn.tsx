"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";

export default function Component({cls}:{cls:string}) {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
          <div
              className={` gap-4 ${cls}`}
          >
              <Image
                  height={30}
                  width={30}
                  src={session.user.image ??''}
                  style={{"height": "32px", width: "32px", objectFit:"cover", borderRadius: "50%"}}
                  alt={'user'} />
              <button
                  className="px-3 py-1 border border-white/10 rounded-md text-white text-sm font-semibold cursor-pointer hover:text-gray-400 hover:bg-white/10 transition-all focus:outline-none"
                  onClick={() => signOut()}>Sign out</button>
          </div>

      </>
    )
  }
  return (
    <>
      <button
          className="bg-rose-400 px-3 py-1  hover:text-white  hover:bg-rose-500 transition-all focus:outline-none rounded-sm text-sm font-semibold cursor-pointer"
          onClick={() => signIn()}>Sign in</button>
    </>
  )
}
