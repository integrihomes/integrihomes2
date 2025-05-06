import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium leading-none">
          Name
        </label>
        <Input id="contact-name" placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium leading-none">
          Email
        </label>
        <Input id="contact-email" type="email" placeholder="Your email" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="contact-phone" className="text-sm font-medium leading-none">
          Phone
        </label>
        <Input id="contact-phone" type="tel" placeholder="Your phone number" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium leading-none">
          Message
        </label>
        <Textarea id="contact-message" placeholder="Your message" className="min-h-[100px]" />
      </div>
      <Button className="w-full">Send Message</Button>
    </form>
  )
}
