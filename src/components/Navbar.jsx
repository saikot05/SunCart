"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSun } from "react-icons/gi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(user ? [{ label: "My Profile", href: "/profile" }] : []),
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-base-200 bg-base-100/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <div className="flex items-center gap-3">
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

          <Link href="/">
            <h2 className="flex items-center gap-2 text-xl font-extrabold mb-3">
                <GiSun className="text-orange-500" />
                <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    SunCart
                </span>
            </h2>
          </Link>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`btn btn-ghost btn-sm ${pathname === item.href ? "bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-bold" : "" }`}>
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #f97316, #eab308)" }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm btn-circle">
            {theme === "dark" ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img src={user.avatarUrl} alt={user.name} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                <li className="menu-title"><span>{user.name}</span></li>
                <li><Link href="/profile">My Profile</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link
                href="/register"
                className="btn btn-sm text-white border-0"
                style={{ background: "linear-gradient(90deg, #f97316, #eab308)" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-base-200 md:hidden">
          <ul className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 px-3 rounded-lg hover:bg-base-200 font-medium"
                  style={
                    isActive(item.href)
                      ? {
                          background: "linear-gradient(90deg, #f97316, #eab308)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontWeight: "700",
                        }
                      : {}
                  }
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
                <button onClick={logout} className="btn btn-error btn-sm w-full">Logout</button>
              ) : (
                <>
                  <Link href="/login" className="btn btn-ghost btn-sm w-full">Login</Link>
                  <Link
                    href="/register"
                    className="btn btn-sm w-full text-white border-0"
                    style={{ background: "linear-gradient(90deg, #f97316, #eab308)" }}
                  >
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