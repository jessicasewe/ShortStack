"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import shortstack from "../../public/shortstack-logo.png";
import qr_code from "../../public/qr_code.png";
import link from "../../public/link.png";
import padlock from "../../public/padlock.png";
import { ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Static QR",
    description: "Fixed and unchangeable QR codes",
    icon: qr_code,
    link: "/qr_code",
  },
  {
    id: 2,
    name: "URL Shortener",
    description: "Shorten your long URLs",
    icon: link,
    link: "/link",
  },
  {
    id: 3,
    name: "Password-Protected URL",
    description: "Secure your short URLs with a password",
    icon: padlock,
    link: "/padlock",
  },
];

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="border-b z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-10">
          <Image src={shortstack} alt="maton logo" width={200} />
        </Link>
        <nav className="space-x-10 md:flex relative mr-auto">
          {/* Products Dropdown */}
          <div className="relative group" ref={dropdownRef}>
            <span
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-medium text-gray-700 group-hover:text-[#a24b33] transition-colors cursor-pointer flex items-center gap-2"
            >
              Products{" "}
              <ChevronDown className="h-5 w-5 group-hover:text-[#a24b33]" />
            </span>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-20">
                <div className="grid grid-cols-3 gap-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={product.link}
                      className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-[#ffe8dd] transition-colors"
                    >
                      <Image
                        src={product.icon}
                        alt={product.name}
                        width={24}
                        height={24}
                      />
                      <p className="font-medium text-xs text-gray-700 hover:text-[#a24b33] mt-1">
                        {product.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* API Button */}
          <Link
            href="/api"
            className="text-sm font-medium text-gray-700 hover:text-[#a24b33] transition-colors cursor-pointer"
          >
            API
          </Link>
          <Link
            href="/api"
            className="text-sm font-medium text-gray-700 hover:text-[#a24b33] transition-colors cursor-pointer"
          >
            Extension
          </Link>
        </nav>
        <Button className="bg-[#a24b33] text-white hover:bg-[#a24b33]/90 md:inline-flex">
          Sign Up
        </Button>
      </div>
    </header>
  );
};
