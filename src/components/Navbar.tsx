'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Metodologia', href: '#suppis-integra' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#4A583E] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className={`text-2xl font-semibold tracking-tighter ${isScrolled ? 'text-[#4A583E]' : 'text-[#4A583E]'}`}>
            Suppis
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-[#4A583E] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-[#4A583E] hover:bg-[#3D4D3A] text-white rounded-full px-6">
            Falar com Especialista
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#4A583E]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-zinc-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-zinc-600 py-2 border-b border-zinc-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-[#4A583E] hover:bg-[#3D4D3A] text-white rounded-full py-6 mt-2">
            Falar com Especialista
          </Button>
        </div>
      )}
    </nav>
  );
}
