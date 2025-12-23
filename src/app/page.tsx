"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
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
const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/LOGO-SUPPIS-resized-1766456353173.webp?width=8000&height=8000&resize=contain"
const GEOMETRIC_ICON_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Design-sem-nome-29-1766456393024.png?width=8000&height=8000&resize=contain"

const DecorativeIcon = ({ className = "", rotation = 0, opacity = 0.4, y = 0 }: { className?: string, rotation?: number, opacity?: number, y?: any }) => (
  <motion.div 
    className={`absolute pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, opacity, y }}
  >
    <Image 
      src={GEOMETRIC_ICON_URL}
      alt="Decorative element"
      width={400}
      height={400}
      className="w-full h-auto"
    />
  </motion.div>
)

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let interval: NodeJS.Timeout | null = null
    
    const playBackwards = () => {
      if (video.paused) return
      if (video.currentTime <= 0.05) {
        video.currentTime = video.duration
      } else {
        // Seeking backwards. 0.033 is ~30fps
        video.currentTime -= 0.033
      }
    }

    const startReverse = () => {
      if (interval) clearInterval(interval)
      interval = setInterval(playBackwards, 33)
    }

    if (video.readyState >= 1) {
      startReverse()
    } else {
      video.onloadedmetadata = startReverse
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-60"
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  )
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#faf9f6] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-64 h-32"
        >
          <Image src={LOGO_URL} alt="Suppis Logo" fill className="object-contain" />
          <motion.div 
            className="absolute -bottom-4 left-0 right-0 h-[1px] bg-[#4A583E]/20"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 selection:bg-[#4A583E] selection:text-white font-light overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'bg-white/70 backdrop-blur-xl py-3 shadow-none border-b border-black/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-40 h-12">
              <Image 
                src={LOGO_URL} 
                alt="Suppis Logo" 
                fill 
                className={`object-contain transition-all duration-500 ${isScrolled ? '' : 'brightness-0 invert'}`}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-[11px] uppercase tracking-[0.3em] font-medium transition-all hover:opacity-50 ${
                  isScrolled ? 'text-zinc-600' : 'text-zinc-100'
                }`}
              >
                {item}
              </a>
            ))}
            <Button size="sm" className="bg-[#4A583E] hover:bg-[#4A583E]/90 text-white rounded-full px-8 h-10 text-[10px] uppercase tracking-[0.2em]">
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
          <div className="w-48 h-16 relative mb-8">
            <Image src={LOGO_URL} alt="Suppis Logo" fill className="object-contain" />
          </div>
          {['Início', 'Suppis Integra', 'Serviços', 'Sobre Nós', 'Fale Conosco'].map((item) => (
            <a 
              key={item} 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-[#4A583E] tracking-tighter"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section - Immersive with Curve Bottom */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Decorative Icons on Hero */}
        <DecorativeIcon 
          className="w-[500px] -top-20 -left-20" 
          rotation={135} 
          opacity={0.15} 
          y={useTransform(scrollYProgress, [0, 1], [0, 100])}
        />
        <DecorativeIcon 
          className="w-[400px] bottom-40 -right-20" 
          rotation={-45} 
          opacity={0.1} 
          y={useTransform(scrollYProgress, [0, 1], [0, -150])}
        />

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
                <Button className="bg-[#4A583E] hover:bg-[#4A583E]/90 text-white px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-transform hover:scale-105">
                  Falar com um especialista
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] backdrop-blur-xl">
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
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#4A583E] rounded-full flex items-center justify-center overflow-hidden">
                   <DecorativeIcon 
                     className="w-64" 
                     rotation={45} 
                     opacity={0.3} 
                     y={useTransform(scrollYProgress, [0, 1], [0, -50])}
                   />
                </div>
              </div>

              <div className="space-y-12 relative">
                {/* Extra floating icon for modern feel */}
                <DecorativeIcon 
                  className="w-32 -top-20 -right-10" 
                  rotation={15} 
                  opacity={0.1} 
                  y={useTransform(scrollYProgress, [0, 1], [0, -80])}
                />
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
      <section id="suppis integra" className="relative py-32 bg-[#4A583E] text-white rounded-[100px] md:rounded-[250px] mx-4 md:mx-10 my-10 overflow-hidden shadow-2xl">
        {/* Abstract Background Shapes */}
        <DecorativeIcon 
          className="w-[800px] -top-40 -right-40" 
          rotation={180} 
          opacity={0.08} 
          y={useTransform(scrollYProgress, [0, 1], [0, 200])}
        />
        <DecorativeIcon 
          className="w-[600px] -bottom-40 -left-20" 
          rotation={0} 
          opacity={0.08} 
          y={useTransform(scrollYProgress, [0, 1], [0, -200])}
        />

        {/* Floating Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] opacity-[0.03] pointer-events-none">
          <Image src={LOGO_URL} alt="Suppis Watermark" width={1000} height={400} className="w-full grayscale brightness-0 invert" />
        </div>

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
                  <Button variant="link" className="text-[#d4c3b0] p-0 text-xs uppercase tracking-[0.3em] font-medium group">
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
      <section id="serviços" className="py-32 bg-[#faf9f6] relative overflow-hidden">
        {/* Decorative elements for Section 3 */}
        <DecorativeIcon 
          className="w-96 -top-20 -right-20" 
          rotation={45} 
          opacity={0.03} 
          y={useTransform(scrollYProgress, [0, 1], [0, 100])}
        />
        <div className="container mx-auto px-6 relative z-10">
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
            <div className="relative w-24 h-24 mx-auto mb-12 opacity-50">
               <Image src={GEOMETRIC_ICON_URL} alt="Suppis Icon" fill className="object-contain" />
            </div>
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
                <p className="text-[#d4c3b0] text-[10px] uppercase tracking-[0.2em] mt-1">Médico & Cliente Suppis</p>
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
              <div className="relative w-40 h-12 mb-8">
                <Image src={LOGO_URL} alt="Suppis Logo" fill className="object-contain brightness-0 invert" />
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed mb-10 font-light">
                Redefinindo o luxo através do design consciente e execução impecável. Sua visão, nossa maestria.
              </p>
              <div className="flex gap-6">
                <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Navegação</h4>
              <ul className="space-y-4 text-[11px] font-light text-zinc-400 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Projetos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Processos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atelier</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Conectar</h4>
              <ul className="space-y-4 text-[11px] font-light text-zinc-400 uppercase tracking-widest">
                <li className="flex items-center gap-3"><MessageCircle size={14} /> +55 47 99924-7199</li>
                <li>contato@suppis.com.br</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b0] mb-10">Atelier</h4>
              <p className="text-[11px] font-light text-zinc-400 leading-relaxed uppercase tracking-widest">
                Rua Doutor Marinho Lobo, Sala 23<br/>
                Joinville, Santa Catarina, BR
              </p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-white/20">
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
