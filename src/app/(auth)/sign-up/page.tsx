"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Film } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const res = await axios.post("/api/sign-up", data);
      console.log(res);
      router.push("/sign-in");
    } catch (err) {
      console.error("Sign-up error", err);
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
              Create your account
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-red-500 hover:text-red-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          <div className="relative text-center text-sm text-gray-500 mb-8">
            <span className="bg-gray-900 px-4 z-10 relative">Join CineTix Today</span>
            <div className="absolute left-0 right-0 top-1/2 border-t border-gray-700 transform -translate-y-1/2" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Username</FormLabel>
                    <Input 
                      {...field} 
                      className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus:ring-red-500" 
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Email Address</FormLabel>
                    <Input 
                      type="email" 
                      {...field} 
                      className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus:ring-red-500" 
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-300">Password</FormLabel>
                    <Input 
                      type="password" 
                      {...field} 
                      className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus:ring-red-500" 
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium transition-colors"
              >
                Create Account
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-xs text-center text-gray-500">
            By signing up, you agree to our <a href="#" className="text-red-500 hover:text-red-400">Terms of Service</a> and <a href="#" className="text-red-500 hover:text-red-400">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2 relative">
        <Image 
          src="/images/grid.webp" 
          alt="Movie theater experience" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-black/70" />
        <div className="absolute bottom-10 left-10 text-white max-w-xs">
          <h3 className="text-2xl font-bold mb-2">Join the Movie Community</h3>
          <p className="text-gray-300">
            Get access to exclusive premieres, special discounts, and personalized recommendations for your next movie night.
          </p>
        </div>
      </div>
    </div>
  );
}