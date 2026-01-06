'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contato" className="bg-[#4A583E] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#4A583E] font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-semibold tracking-tighter">Suppis</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Especialistas em transformar espaços em experiências memoráveis através do design integrado e marcenaria de alto padrão.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white/60 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-white/60 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-white/60 transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="#sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="#suppis-integra" className="hover:text-white transition-colors">Metodologia</Link></li>
              <li><Link href="#projetos" className="hover:text-white transition-colors">Projetos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Serviços</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>Design de Interiores</li>
              <li>Marcenaria sob Medida</li>
              <li>Consultoria de Espaços</li>
              <li>Execução de Obras</li>
              <li>Gestão de Fornecedores</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} />
                <span>contato@suppis.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
          <p>© 2026 Suppis Soluções de Interiores. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
