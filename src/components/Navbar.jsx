"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSun } from "react-icons/gi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import 'animate.css';
import { router } from "better-auth/api";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(user ? [{ label: "My Profile", href: "/profile" }] : []),
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-base-200 bg-base-100/70 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        <Link href="/">
          <h2 className="flex items-center gap-2 text-xl font-extrabold">
            <GiSun className="text-orange-500 animate__animated animate__pulse animate__infinite" />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              SunCart
            </span>
          </h2>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`btn btn-ghost btn-sm ${isActive(item.href) ? "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-bold" : ""}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm btn-circle">
            {theme === "dark" ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
          </button>

          {user ? (
            <div className="hidden md:block dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <Avatar>
                  <Avatar.Image alt={user.name} src={user.image} />
                  <Avatar.Fallback>{initials}</Avatar.Fallback>
                </Avatar>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                <li className="menu-title"><span>{user.name}</span></li>
                <li><Link href="/profile">My Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link href="/register" className="btn btn-sm text-white border-0 bg-gradient-to-r from-orange-400 to-pink-500">
                Register
              </Link>
            </div>
          )}

          <button
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-base-200 md:hidden">
          <ul className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 rounded-lg hover:bg-base-200 font-medium ${isActive(item.href) ? "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-bold" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 border-t border-base-200 pt-3">
              <button onClick={toggleTheme} className="btn btn-ghost btn-sm w-full flex gap-2">
                {theme === "dark" ? <><MdLightMode size={18} /> Light Mode</> : <><MdDarkMode size={18} /> Dark Mode</>}
              </button>
              {user ? (
                <button onClick={handleLogout} className="btn btn-error btn-sm w-full">Logout</button>
              ) : (
                <>
                  <Link href="/login" className="btn btn-ghost btn-sm w-full">Login</Link>
                  <Link href="/register" className="btn btn-sm w-full text-white border-0 bg-gradient-to-r from-orange-400 to-pink-500">
                    Register
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;