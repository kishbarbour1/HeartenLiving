import React from "react";
import { Link } from "react-router-dom";
import {
  Target, Compass, Users, CheckCircle2, Heart, Handshake, Sparkles, Star, Home as HomeIcon, ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { mission, vision, whoWeServe, whyChoose, values } from "../data/mock";

const valueIcons = { Heart, Handshake, Sparkles, Star, Home: HomeIcon };

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-cream">
        <img
          src="https://media.base44.com/images/public/6abfa35db56b53d292ae7928/e25f396b2_FocusedMentoringattheKitchenTable.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
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
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <p className="font-script text-3xl text-gold-dark animate-fade-up">About Hearten</p>
          <h1 className="animate-fade-up delay-100 mt-1 font-slab font-900 text-4xl sm:text-5xl text-burgundy">
            A Beacon of Hope
          </h1>
          <p className="animate-fade-up delay-200 mt-5 max-w-2xl mx-auto text-lg text-foreground/70">
            A nurse-owned organization walking beside young adults with compassion, structure, and
            a genuine belief in their potential.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", text: mission },
            { icon: Compass, title: "Our Vision", text: vision },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl bg-white border border-gold/20 p-8 shadow-[0_10px_40px_-22px_rgba(110,20,35,0.35)]">
              <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
                <b.icon className="w-7 h-7 text-gold-dark" />
              </div>
              <h2 className="mt-5 font-slab font-800 text-2xl text-burgundy uppercase tracking-wide">{b.title}</h2>
              <p className="mt-3 text-foreground/70 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-cream-card/60 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="flex items-center gap-2 text-gold-dark justify-center">
            <Users className="w-6 h-6" />
            <span className="font-slab font-700 uppercase tracking-wide">Who We Serve</span>
          </div>
          <h2 className="mt-3 text-center font-slab font-800 text-3xl text-burgundy">{whoWeServe.headline}</h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {whoWeServe.points.map((p) => (
              <div key={p} className="rounded-2xl bg-white border border-gold/20 p-6 text-center">
                <span className="inline-flex w-11 h-11 rounded-full bg-burgundy/10 items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-burgundy" />
                </span>
                <p className="mt-3 font-medium text-foreground/80">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <h2 className="text-center font-slab font-800 text-3xl text-burgundy max-w-3xl mx-auto">
          Why Families &amp; Community Partners Choose Hearten
        </h2>
        <div className="brand-divider mt-5 max-w-xs mx-auto"><Heart className="w-4 h-4 text-gold" /></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {whyChoose.map((w) => (
            <div key={w} className="flex items-center gap-3 rounded-xl bg-white border border-gold/20 px-5 py-4">
              <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
              <span className="font-medium text-foreground/85">{w}</span>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-burgundy text-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 text-center">
          <p className="font-script text-3xl text-gold-light">Our Core Values</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {values.map((v) => {
              const Icon = valueIcons[v.icon];
              return (
                <div key={v.label} className="rounded-2xl bg-cream/10 p-6 hover:bg-cream/15 transition-colors">
                  <Icon className="w-8 h-8 text-gold-light mx-auto" />
                  <p className="mt-3 font-slab font-700 uppercase tracking-wide text-sm">{v.label}</p>
                </div>
              );
            })}
          </div>
          <Button asChild size="lg" className="mt-10 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-8 h-12">
            <Link to="/contact">Get In Touch <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
