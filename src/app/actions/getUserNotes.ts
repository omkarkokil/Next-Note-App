import client from "@/libs/PrismaClient";
import getCurrentUser from "./getCurrentUser"
import getSession from "./getSession";

const getNotes = async () => {
    const currentUser = await getCurrentUser();
    const session = await getSession()
    const notes = await client.notes.findMany({
        where: {
            userIds: {
                has: currentUser?.id
            }
        }
    })

    return notes
}

export default getNotes