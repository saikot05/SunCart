import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://sun-cart-8l8y.vercel.app"
})

export const { signIn, signUp, useSession } = authClient