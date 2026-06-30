"use client";
import { useAuth } from './AuthContext';
import { useRouter } from "next/navigation";

export default function Component({cls}:{cls:string}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className={`${cls}`}>
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className={`gap-4 ${cls}`}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-rose-400 flex items-center justify-center text-white font-semibold">
            {user.username?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          <span className="text-sm text-zinc-300">{user.username || user.email}</span>
        </div>
        <button
          className="px-3 py-1 border border-white/10 rounded-md text-white text-sm font-semibold cursor-pointer hover:text-gray-400 hover:bg-white/10 transition-all focus:outline-none"
          onClick={() => logout()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      className="bg-rose-400 px-3 py-1 hover:text-white hover:bg-rose-500 transition-all focus:outline-none rounded-sm text-sm font-semibold cursor-pointer"
      onClick={() => router.push('/login')}
    >
      Sign in
    </button>
  );
}
