'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Interior Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-xs mb-4 block">
            Arquitetura & Design de Interiores
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-[#4A583E] tracking-tighter leading-[0.9] mb-8">
            O seu imóvel nas <br />
            <span className="italic font-serif">mãos certas.</span>
          </h1>
          <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
            Especialistas em projetos de interiores e marcenaria com execução integrada. 
            Transformamos espaços em experiências únicas com precisão e sofisticação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-[#4A583E] hover:bg-[#3D4D3A] text-white rounded-full px-8 py-7 text-lg group">
              Iniciar meu projeto
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-[#4A583E] text-[#4A583E] hover:bg-[#4A583E]/5 rounded-full px-8 py-7 text-lg">
              Ver Projetos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-12 bg-[#4A583E]/30"></div>
        <span className="text-[10px] uppercase tracking-widest text-[#4A583E]/60 font-medium">Scroll</span>
      </div>
    </section>
  );
}
