// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register, guestLogin } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isLogin
        ? await login(email, password)
        : await register(email, password, username);

      if (result.success) {
        await refreshUser();
        router.push("/home");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setGuestLoading(true);

    try {
      const result = await guestLogin();

      if (result.success) {
        await refreshUser();
        router.push("/home");
      } else {
        setError(result.error || "Failed to create guest account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-sm p-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-zinc-400 text-sm mb-8 text-center">
          {isLogin ? "Sign in to manage your uploads" : "Sign up to get started"}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Username (optional)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 focus:outline-none focus:border-rose-400"
                placeholder="johndoe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 focus:outline-none focus:border-rose-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 focus:outline-none focus:border-rose-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-400 text-white px-4 py-2 rounded-md font-semibold hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-zinc-900/50 text-zinc-500">OR</span>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          disabled={guestLoading || loading}
          className="w-full bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700"
        >
          {guestLoading ? "Logging in..." : "Try Demo Account"}
        </button>

        <p className="mt-3 text-xs text-zinc-500 text-center">
          Demo account is shared for testing. Data may be reset periodically.
        </p>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm text-zinc-400 hover:text-zinc-300"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}