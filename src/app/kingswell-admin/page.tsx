"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/kingswell-admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-kingswell-green p-4">
      <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4 h-16 w-48">
            <Image
              src="/logo.png"
              alt="Kingswell"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-2xl text-kingswell-green">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage your website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-sm border border-gray-300 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="h-4 w-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
