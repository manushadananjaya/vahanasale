// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
      <Link className="flex items-center justify-center" href="/">
        <Car className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">AutoMarket</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/buy"
        >
          Buy
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/sell"
        >
          Sell
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Car className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/buy">Buy</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sell">Sell</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/about">About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
