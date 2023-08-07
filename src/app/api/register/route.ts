import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import client from "@/libs/PrismaClient";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) return new NextResponse("All fileds are mandatory")

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await client.user.create({
            data: {
                name, email, hashedPassword
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error);
        return new NextResponse("Something went wrong!")
    }
}