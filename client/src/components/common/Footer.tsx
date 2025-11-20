// src/components/Footer.tsx
import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">Foodie</h2>
            <p className="mt-3 text-sm text-gray-400">
              Delicious food delivered at your doorstep. Order now and enjoy
              fresh meals anytime!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-white transition-colors"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
