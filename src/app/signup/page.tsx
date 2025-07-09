"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent form reload

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ Needed!
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        router.push("/login"); // ✅ Redirect after success
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={onSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
              placeholder="Enter your username"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
