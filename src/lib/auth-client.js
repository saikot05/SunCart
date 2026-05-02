import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL || "https://sun-cart-8l8y.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()