import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12  bg-gradient-to-br from-green-400 to-gray-900 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl border-2 border-green-400">
                <span className="text-white font-bold text-xl">
                  <Image
                    src="/img/logo2.png"
                    alt="BasketStore Logo"
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                </span>
              </div>
              <span className="text-xl font-bold">BasketStore</span>
            </div>
            <p className="text-gray-400 mb-4">
              A store specializing in providing high-quality authentic
              basketball products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Facebook className="text-sm text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Instagram className="text-sm text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Twitter className="text-sm text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Brands
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Buying Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <MapPin className="inline-block mr-2" />
                123 Nguyễn Văn Cừ, Q.5, TP.HCM
              </p>
              <p>
                <Phone className="inline-block mr-2" />
                (028) 1234 5678
              </p>
              <p>
                <Mail className="inline-block mr-2" />
                info@basketstore.com
              </p>
              <p>
                <Clock className="inline-block mr-2" />
                8:00 AM - 10:00 PM (Monday - Sunday)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BasketStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
