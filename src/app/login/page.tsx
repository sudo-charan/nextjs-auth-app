"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent reload

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ Always needed
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        router.push("/profile"); // ✅ Redirect on success — or to dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
