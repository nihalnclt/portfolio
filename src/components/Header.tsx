import { navLinks } from "@/data/navLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="container">
      <div className="py-6 flex items-center justify-between">
        <Link href={`/`}>
          <div className="size-7">
            <Image
              src="/images/logo.png"
              alt="Nihal N"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {navLinks.map(({ name, link }, index) => {
            return (
              <Link href={link} key={index}>
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
