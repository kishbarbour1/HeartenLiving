import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Globe, MapPin, Heart } from "lucide-react";
import Logo from "./Logo";
import { contact, brand } from "../data/mock";

export default function Footer() {
  return (
    <footer className="bg-burgundy text-cream/90">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo size={48} tone="cream" />
            <div>
              <p className="font-brand text-3xl font-800 text-cream leading-none">Hearten</p>
              <p className="text-[10px] tracking-[0.22em] font-semibold text-gold-light uppercase">
                {brand.suffix}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            A safe place today. A brighter future tomorrow. We believe every young adult deserves
            the opportunity to build a safe, stable, and successful future.
          </p>
          <p className="font-script text-2xl text-gold-light mt-4">{brand.scriptLine}</p>
        </div>

        <div>
          <h4 className="font-slab font-700 text-gold-light uppercase tracking-wide text-sm mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Donate", "/donate"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-cream/75 hover:text-gold-light transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-slab font-700 text-gold-light uppercase tracking-wide text-sm mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold-light shrink-0" />
              <a href={contact.phoneHref} className="hover:text-gold-light transition-colors">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-light shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-gold-light transition-colors break-all">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-gold-light shrink-0" />
              <a href={contact.websiteHref} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                {contact.website}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold-light shrink-0" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Hearten Transitional Living Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-gold-light fill-gold-light" /> for brighter futures
          </p>
        </div>
      </div>
    </footer>
  );
}
