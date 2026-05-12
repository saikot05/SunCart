import Link from "next/link";
import { GiSun } from "react-icons/gi";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiShoppingBag, FiHome, FiPackage, FiUser } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <GiSun className="text-orange-500 text-2xl" />
              <span className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                SunCart
              </span>
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed mb-4 max-w-xs">
              Your one-stop shop for summer essentials. Quality products, unbeatable deals, and fast delivery all season long.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
                { href: "https://twitter.com",  icon: FaTwitter,  label: "Twitter"  },
                { href: "https://instagram.com",icon: FaInstagram,label: "Instagram"},
                { href: "https://youtube.com",  icon: FaYoutube,  label: "YouTube"  },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-base-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 text-base-content/70 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base-content mb-4 flex items-center gap-2">
              <FiShoppingBag className="text-orange-500" size={16} />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home",     href: "/",        icon: FiHome    },
                { label: "Products", href: "/products", icon: FiPackage },
                { label: "My Profile",href: "/profile", icon: FiUser    },
                { label: "Cart",     href: "/cart",     icon: null       },
                { label: "Checkout", href: "/checkout", icon: null       },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-base-content/70 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base-content mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <MdEmail className="text-orange-500 mt-0.5 shrink-0" size={16} />
                <a href="mailto:support@suncart.com" className="hover:text-orange-500 transition-colors break-all">
                  support@suncart.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <MdPhone className="text-orange-500 mt-0.5 shrink-0" size={16} />
                <a href="tel:+8801700000000" className="hover:text-orange-500 transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-base-content/70">
                <MdLocationOn className="text-orange-500 mt-0.5 shrink-0" size={16} />
                <span>Rajshahi, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-base-content mb-4">Stay Updated</h4>
            <p className="text-sm text-base-content/70 mb-3">
              Subscribe for exclusive summer deals and new arrivals.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered input-sm w-full rounded-full text-sm"
              />
              <button className="btn btn-sm w-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 font-semibold hover:scale-[1.02] transition-transform">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-base-content/50">
          <p>© {new Date().getFullYear()} SunCart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;