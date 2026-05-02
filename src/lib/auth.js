import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4'])
import { betterAuth }
from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('suncart');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    trustedOrigins: [
        "http://localhost:3000",
        "https://sun-cart-8l8y.vercel.app/",
        "https://sun-cart-8l8y-git-main-saikot05s-projects.vercel.app",
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