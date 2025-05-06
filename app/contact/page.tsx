import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | IntegriHomes",
  description: "Get in touch with IntegriHomes. We're here to help you find your perfect property in Ghana.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Contact Us</h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about a property or need assistance? Our team is here to help you find your perfect
                  property in Ghana.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Get in Touch</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium leading-none">
                        Phone
                      </label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-medium leading-none">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" />
                    </div>
                    <Button className="w-full bg-teal hover:bg-teal/90">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-navy">Our Information</h2>
                  <p className="text-gray-600 mb-6">
                    Feel free to reach out to us through any of the following methods.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-muted p-3">
                      <Phone className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">Phone</h3>
                      <p className="text-gray-600">+233 30 123 4567</p>
                      <p className="text-gray-600">+233 24 987 6543</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-muted p-3">
                      <Mail className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">Email</h3>
                      <p className="text-gray-600">info@integrihomes.co</p>
                      <p className="text-gray-600">support@integrihomes.co</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-muted p-3">
                      <MapPin className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">Office Address</h3>
                      <p className="text-gray-600">123 Independence Avenue</p>
                      <p className="text-gray-600">Accra, Ghana</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-muted p-3">
                      <Clock className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">Office Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                      <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="outline" className="gap-1.5 border-teal text-teal hover:bg-teal/10">
                    View on Map
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
