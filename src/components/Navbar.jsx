"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiSun } from "react-icons/gi";
import { MdDarkMode, MdLightMode, MdClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiShoppingCart, FiUser, FiLogOut, FiHome, FiPackage } from "react-icons/fi";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { useCart } from "@/context/CartContext";
import "animate.css";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await authClient.signOut();
    closeMenu();
    router.push("/");
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const navItems = [
    { label: "Home", href: "/", icon: FiHome },
    { label: "Products", href: "/products", icon: FiPackage },
    ...(user ? [{ label: "My Profile", href: "/profile", icon: FiUser }] : []),
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 w-full border-b border-base-200 bg-base-100/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <h2 className="flex items-center gap-2 text-xl font-extrabold">
              <GiSun className="text-orange-500 animate__animated animate__pulse animate__infinite" />
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                SunCart
              </span>
            </h2>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative btn btn-ghost btn-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "text-orange-500 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-orange-400 after:to-pink-500"
                      : "text-base-content/70 hover:text-base-content"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="btn btn-ghost btn-sm btn-circle relative">
              <FiShoppingCart size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </Link>

            {/* Desktop: Avatar dropdown or Login/Register */}
            {user ? (
              <div className="hidden md:block dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <Avatar>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{initials}</Avatar.Fallback>
                  </Avatar>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-2 shadow-xl border border-base-200">
                  <li className="px-3 py-2 border-b border-base-200 mb-1">
                    <p className="font-bold text-base-content text-sm">{user.name}</p>
                    <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                  </li>
                  <li>
                    <Link href="/profile" className="flex items-center gap-2 rounded-xl">
                      <FiUser size={14} /> My Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-error rounded-xl w-full text-left">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link
                  href="/register"
                  className="btn btn-sm text-white border-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="btn btn-ghost btn-sm btn-circle md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay ─────────────────────────────── */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ── Mobile Drawer Panel ───────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-base-100 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-extrabold text-lg">
            <GiSun className="text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              SunCart
            </span>
          </Link>
          <button onClick={closeMenu} className="btn btn-ghost btn-sm btn-circle">
            <MdClose size={22} />
          </button>
        </div>

        {/* User Info (if logged in) */}
        {user && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-base-200 bg-base-200/50">
            <Avatar>
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-bold text-base-content text-sm truncate">{user.name}</p>
              <p className="text-xs text-base-content/50 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <ul className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-200 space-y-2">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm w-full flex items-center gap-2 justify-start"
          >
            {theme === "dark" ? (
              <><MdLightMode size={18} /> Switch to Light Mode</>
            ) : (
              <><MdDarkMode size={18} /> Switch to Dark Mode</>
            )}
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm w-full gap-2"
            >
              <FiLogOut size={16} /> Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="btn btn-ghost btn-sm flex-1"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="btn btn-sm flex-1 text-white border-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;