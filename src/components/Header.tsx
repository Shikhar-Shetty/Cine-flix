"use client";

import { Film, Menu, Search, X } from 'lucide-react'
import React, { useState } from "react";
import { User } from "lucide-react";
import { signOut } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-full z-50 bg-black bg-opacity-80 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                            <Film className="h-6 w-6 text-white" />
                        </div>
                        <Link href="/" className="text-2xl text-white font-bold tracking-tight">CineTex</Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="/home" className="font-medium text-red-500">Home</a>
                        <a href="/bookings" className="font-medium text-gray-300 hover:text-white transition-colors">Your Movies</a>

                    </nav>

                    {/* Search and Account */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-900 border border-gray-700 text-sm rounded-full py-2 pl-10 pr-4 w-48 focus:outline-none focus:border-red-500 transition-all focus:w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="h-8 w-8 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer">
                                <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                onClick={() => signOut({callbackUrl: "/sign-in"})}
                                className="text-red-500 focus:text-red-600"
                                >
                                Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800">
                    <div className="px-6 py-4 space-y-3">
                        <a href="#" className="block py-2 text-red-500 font-medium">Home</a>
                        <a href="#" className="block py-2 text-gray-300 hover:text-white">Your Movies</a>
                        <div className="relative mt-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-800 border border-gray-700 text-sm rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:border-red-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header
