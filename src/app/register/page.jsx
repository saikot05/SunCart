"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const router = useRouter();

    const handleRegisterFunc = async (e) => {
        e.preventDefault();
        const name = e.currentTarget.name.value;
        const email = e.currentTarget.email.value;
        const photoUrl = e.currentTarget.photoUrl.value;
        const password = e.currentTarget.password.value;

        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            image: photoUrl,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
            return;
        }

        toast.success("Account created successfully!");
        router.push("/login");
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Google login failed!");
                },
            },
        });
    };

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center bg-slate-100">
            <div className="flex flex-col gap-6 w-96 bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="text-default-500 text-sm mt-1">Create a new account</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={handleRegisterFunc}>
                    <TextField isRequired name="name" type="text" className="w-full">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                                return "Please enter a valid email address";
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                        <FieldError />
                    </TextField>

                    <TextField
                        name="photoUrl"
                        type="url"
                        className="w-full"
                        validate={(value) => {
                            if (value && !/^https?:\/\/.+/.test(value))
                                return "Please enter a valid URL";
                            return null;
                        }}
                    >
                        <Label>Photo URL</Label>
                        <Input placeholder="https://example.com/photo.jpg" />
                        <Description>Optional — paste a link to your profile photo</Description>
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        className="w-full"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition-transform duration-200"
                        >
                            Register
                        </Button>
                        <Button
                            type="button"
                            variant="bordered"
                            className="w-full flex items-center justify-center gap-2"
                            onPress={handleGoogle}
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </Button>
                    </div>
                </Form>

                <p className="text-center text-sm text-default-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;