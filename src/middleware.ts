import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        // signIn: "/",
        signIn: "https://addit.vercel.app",
    },
})

export const config = ({
    matcher: [
        "/notes/:path*"
    ]
})