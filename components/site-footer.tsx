import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-navy text-white">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo isFooter={true} />
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Where Integrity Meets Home. A trustworthy digital platform for buying, selling, and renting homes with
              transparency, security, and community at the core.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-300 hover:text-gold">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Quick Links</h3>
            <nav className="grid gap-3 text-sm">
              <Link href="/" className="text-gray-300 hover:text-gold">
                Home
              </Link>
              <Link href="/properties" className="text-gray-300 hover:text-gold">
                Properties
              </Link>
              <Link href="/verification" className="text-gray-300 hover:text-gold">
                Learn about our Verification
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-gold">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-gold">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Property Types</h3>
            <nav className="grid gap-3 text-sm">
              <Link href="#" className="text-gray-300 hover:text-gold">
                Land
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Houses
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Apartments
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Commercial
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                New Developments
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Resources</h3>
            <nav className="grid gap-3 text-sm">
              <Link href="#" className="text-gray-300 hover:text-gold">
                Buying Guide
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Land Verification
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Diaspora Services
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                Ghana Real Estate Market
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold">
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} IntegriHomes. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gold">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
