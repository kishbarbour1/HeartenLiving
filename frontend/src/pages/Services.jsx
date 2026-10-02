import React from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon, BookOpen, Briefcase, HeartHandshake, CheckCircle2, ArrowRight, Heart,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { services } from "../data/mock";

const iconMap = { Home: HomeIcon, BookOpen, Briefcase, HeartHandshake };

export default function Services() {
  return (
    <div>
      <section className="relative overflow-hidden bg-cream">
        <img
          src="https://media.base44.com/images/public/6abfa35db56b53d292ae7928/279983be7_WarmModernLivingRoomRetreat.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/70" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 64% 78% at 50% 50%, rgba(251,246,236,0.62) 0%, rgba(251,246,236,0.44) 58%, rgba(251,246,236,0) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28 text-center">
          <p className="font-script text-3xl text-gold-dark animate-fade-up">Our Services &amp; Support</p>
          <h1 className="animate-fade-up delay-100 mt-1 font-slab font-900 text-4xl sm:text-5xl text-burgundy">
            Complete, Compassionate Care
          </h1>
          <p className="animate-fade-up delay-200 mt-5 max-w-2xl mx-auto text-lg text-foreground/70">
            From a furnished home to life skills, career development, and wellness — every service
            is designed to help young adults build lasting independence.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 space-y-8">
        {services.map((s, idx) => {
          const Icon = iconMap[s.icon];
          return (
            <div
              key={s.title}
              className={`grid md:grid-cols-5 gap-8 items-center rounded-3xl border border-gold/20 bg-white p-8 md:p-10 shadow-[0_12px_40px_-24px_rgba(110,20,35,0.4)] ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-2 flex flex-col items-start">
                <div className="w-20 h-20 rounded-2xl bg-burgundy flex items-center justify-center">
                  <Icon className="w-10 h-10 text-cream" />
                </div>
                <h2 className="mt-5 font-slab font-800 text-3xl text-burgundy">{s.title}</h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{s.blurb}</p>
              </div>
              <div className="md:col-span-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-center gap-3 rounded-xl bg-cream-card/70 px-4 py-3.5">
                      <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                      <span className="font-medium text-foreground/85">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div className="rounded-3xl bg-burgundy text-cream p-10 md:p-14 text-center">
          <Heart className="w-10 h-10 text-gold-light mx-auto" />
          <h2 className="mt-4 font-slab font-800 text-3xl">Ready to take the next step?</h2>
          <p className="mt-3 text-cream/80 max-w-xl mx-auto">
            We’re now accepting applications. Safe housing. Real support. A stronger tomorrow.
          </p>
          <Button asChild size="lg" className="mt-7 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-8 h-12">
            <Link to="/contact">Apply Today <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
