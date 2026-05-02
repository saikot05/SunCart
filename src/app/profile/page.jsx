"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";

const ProfilePage = () => {
    const { data } = authClient.useSession();
    const user = data?.user;

    if (!user) return <div className="container mx-auto p-8 text-center">Loading...</div>;

    const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase();

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="bg-base-100 shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4 w-80 animate__animated animate__zoomIn">
                <Avatar className="w-24 h-24 text-2xl">
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{initials}</Avatar.Fallback>
                </Avatar>

                <div className="text-center">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                </div>

                <Link
                    href="/profile/update"
                    className="btn btn-sm text-white border-0 w-full text-center rounded-full"
                    style={{ background: "linear-gradient(90deg, #f97316, #ec4899)" }}
                >
                    Update Information
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;