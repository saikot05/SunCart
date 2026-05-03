"use client";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
    const { data } = authClient.useSession();
    const user = data?.user;
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState(user?.image || "");

    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.currentTarget.name.value;
        const image = e.currentTarget.image.value;

        const { error } = await authClient.updateUser({ name, image });

        if (error) {
            toast.error(error.message || "Update failed!");
            return;
        }

        toast.success("Profile updated successfully!");
        router.push("/profile");
    };

    const initials = user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?";

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-6 w-96">
                <div className="text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full ring-4 ring-orange-100 overflow-hidden bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={() => setImageUrl("")}
                            />
                        ) : (
                            <span className="text-xl font-bold text-white">{initials}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Update Information</h1>
                        <p className="text-default-500 text-sm mt-1">Edit your profile details</p>
                    </div>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                    <TextField isRequired name="name" type="text" className="w-full" defaultValue={user?.name}>
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>

                    <TextField name="image" type="url" className="w-full" defaultValue={user?.image}>
                        <Label>Photo URL</Label>
                        <Input
                            placeholder="https://example.com/photo.jpg"
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition-transform duration-200"
                    >
                        Update Information
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProfilePage;