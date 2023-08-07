import client from "@/libs/PrismaClient"
import getSession from "./getSession"


const getCurrentUser = async () => {
    const session = await getSession()

    if (!session?.user?.email) {
        return null
    }

    const currentUser = await client?.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currentUser) return null

    return currentUser
}

export default getCurrentUser