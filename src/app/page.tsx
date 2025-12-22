"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
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

// Constants - Matching the reference image and updated globals
const PRIMARY_GREEN = "#4A583E" // Sophisticated Green from image
const SECONDARY_GOLD = "#d4c3b0" // Delicate gold/sand

const DecorativeSemicircle = ({ className = "", rotation = 0, opacity = 0.2 }) => (
  <svg 
    viewBox="0 0 200 100" 
    className={`absolute pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, opacity }}
  >
    <path 
      d="M 200 100 A 100 100 0 0 0 0 100 L 200 100 Z" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1"
    />
  </svg>
)

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 200])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 selection:bg-[#4A583E] selection:text-white font-light overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'bg-white/70 backdrop-blur-xl py-3 shadow-none border-b border-black/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-medium tracking-tighter ${isScrolled ? 'text-[#4A583E]' : 'text-white'}`}>
              Suppis<span className="text-secondary">.</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-[13px] uppercase tracking-widest font-medium transition-all hover:opacity-50 ${
                  isScrolled ? 'text-zinc-600' : 'text-zinc-100'
                }`}
              >
                {item}
              </a>
            ))}
            <Button size="sm" className="bg-[#4A583E] hover:bg-[#4A583E]/90 text-white rounded-full px-8 h-10 text-xs uppercase tracking-widest">
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
        <div className="fixed inset-0 z-[110] bg-[#faf9f6] p-8 flex flex-col items-center justify-center space-y-10">
          <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-8 h-8 text-[#4A583E]" />
          </button>
          {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós', 'Fale Conosco'].map((item) => (
            <a 
              key={item} 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-medium text-[#4A583E] tracking-tighter"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section - Immersive with Curve Bottom */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            alt="Suppis Interior Design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.2]" />
        </div>
        
        {/* Decorative Semicircles on Hero */}
        <DecorativeSemicircle className="w-[400px] -top-20 -left-20 text-white" rotation={135} opacity={0.3} />
        <DecorativeSemicircle className="w-[300px] bottom-40 -right-20 text-white" rotation={-45} opacity={0.2} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-6xl md:text-8xl font-medium text-white mb-8 tracking-tighter leading-[0.95]">
                Seu imóvel nas <br/> mãos certas<span className="text-[#d4c3b0]">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-200 mb-12 max-w-2xl font-light leading-relaxed">
                Especialistas em projeto de interiores e marcenaria com execução integrada. 
                Sofisticação e gestão inteligente para seu lar.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button className="bg-[#4A583E] hover:bg-[#4A583E]/90 text-white px-10 py-8 rounded-full text-sm uppercase tracking-widest shadow-2xl transition-transform hover:scale-105">
                  Falar com um especialista
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-10 py-8 rounded-full text-sm uppercase tracking-widest backdrop-blur-xl">
                  Conheça a Suppis
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Large stylized transition curve at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#faf9f6] rounded-t-[100px] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] md:rounded-t-[200px]" />
      </section>

      {/* Section 1: Intro - Refined & Delicate */}
      <section className="py-32 bg-[#faf9f6] relative z-20 -mt-px overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                  alt="Minimalist Design"
                  fill
                  className="object-cover grayscale-[0.3]"
                />
              </motion.div>
              {/* Overlapping Curve Decoration */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#4A583E] rounded-full flex items-center justify-center text-white/20">
                 <DecorativeSemicircle className="w-40 text-white" rotation={45} opacity={0.5} />
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[#4A583E] font-medium uppercase tracking-[0.3em] text-xs">Processo de Elite</span>
                <h2 className="text-5xl md:text-6xl font-medium text-[#4A583E] tracking-tighter leading-tight">
                  Sem tempo para a <br/> reforma perfeita?
                </h2>
                <p className="text-zinc-500 text-xl leading-relaxed font-light">
                  Oferecemos soluções completas unindo gestão, cronograma e execução integrada. 
                  Um método refinado que elimina a complexidade e garante o luxo.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  { title: "Gestão Unificada", desc: "Um único ponto de contato para todo o projeto." },
                  { title: "Cronograma de Precisão", desc: "Prazos cumpridos com rigor técnico absoluto." },
                  { title: "Marcenaria Exclusiva", desc: "Produção própria com padrão de alta costura." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="w-px h-12 bg-zinc-200 mt-2 flex-shrink-0 group-hover:bg-[#4A583E] transition-colors duration-500" />
                    <div>
                      <h3 className="text-lg font-medium text-[#4A583E] mb-1 tracking-tight">{item.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Integra - Complex Curved Transitions */}
      <section className="relative py-32 bg-[#4A583E] text-white rounded-[100px] md:rounded-[250px] mx-4 md:mx-10 my-10 overflow-hidden shadow-2xl">
        {/* Abstract Background Shapes */}
        <DecorativeSemicircle className="w-[600px] -top-10 -right-40 text-white" rotation={180} opacity={0.05} />
        <DecorativeSemicircle className="w-[500px] -bottom-20 -left-20 text-white" rotation={0} opacity={0.05} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-medium mb-8 tracking-tighter">
              Suppis Integra
            </h2>
            <div className="w-16 h-px bg-[#d4c3b0] mx-auto mb-8" />
            <p className="text-zinc-300 text-xl font-light leading-relaxed">
              Do planejamento estrutural à decoração final. Uma jornada contínua de cuidado, estética e entrega excepcional.
            </p>
          </div>

          <div className="grid gap-32 max-w-5xl mx-auto">
            {[
              {
                title: "Concepção Estratégica",
                desc: "Definimos cada detalhe e fluxo para garantir que o projeto seja tão funcional quanto deslumbrante.",
                image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800",
                icon: <DraftingCompass className="w-5 h-5" />
              },
              {
                title: "Execução de Marcenaria",
                desc: "Sua visão materializada com precisão cirúrgica em nossa marcenaria própria de alto padrão.",
                image: "https://images.unsplash.com/photo-1620626011761-9963d7521476?auto=format&fit=crop&q=80&w=1200",
                icon: <LayoutIcon className="w-5 h-5" />,
                reverse: true
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid md:grid-cols-2 gap-16 items-center ${item.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`relative aspect-[3/2] md:aspect-square rounded-[3rem] overflow-hidden group ${item.reverse ? 'md:order-2' : ''}`}>
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2]" />
                  <div className="absolute inset-0 bg-[#4A583E]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`${item.reverse ? 'md:order-1' : ''}`}>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8">
                    {item.icon}
                  </div>
                  <h3 className="text-4xl font-medium mb-6 tracking-tighter">{item.title}</h3>
                  <p className="text-zinc-300 text-lg font-light leading-relaxed mb-10">{item.desc}</p>
                  <Button variant="link" className="text-[#d4c3b0] p-0 text-sm uppercase tracking-[0.3em] font-medium group">
                    Descobrir
                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Vantagens - Modern Card Grid */}
      <section className="py-32 bg-[#faf9f6]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[#4A583E] font-medium uppercase tracking-[0.3em] text-xs mb-4 block">Diferenciais</span>
            <h2 className="text-5xl md:text-6xl font-medium text-[#4A583E] tracking-tighter">
              O Padrão Suppis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                title: "Exclusividade Atemporal", 
                desc: "Design que transcende tendências passageiras para durar gerações.",
                icon: <Home className="w-6 h-6" />
              },
              { 
                title: "Biofilia Integrada", 
                desc: "Integramos o verde consciente para ambientes que respiram vida e calma.",
                icon: <Sparkles className="w-6 h-6" />
              },
              { 
                title: "Curadoria de Materiais", 
                desc: "Seleção rigorosa de pedras, madeiras e tecidos de procedência elite.",
                icon: <Hammer className="w-6 h-6" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="p-12 bg-white rounded-[3rem] border border-black/[0.03] shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#4A583E]/5 flex items-center justify-center text-[#4A583E] mb-10 group-hover:bg-[#4A583E] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-medium text-[#4A583E] mb-6 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Immersive Dark Transition */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#4A583E] rounded-t-[100px] md:rounded-t-[250px]" />
        
        {/* Curved Overlay for smooth blending */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-[#faf9f6] z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <DecorativeSemicircle className="w-[200px] mx-auto mb-12 text-[#d4c3b0]" rotation={0} opacity={0.6} />
            <h2 className="text-4xl md:text-5xl font-light text-white italic leading-tight mb-16 tracking-tight">
              &ldquo;A Suppis não apenas entregou um projeto, eles personificaram meu estilo de vida em cada centímetro da minha casa. A precisão da marcenaria é algo que nunca vi antes.&rdquo;
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/10 p-1 backdrop-blur-md">
                <div className="w-full h-full rounded-full overflow-hidden relative grayscale">
                  <Image src="https://i.pravatar.cc/150?u=1" alt="Avatar" fill className="object-cover" />
                </div>
              </div>
              <div>
                <p className="text-white font-medium text-lg tracking-wide uppercase">Carlos Eduardo Matos</p>
                <p className="text-[#d4c3b0] text-xs uppercase tracking-[0.2em] mt-1">Médico & Cliente Suppis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Modern */}
      <footer className="bg-[#4A583E] text-white pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="text-3xl font-medium tracking-tighter mb-8">
                Suppis<span className="text-[#d4c3b0]">.</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-light">
                Redefinindo o luxo através do design consciente e execução impecável. Sua visão, nossa maestria.
              </p>
              <div className="flex gap-6">
                <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Navegação</h4>
              <ul className="space-y-4 text-sm font-light text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Projetos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Conectar</h4>
              <ul className="space-y-4 text-sm font-light text-zinc-400">
                <li className="flex items-center gap-3"><MessageCircle size={14} /> +55 47 99924-7199</li>
                <li>contato@suppis.com.br</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Atelier</h4>
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                Rua Doutor Marinho Lobo, Sala 23<br/>
                Joinville, Santa Catarina, BR
              </p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/20">
            <p>© 2025 Suppis Soluções. Crafted for excellence.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Whale / WhatsApp button - Styled to be delicate */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href="#"
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#4A583E] border border-white/20 rounded-full flex items-center justify-center text-white shadow-3xl z-[90] backdrop-blur-md"
      >
        <MessageCircle size={28} className="text-[#d4c3b0]" />
      </motion.a>
    </div>
  )
}
