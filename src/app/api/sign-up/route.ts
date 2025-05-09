import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import  prisma  from '../../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase();

        const existingUsername = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUsername) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists with this email",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email: normalizedEmail,
                password: hashedPassword,
            },
        });
        console.log(user);

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error registering user",
            },
            { status: 500 }
        );
    }
}
