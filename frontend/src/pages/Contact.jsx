import React, { useState } from "react";
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { contact, brand } from "../data/mock";

const cards = [
  { icon: Phone, label: "Call Us", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Globe, label: "Website", value: contact.website, href: contact.websiteHref },
  { icon: MapPin, label: "Location", value: contact.address, href: null },
];

const API_BASE = process.env.REACT_APP_API_URL || "";

const emptyForm = { name: "", email: "", phone: "", interest: "", message: "", website: "" };

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please complete the form", description: "Name, email and a short message are required." });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({
          title: "Message not sent",
          description: data.detail || "Something went wrong. Please try again.",
        });
        return;
      }
      // Success is shown only after the inquiry has been saved on the server.
      setSubmitted(true);
      if (data.email_status === "failed") {
        toast({
          title: "Message saved",
          description: "We received your message, but our email notification failed. Our team can still see it.",
        });
      } else {
        toast({ title: "Message received!", description: "Thank you — our team will reach out soon." });
      }
      setForm(emptyForm);
    } catch (err) {
      toast({ title: "Message not sent", description: "We couldn't reach our server. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-cream">
        <img
          src="https://media.base44.com/images/public/6abfa35db56b53d292ae7928/4e9c78a5c_WelcomingModernCraftsmanEntryway.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-cream/60" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 62% 76% at 50% 50%, rgba(251,246,236,0.55) 0%, rgba(251,246,236,0.38) 55%, rgba(251,246,236,0) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <p className="font-script text-3xl text-gold-dark animate-fade-up">{brand.scriptLine}</p>
          <h1 className="animate-fade-up delay-100 mt-1 font-slab font-900 text-4xl sm:text-5xl text-burgundy">
            Contact Us
          </h1>
          <p className="animate-fade-up delay-200 mt-5 max-w-2xl mx-auto text-lg text-foreground/70">
            Now accepting applications. Reach out to learn more or begin your journey toward
            independent living.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* info */}
          <div className="lg:col-span-2 space-y-4">
            {cards.map((c) => {
              const Inner = (
                <div className="flex items-center gap-4 rounded-2xl bg-white border border-gold/20 p-5 hover:border-gold transition-colors">
                  <span className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center shrink-0">
                    <c.icon className="w-6 h-6 text-cream" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide font-bold text-gold-dark">{c.label}</p>
                    <p className="font-medium text-foreground/85 break-all">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="block">{Inner}</a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
            <div className="rounded-2xl bg-burgundy text-cream p-6">
              <Heart className="w-7 h-7 text-gold-light" />
              <p className="mt-3 font-script text-3xl text-gold-light">A stronger tomorrow.</p>
              <p className="mt-1 text-cream/80 text-sm">Safe housing. Real support. Your future starts here.</p>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full rounded-3xl bg-white border border-gold/20 p-10 flex flex-col items-center justify-center text-center">
                <span className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-gold-dark" />
                </span>
                <h2 className="mt-5 font-slab font-800 text-2xl text-burgundy">Thank you!</h2>
                <p className="mt-2 text-foreground/70 max-w-sm">
                  Your message has been received. A member of the Hearten team will be in touch soon.
                </p>
                <Button onClick={() => setSubmitted(false)} className="mt-6 bg-burgundy hover:bg-burgundy-light text-cream rounded-full px-6">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-white border border-gold/20 p-8 shadow-[0_12px_40px_-24px_rgba(110,20,35,0.4)]">
                <h2 className="font-slab font-800 text-2xl text-burgundy">Send Us a Message</h2>
                <p className="text-sm text-foreground/60 mt-1">We’ll respond as soon as we can.</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-foreground/80">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={update("name")} placeholder="Your name" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground/80">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground/80">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={update("phone")} placeholder="(000) 000-0000" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold" />
                  </div>
                  <div>
                    <Label className="text-foreground/80">I&apos;m interested in</Label>
                    <Select value={form.interest} onValueChange={update("interest")}>
                      <SelectTrigger className="mt-1.5 bg-cream/60 border-gold/30 focus:ring-gold">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="housing">Applying for housing</SelectItem>
                        <SelectItem value="referral">Making a referral</SelectItem>
                        <SelectItem value="volunteer">Volunteering / Mentoring</SelectItem>
                        <SelectItem value="partner">Community partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-5">
                  <Label htmlFor="message" className="text-foreground/80">Message *</Label>
                  <Textarea id="message" value={form.message} onChange={update("message")} rows={5} placeholder="How can we help?" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold resize-none" />
                </div>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={update("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <Button type="submit" size="lg" disabled={sending} className="mt-6 w-full bg-burgundy hover:bg-burgundy-light text-cream font-semibold rounded-full h-12">
                  Send Message <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
