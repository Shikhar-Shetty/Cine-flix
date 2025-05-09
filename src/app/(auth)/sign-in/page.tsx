"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-black text-white">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 bg-gray-900 p-10 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">CineTix</h1>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-red-500 hover:text-red-400 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="relative text-center text-sm text-gray-500 mb-8">
            <span className="bg-gray-900 px-4 z-10 relative">Sign in to your account</span>
            <div className="absolute left-0 right-0 top-1/2 border-t border-gray-700 transform -translate-y-1/2" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm transition-colors"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-sm text-red-500 hover:text-red-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm transition-colors"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium transition-colors"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      
      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2 relative">
        <Image 
          src="/images/cross_grid.jpg" 
          alt="Movie theater" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-black/70" />
        <div className="absolute bottom-10 left-10 text-white max-w-xs">
          <h3 className="text-2xl font-bold mb-2">The Ultimate Movie Experience</h3>
          <p className="text-gray-300">
            Book tickets for the latest blockbusters and enjoy premium seating, incredible sound, and the magic of cinema.
          </p>
        </div>
      </div>
    </div>
  );
}