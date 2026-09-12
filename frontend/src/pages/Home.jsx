import React from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon, BookOpen, Briefcase, HeartHandshake, Target, Compass,
  Heart, ArrowRight, CheckCircle2, BedDouble, Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import ValuesStrip from "../components/ValuesStrip";
import { services, mission, vision, whoWeServe, whyChoose, brand } from "../data/mock";

const iconMap = { Home: HomeIcon, BookOpen, Briefcase, HeartHandshake };

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-deep">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#6E1423 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-burgundy/10 text-burgundy px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 fill-burgundy" /> Now Accepting Applications
            </span>
            <h1 className="animate-fade-up delay-100 mt-6 font-slab font-900 leading-[1.02] text-burgundy text-4xl sm:text-5xl md:text-6xl">
              Helping Young Adults
              <span className="block text-gold-dark mt-2">Build Stable, Independent Futures</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-6 text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Supportive housing and life-enhancing services in a compassionate environment where
              growth, healing, and long-term stability can flourish.
            </p>
            <div className="animate-fade-up delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-burgundy hover:bg-burgundy-light text-cream font-semibold rounded-full px-8 h-12 text-base shadow-md">
                <Link to="/contact">Apply Today <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-gold text-gold-dark hover:bg-gold hover:text-white font-semibold rounded-full px-8 h-12 text-base bg-transparent">
                <Link to="/donate"><Heart className="w-4 h-4 mr-1.5" /> Donate</Link>
              </Button>
            </div>
            <div className="animate-fade-up delay-400 mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {brand.pillars.map((p, i) => (
                <React.Fragment key={p}>
                  <span className="font-slab font-700 uppercase tracking-wide text-sm text-burgundy">{p}</span>
                  {i < brand.pillars.length - 1 && <span className="h-4 w-px bg-gold/60" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ValuesStrip />

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", text: mission },
            { icon: Compass, title: "Our Vision", text: vision },
          ].map((b) => (
            <div key={b.title} className="relative rounded-2xl bg-white border border-gold/20 p-8 shadow-[0_10px_40px_-20px_rgba(110,20,35,0.3)] hover:shadow-[0_20px_50px_-20px_rgba(110,20,35,0.4)] transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
                <b.icon className="w-7 h-7 text-gold-dark" />
              </div>
              <h2 className="mt-5 font-slab font-800 text-2xl text-burgundy uppercase tracking-wide">{b.title}</h2>
              <p className="mt-3 text-foreground/70 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-cream-card/60 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-script text-3xl text-gold-dark">Our Services &amp; Support</p>
            <h2 className="mt-1 font-slab font-800 text-3xl sm:text-4xl text-burgundy">Everything Needed to Thrive</h2>
            <div className="brand-divider mt-5 max-w-xs mx-auto"><Heart className="w-4 h-4 text-gold" /></div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <div key={s.title} className="group rounded-2xl bg-white border border-gold/20 p-6 hover:-translate-y-1.5 transition-transform duration-300 shadow-[0_10px_30px_-18px_rgba(110,20,35,0.35)]">
                  <div className="w-14 h-14 rounded-xl bg-burgundy flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <Icon className="w-7 h-7 text-cream" />
                  </div>
                  <h3 className="mt-5 font-slab font-700 text-xl text-burgundy">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{s.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-foreground/75">
                        <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream rounded-full font-semibold px-7 bg-transparent">
              <Link to="/services">See All Services <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-dark">
              <Users className="w-6 h-6" />
              <span className="font-slab font-700 uppercase tracking-wide">Who We Serve</span>
            </div>
            <h2 className="mt-3 font-slab font-800 text-3xl sm:text-4xl text-burgundy">{whoWeServe.headline}</h2>
            <ul className="mt-6 space-y-4">
              {whoWeServe.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-burgundy" />
                  </span>
                  <span className="text-lg text-foreground/80">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl bg-burgundy p-10 text-cream overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-10"><Heart className="w-48 h-48" /></div>
            <p className="font-script text-4xl text-gold-light">Hope. Purpose. Future.</p>
            <p className="mt-4 text-cream/85 leading-relaxed">
              We walk beside every young adult with a safe home, caring mentors, and the practical
              skills to build the independent life they deserve.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[["24hr", "Support"], ["18\u201324", "Ages Served"], ["100%", "Compassion"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-cream/10 py-4">
                  <p className="font-slab font-800 text-2xl text-gold-light">{n}</p>
                  <p className="text-xs uppercase tracking-wide text-cream/70 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-cream-card/60 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-slab font-800 text-3xl sm:text-4xl text-burgundy">
              Why Families &amp; Community Partners Choose Hearten
            </h2>
            <div className="brand-divider mt-5 max-w-xs mx-auto"><Heart className="w-4 h-4 text-gold" /></div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {whyChoose.map((w) => (
              <div key={w} className="flex items-center gap-3 rounded-xl bg-white border border-gold/20 px-5 py-4 hover:border-gold transition-colors">
                <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                <span className="font-medium text-foreground/85">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-burgundy to-burgundy-dark text-cream p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute -left-10 -bottom-10 opacity-10"><BedDouble className="w-56 h-56" /></div>
          <div className="relative">
            <p className="font-slab font-800 uppercase tracking-wide text-gold-light">A Safe Place Today</p>
            <h2 className="mt-2 font-script text-4xl sm:text-5xl text-cream">A brighter future tomorrow.</h2>
            <p className="mt-5 max-w-xl mx-auto text-cream/80">
              Safe housing. Real support. A stronger tomorrow. Reach out today and take the first
              step toward independence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-8 h-12">
                <Link to="/contact">Start Your Application</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-cream/60 text-cream hover:bg-cream hover:text-burgundy font-semibold rounded-full px-8 h-12 bg-transparent">
                <Link to="/donate">Support Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
