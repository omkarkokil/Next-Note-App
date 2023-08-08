import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/PrismaClient";
import { NextResponse } from "next/server";

interface IParams {
    id?: string
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
                // userIds: {
                //     hasSome: [id]
                // }
            },

        })

        return NextResponse.json(deleteNote)

    } catch (error) {
        console.log(error);
        return new NextResponse("Someting went wrong" + error, { status: 404 })
    }
}