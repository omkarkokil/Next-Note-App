import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/PrismaClient";
import { NextResponse } from "next/server";

interface IParams {
    id?: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        const { id } = params

        if (!currentUser || !currentUser.email) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const getNote = await client.notes.findUnique({
            where: {
                id: id
            }
        })

        return NextResponse.json(getNote)
    } catch (error) {
        return new NextResponse("Error 404 something went wrong", { status: 404 })
    }
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {

        const currentUser = await getCurrentUser()
        const { id } = params
        const body = await request.json()
        const { title, desc } = body

        if (!currentUser || !currentUser.email) return new NextResponse("Unauthorized")
        if (!id) return new NextResponse("invalid id")

        const updateNote = await client.notes.update({
            data: {
                title: title,
                desc: desc
            },
            where: {
                id: id
            }
        })

        return NextResponse.json(updateNote)
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 404 })
    }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()

    try {
        const { id } = params

        if (!currentUser || !currentUser.email) return new NextResponse("Unauthorized")

        if (!id) return new NextResponse("invalid id")

        const deleteNote = await client.notes.delete({
            where: {
                id: id,
            },
        })

        return NextResponse.json(deleteNote)

    } catch (error) {
        console.log(error);
        return new NextResponse("Someting went wrong" + error, { status: 404 })
    }
}