import React from "react";
import { Heart, HandHeart, ShieldCheck, Lock } from "lucide-react";
import ZeffyDonateEmbed from "../components/ZeffyDonateEmbed";
import { donationTiers } from "../data/mock";

export default function Donate() {
  return (
    <div>
      <section className="bg-gradient-to-b from-cream to-cream-deep">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-burgundy/10 text-burgundy px-4 py-1.5 text-xs font-bold uppercase tracking-widest animate-fade-up">
            <HandHeart className="w-4 h-4" /> Support Our Mission
          </span>
          <h1 className="animate-fade-up delay-100 mt-4 font-slab font-900 text-4xl sm:text-5xl text-burgundy">
            Give the Gift of a Brighter Future
          </h1>
          <p className="animate-fade-up delay-200 mt-5 max-w-2xl mx-auto text-lg text-foreground/70">
            Your support provides safe housing, life skills, and mentorship for young adults ready
            to build independent lives.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* tiers — informational */}
          <div className="lg:col-span-2 space-y-4">
            {donationTiers.map((t) => (
              <div
                key={t.amount}
                className="w-full rounded-2xl border border-gold/20 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-slab font-800 text-2xl text-burgundy">${t.amount}</span>
                  <span className="text-sm font-bold uppercase tracking-wide text-gold-dark">{t.label}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/65">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Zeffy secure donation form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-gold/20 p-5 sm:p-8 shadow-[0_12px_40px_-24px_rgba(110,20,35,0.4)]">
              <h2 className="font-slab font-800 text-2xl text-burgundy flex items-center gap-2">
                <Heart className="w-6 h-6 text-gold-dark fill-gold-dark" /> Your Donation
              </h2>
              <p className="mt-2 text-sm text-foreground/65">
                Choose your amount and frequency below. Every gift goes directly to Hearten
                Horizons, processed securely by Zeffy.
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-burgundy/25 bg-cream/40">
                <ZeffyDonateEmbed />
              </div>
            </div>
          </div>
        </div>

        {/* 501(c)(3) trust & security */}
        <div className="mt-12 rounded-3xl border border-gold/25 bg-cream/50 p-8 sm:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-gold/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-gold-dark" />
              </span>
              <div>
                <h3 className="font-slab font-800 text-xl text-burgundy">
                  A Registered 501(c)(3) Nonprofit
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Hearten Transitional Living Inc. is a registered 501(c)(3) nonprofit
                  organization. Your donation is tax-deductible to the extent allowed by law and
                  directly supports youth housing, mentorship, and life-skills programs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-12 h-12 shrink-0 rounded-full bg-gold/15 flex items-center justify-center">
                <Lock className="w-6 h-6 text-gold-dark" />
              </span>
              <div>
                <h3 className="font-slab font-800 text-xl text-burgundy">
                  Secure Donation Processing
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  All donations are processed securely by Zeffy through a PCI-compliant payment
                  form. Hearten Horizons never sees or stores your card details — no payment
                  information is collected or saved on this website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
