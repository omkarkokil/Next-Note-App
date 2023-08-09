import { NextResponse } from "next/server"
import getCurrentUser from "./getCurrentUser"
import client from "@/libs/PrismaClient"

const getNotesById = async (id: string) => {
    try {
        const currentUser = await getCurrentUser()

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

export default getNotesById