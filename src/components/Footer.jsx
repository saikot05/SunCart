import Link from "next/link";
import { GiSun } from "react-icons/gi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="flex items-center gap-2 text-xl font-extrabold mb-3">
            <GiSun className="text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                SunCart
            </span>
        </h3>
          <p className="text-sm text-base-content/70">
                Summer Essentials Store
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>Email: support@suncart.com</li>
            <li>Phone: +880 1700-000000</li>
            <li>Location: Rajshahi, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-primary transition-colors">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-primary transition-colors">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-primary transition-colors">
              <FaInstagram />
            </a>
          </div>
          <Link href="/privacy" className="text-sm text-base-content/70 hover:text-primary underline">
            Privacy Policy
          </Link>
        </div>

      </div>
      <div className="text-center text-xs text-base-content/50 py-4 border-t border-base-300">
        © {new Date().getFullYear()} SunCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;