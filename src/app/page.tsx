"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Instagram, 
  Linkedin, 
  Menu, 
  MessageCircle, 
  X,
  Sparkles,
  Home,
  Hammer,
  Layout as LayoutIcon,
  DraftingCompass
} from 'lucide-react'

// Constants
const PRIMARY_GREEN = "#2d4c3e"
const ACCENT_GOLD = "#c5a880"
const BRAND_YELLOW = "#f59e0b"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#2d4c3e] selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-[#2d4c3e]' : 'text-white'}`}>
              Suppis<span className="text-secondary">.</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós', 'Depoimentos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? 'text-zinc-600' : 'text-zinc-100'
                }`}
              >
                {item}
              </a>
            ))}
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6">
              Fale Conosco
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={isScrolled ? 'text-zinc-900' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-6 flex flex-col items-center justify-center space-y-8">
          <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós', 'Depoimentos', 'Fale Conosco'].map((item) => (
            <a 
              key={item} 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-[#2d4c3e]"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section - Inspired by XYZ! layout */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            alt="Suppis Interior Design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
                Seu imóvel nas mãos certas<span className="text-secondary">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-100 mb-10 max-w-2xl font-light">
                Somos especialistas em projeto de interiores e marcenaria com execução integrada. 
                Soluções completas unindo gestão e cronograma inteligente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-7 rounded-full text-lg shadow-xl shadow-black/20">
                  Quero falar com um especialista
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-7 rounded-full text-lg backdrop-blur-sm">
                  Conheça a Suppis
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ChevronDown className="text-white w-8 h-8 opacity-50" />
        </div>
      </section>

      {/* Section 1: Intro - Minimalist white background */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-row items-center gap-16">
             <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-secondary font-semibold uppercase tracking-[0.2em] text-sm mb-4 block">Processo Integrado</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2d4c3e] mb-8">
                Sem tempo para planejar a reforma do seu imóvel?
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Na Suppis, oferecemos soluções completas de Interiores unindo gestão, cronograma e execução de forma inteligente, assertiva e integrada. Esqueça a dor de cabeça com múltiplos fornecedores.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                  alt="Minimalist Design"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-8 pl-0 md:pl-10">
                {[
                  { title: "Gestão Unificada", desc: "Um único ponto de contato para todo o seu projeto de interiores." },
                  { title: "Cronograma Real", desc: "Prazos cumpridos com rigor e transparência em todas as etapas." },
                  { title: "Qualidade de Entrega", desc: "Marcenaria própria e acabamento de alto padrão garantidos." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <CheckCircle2 className="text-secondary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2d4c3e] mb-2">{item.title}</h3>
                      <p className="text-zinc-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-6">
                  <Button className="bg-[#2d4c3e] hover:bg-[#2d4c3e]/90 text-white rounded-full px-10 py-6">
                    Conheça nosso método
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cards Vertical - Similar to XYZ Layout */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4c3e] mb-4">
              Suppis Integra
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            <p className="mt-8 text-zinc-500 max-w-2xl mx-auto text-lg">
              Uma solução completa de ponta a ponta para quem busca exclusividade e praticidade.
            </p>
          </div>

          <div className="grid gap-12 max-w-6xl mx-auto">
            {[
              {
                title: "Planejamento Estratégico",
                desc: "Definimos cada detalhe, fluxos e necessidades antes de iniciar qualquer movimento, garantindo previsibilidade total.",
                image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800",
                icon: <DraftingCompass className="w-6 h-6" />
              },
              {
                title: "Desenvolvimento Criativo",
                desc: "Projetos autorais que traduzem sua personalidade em espaços funcionais e esteticamente impecáveis.",
                image: "https://images.unsplash.com/photo-1620626011761-9963d7521476?auto=format&fit=crop&q=80&w=800",
                icon: <LayoutIcon className="w-6 h-6" />,
                reverse: true
              },
              {
                title: "Execução Técnica",
                desc: "Nossa equipe técnica coordena a marcenaria e montagem com precisão cirúrgica, respeitando o projeto original.",
                image: "https://images.unsplash.com/photo-1556911223-e2f0228ff015?auto=format&fit=crop&q=80&w=800",
                icon: <Hammer className="w-6 h-6" />
              },
              {
                title: "Entrega e Decoração",
                desc: "O toque final que transforma o imóvel em um lar. Entregamos o espaço pronto para morar e celebrar.",
                image: "https://images.unsplash.com/photo-1513519247388-19345 structures18698?auto=format&fit=crop&q=80&w=800",
                icon: <Sparkles className="w-6 h-6" />,
                reverse: true
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-[2rem] overflow-hidden grid md:grid-cols-2 shadow-xl shadow-black/5 items-center ${item.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`relative h-64 md:h-full min-h-[400px] ${item.reverse ? 'md:order-2' : ''}`}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className={`p-10 md:p-20 ${item.reverse ? 'md:order-1' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#2d4c3e] mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-[#2d4c3e] mb-6">{item.title}</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed mb-8">{item.desc}</p>
                  <Button variant="link" className="text-secondary p-0 text-lg font-bold group">
                    SAIBA MAIS
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Vantagens / Grid Icons - Based on XYZ! */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4c3e] mb-6">
              Vantagens de escolher a Suppis
            </h2>
            <p className="text-zinc-500 text-xl font-light">
              Mais que estrutura — criamos um ambiente pra você viver com conforto e sofisticação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { 
                title: "Exclusividade Suppis", 
                desc: "Projetos únicos que não se repetem, feitos sob medida para o seu estilo de vida.",
                icon: <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center text-secondary mb-6"><Home /></div>
              },
              { 
                title: "Sustentabilidade", 
                desc: "A natureza viva ao seu redor reduz o estresse e aumenta o bem-estar. Integramos o verde consciente.",
                icon: <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center text-secondary mb-6"><Sparkles /></div>
              },
              { 
                title: "Acabamento Premium", 
                desc: "Materiais nobres e execução impecável em cada detalhe, da base ao topo.",
                icon: <div className="w-16 h-16 rounded-full border-2 border-secondary flex items-center justify-center text-secondary mb-6"><Hammer /></div>
              }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center transition-transform duration-300 group-hover:-translate-y-2">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d4c3e] mb-4">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-12 py-8 text-xl shadow-lg shadow-secondary/20">
              AGENDAR VISITA
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Carousel Feel */}
      <section className="py-24 bg-[#2d4c3e] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-secondary font-semibold uppercase tracking-widest text-sm mb-6 block text-center">Depoimentos</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Quem fez seus projetos conosco recomenda!</h2>
            
            <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[3rem] border border-white/10 relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-3xl font-serif">
                “
              </div>
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
                Fiquei impressionado com o nível de detalhamento do projeto. Cada espaço foi pensado com cuidado, a marcenaria é de extrema qualidade e a comunicação durante todo o processo foi transparente e profissional.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-zinc-600 overflow-hidden relative">
                  <Image src="https://i.pravatar.cc/150?u=1" alt="Avatar" fill />
                </div>
                <div>
                  <p className="font-bold text-xl">Carlos Eduardo Matos</p>
                  <p className="text-secondary text-sm">Médico & Cliente Suppis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-3xl font-bold text-[#2d4c3e] mb-6">
                Suppis<span className="text-secondary">.</span>
              </div>
              <p className="text-zinc-500 mb-8">
                Transformando ambientes em experiências únicas com luxo, conforto e integração total.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors group">
                  <Instagram className="w-5 h-5 text-zinc-600 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors group">
                  <Linkedin className="w-5 h-5 text-zinc-600 group-hover:text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-[#2d4c3e] mb-6">Redes Sociais</h4>
              <ul className="space-y-4 text-zinc-500">
                <li><a href="#" className="hover:text-secondary">Instagram</a></li>
                <li><a href="#" className="hover:text-secondary">LinkedIn</a></li>
                <li><a href="#" className="hover:text-secondary">Facebook</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-[#2d4c3e] mb-6">Contato</h4>
              <ul className="space-y-4 text-zinc-500">
                <li className="flex items-center gap-2"><MessageCircle size={16} /> +55 47 99924-7199</li>
                <li>contato@suppis.com.br</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-[#2d4c3e] mb-6">Localização</h4>
              <p className="text-zinc-500 leading-relaxed">
                Rua Doutor Marinho Lobo, Sala 23, Joinville, Santa Catarina, Brazil
              </p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
            <p>© 2025 Suppis Soluções de Interiores. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-600">Privacidade</a>
              <a href="#" className="hover:text-zinc-600">Termos</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Whale / WhatsApp button like in xyz! */}
      <a 
        href="#"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-[90]"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  )
}
