export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    trustedOrigins: [
        "http://localhost:3000",
        "https://sun-cart-8l8y.vercel.app",
        "https://sun-cart-8l8y-git-main-saikot05s-projects.vercel.app",
        "https://sun-cart-8l8y-ljkx0xfwn-saikot05s-projects.vercel.app",
    ],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.Google_Client_Id,
            clientSecret: process.env.Google_Client_Secret,
        }
    }
});