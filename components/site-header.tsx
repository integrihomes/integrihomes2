"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex ml-10 gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors text-navy hover:text-teal">
            Home
          </Link>
          <Link href="/properties" className="transition-colors text-navy hover:text-teal">
            Properties
          </Link>
          <Link href="/map-search" className="transition-colors text-navy hover:text-teal">
            Map Search
          </Link>
          <Link href="/blockchain" className="transition-colors text-navy hover:text-teal">
            Blockchain
          </Link>
          <Link href="/verification" className="transition-colors text-navy hover:text-teal">
            Our Verification
          </Link>
          <Link href="/about" className="transition-colors text-navy hover:text-teal">
            About
          </Link>
          <Link href="/contact" className="transition-colors text-navy hover:text-teal">
            Contact
          </Link>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="w-full pl-8"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="py-4">
                <Logo />
              </div>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="text-navy hover:text-teal">
                  Home
                </Link>
                <Link href="/properties" className="text-navy hover:text-teal">
                  Properties
                </Link>
                <Link href="/map-search" className="text-navy hover:text-teal">
                  Map Search
                </Link>
                <Link href="/blockchain" className="text-navy hover:text-teal">
                  Blockchain
                </Link>
                <Link href="/verification" className="text-navy hover:text-teal">
                  Our Verification
                </Link>
                <Link href="/about" className="text-navy hover:text-teal">
                  About
                </Link>
                <Link href="/contact" className="text-navy hover:text-teal">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
