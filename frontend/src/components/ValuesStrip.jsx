import React from "react";
import { Heart, Handshake, Sparkles, Star, Home } from "lucide-react";
import { values } from "../data/mock";

const iconMap = { Heart, Handshake, Sparkles, Star, Home };

export default function ValuesStrip() {
  return (
    <div className="bg-burgundy-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-2">
          {values.map((v, i) => {
            const Icon = iconMap[v.icon];
            return (
              <React.Fragment key={v.label}>
                <div className="flex items-center gap-2.5 px-3 group">
                  <Icon className="w-5 h-5 text-gold-light transition-transform duration-300 group-hover:scale-125" />
                  <span className="font-slab font-700 uppercase tracking-wide text-sm text-cream">
                    {v.label}
                  </span>
                </div>
                {i < values.length - 1 && (
                  <span className="hidden sm:block h-5 w-px bg-gold/40" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
