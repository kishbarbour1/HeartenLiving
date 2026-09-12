import React, { useState } from "react";
import { Heart, Gift, CheckCircle2, HandHeart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { donationTiers } from "../data/mock";

export default function Donate() {
  const { toast } = useToast();
  const [amount, setAmount] = useState(75);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const effective = custom ? Number(custom) : amount;

  const onDonate = (e) => {
    e.preventDefault();
    if (!effective || effective <= 0) {
      toast({ title: "Choose an amount", description: "Please select or enter a donation amount." });
      return;
    }
    // FRONTEND-ONLY mock — no real payment processed
    const existing = JSON.parse(localStorage.getItem("hearten_donations") || "[]");
    existing.push({ amount: effective, frequency, name, email, ts: new Date().toISOString() });
    localStorage.setItem("hearten_donations", JSON.stringify(existing));
    setDone(true);
    toast({ title: "Thank you for your generosity!", description: `Your ${frequency === "monthly" ? "monthly " : ""}gift of $${effective} makes futures possible.` });
  };

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
          {/* tiers */}
          <div className="lg:col-span-2 space-y-4">
            {donationTiers.map((t) => (
              <button
                key={t.amount}
                onClick={() => { setAmount(t.amount); setCustom(""); }}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${
                  effective === t.amount
                    ? "border-gold bg-gold/10 shadow-[0_10px_30px_-18px_rgba(190,138,44,0.7)]"
                    : "border-gold/20 bg-white hover:border-gold/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-slab font-800 text-2xl text-burgundy">${t.amount}</span>
                  <span className="text-sm font-bold uppercase tracking-wide text-gold-dark">{t.label}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/65">{t.desc}</p>
              </button>
            ))}
          </div>

          {/* form */}
          <div className="lg:col-span-3">
            {done ? (
              <div className="rounded-3xl bg-burgundy text-cream p-10 text-center">
                <span className="w-16 h-16 rounded-full bg-cream/15 flex items-center justify-center mx-auto">
                  <Heart className="w-9 h-9 text-gold-light fill-gold-light" />
                </span>
                <h2 className="mt-5 font-slab font-800 text-3xl">Thank you!</h2>
                <p className="mt-2 text-cream/80 max-w-sm mx-auto">
                  Your generosity helps a young adult find safety, stability, and hope. You’re walking
                  beside them every step of the journey.
                </p>
                <p className="font-script text-3xl text-gold-light mt-4">A brighter future tomorrow.</p>
                <Button onClick={() => setDone(false)} className="mt-6 bg-gold hover:bg-gold-dark text-white rounded-full px-6">
                  Make Another Gift
                </Button>
              </div>
            ) : (
              <form onSubmit={onDonate} className="rounded-3xl bg-white border border-gold/20 p-8 shadow-[0_12px_40px_-24px_rgba(110,20,35,0.4)]">
                <h2 className="font-slab font-800 text-2xl text-burgundy flex items-center gap-2">
                  <Gift className="w-6 h-6 text-gold-dark" /> Your Donation
                </h2>

                {/* frequency */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[["once", "One-time"], ["monthly", "Monthly"]].map(([val, label]) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setFrequency(val)}
                      className={`rounded-full py-2.5 font-semibold text-sm transition-colors ${
                        frequency === val ? "bg-burgundy text-cream" : "bg-cream-card/70 text-foreground/70 hover:bg-cream-deep"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* amount chips */}
                <div className="mt-5 grid grid-cols-4 gap-3">
                  {donationTiers.map((t) => (
                    <button
                      type="button"
                      key={t.amount}
                      onClick={() => { setAmount(t.amount); setCustom(""); }}
                      className={`rounded-xl py-3 font-slab font-700 transition-colors ${
                        effective === t.amount && !custom ? "bg-gold text-white" : "bg-cream-card/70 text-burgundy hover:bg-cream-deep"
                      }`}
                    >
                      ${t.amount}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <Label htmlFor="custom" className="text-foreground/80">Or enter a custom amount</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 font-semibold">$</span>
                    <Input
                      id="custom" type="number" min="1" value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-8 bg-cream/60 border-gold/30 focus-visible:ring-gold"
                    />
                  </div>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="dname" className="text-foreground/80">Name</Label>
                    <Input id="dname" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold" />
                  </div>
                  <div>
                    <Label htmlFor="demail" className="text-foreground/80">Email</Label>
                    <Input id="demail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1.5 bg-cream/60 border-gold/30 focus-visible:ring-gold" />
                  </div>
                </div>

                <Button type="submit" size="lg" className="mt-6 w-full bg-gold hover:bg-gold-dark text-white font-semibold rounded-full h-12 text-base">
                  <Heart className="w-4 h-4 mr-2 fill-white" /> Donate ${effective || 0} {frequency === "monthly" ? "/ month" : ""}
                </Button>
                <p className="mt-3 text-center text-xs text-foreground/50 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" /> Demo only — no real payment is processed.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
