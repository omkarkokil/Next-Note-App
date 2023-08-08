import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/PrismaClient";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const body = await request.json()
    const { title, desc } = body
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse("unauthorized", { status: 400 })
    }

    if (!title || !desc) {
        return new NextResponse("Please fill the credentials", { status: 402 })
    }

    const note = await client.notes.create({
        data: {
            title: title,
            desc: desc,
            users: {
                connect: {
                    id: currentUser.id
                }
            }
        },
    })

    return NextResponse.json(note)
}
