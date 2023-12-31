import client from "@/libs/PrismaClient";
import getCurrentUser from "./getCurrentUser"
import getSession from "./getSession";

const getNotes = async () => {
    const currentUser = await getCurrentUser();
    const notes = await client.notes.findMany({
        where: {
            userIds: {
                has: currentUser?.id
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return notes
}

export default getNotes