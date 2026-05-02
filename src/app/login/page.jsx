"use client";
export const dynamic = "force-dynamic";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const handleLoginFunc = async (e) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password,
            callbackURL: callbackUrl,
        });

        if (error) {
            toast.error("Login failed. Please try again.");
            return;
        }

        toast.success("Login successfully!");
        router.push(callbackUrl);
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: callbackUrl,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Login successful!");
                    router.push(callbackUrl);
                },
                onError: () => {
                    toast.error("Google login failed!");
                },
            },
        });
    };

    return (
        <div className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-6 w-96 bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-default-500 text-sm mt-1">Sign in to your account</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={handleLoginFunc}>
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
                        <Input placeholder="john@example.com" />
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
                        <Button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition-transform duration-200">
                            Login
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
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;