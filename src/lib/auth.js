import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('suncart');

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),

    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        "http://localhost:3000",
        "https://sun-cart-8l8y.vercel.app",
        "https://*.vercel.app",
    ],

    advanced: {
        disableCSRFCheck: true,
        crossSubDomainCookies: {
            enabled: false,
        }
    },

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