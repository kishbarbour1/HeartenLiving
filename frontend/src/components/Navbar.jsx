import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(110,20,35,0.35)]"
          : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size={44} className="transition-transform duration-300 group-hover:scale-105" />
          <span className="leading-none">
            <span className="block font-brand text-2xl font-800 text-burgundy tracking-tight">
              Hearten
            </span>
            <span className="block text-[10px] tracking-[0.22em] font-semibold text-gold-dark uppercase">
              Transitional Living
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative text-[15px] font-semibold transition-colors duration-200 py-1 ${
                  isActive ? "text-burgundy" : "text-foreground/70 hover:text-burgundy"
                } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-gold after:transition-all after:duration-300 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-white font-semibold rounded-full px-6 shadow-sm transition-colors"
          >
            <Link to="/donate">
              <Heart className="w-4 h-4 mr-1.5 fill-white" /> Donate
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden text-burgundy p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* mobile */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1 flex flex-col gap-1 bg-cream/95 backdrop-blur-md border-t border-gold/20">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg font-semibold ${
                  isActive ? "bg-burgundy/10 text-burgundy" : "text-foreground/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button
            asChild
            className="mt-2 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full"
          >
            <Link to="/donate">
              <Heart className="w-4 h-4 mr-1.5 fill-white" /> Donate
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
