"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  DraftingCompass,
  Lightbulb,
  Pencil,
  Settings,
  Key
} from 'lucide-react'

// Constants
const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-Suppis-Fundo-transparente-1766487680528.png?width=8000&height=8000&resize=contain"
const GEOMETRIC_ICON_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Design-sem-nome-29-1766456393024.png?width=8000&height=8000&resize=contain"
const HERO_VIDEO_URL = "https://suppis2.openleads.com.br/wp-content/uploads/2025/12/video-1766457434494.mp4"

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
      <source src={HERO_VIDEO_URL} type="video/mp4" />
    </video>
  )
}

const SuppisIntegraDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawLines = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerCircle = container.querySelector('#centerCircle') as HTMLElement
    const items = container.querySelectorAll('.service-circle') as NodeListOf<HTMLElement>
    if (!centerCircle || items.length === 0) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)

    ctx.strokeStyle = 'rgba(165, 165, 155, 0.6)'
    ctx.lineWidth = 1.2

    const centerRect = centerCircle.getBoundingClientRect()
    const centerX = centerRect.left - rect.left + centerRect.width / 2
    const centerY = centerRect.top - rect.top + centerRect.height / 2
    const centerRadius = centerRect.width / 2

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect()
      
      const itemX = itemRect.left - rect.left + itemRect.width / 2
      const itemY = itemRect.top - rect.top + itemRect.height / 2
      const itemRadius = itemRect.width / 2

      const angle = Math.atan2(itemY - centerY, itemX - centerX)

      const startX = centerX + Math.cos(angle) * centerRadius
      const startY = centerY + Math.sin(angle) * centerRadius

      const endX = itemX - Math.cos(angle) * itemRadius
      const endY = itemY - Math.sin(angle) * itemRadius

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setTimeout(drawLines, 50)
    }

    window.addEventListener('resize', handleResize)
    
    // Initial draw
    setTimeout(drawLines, 500) // Give it some time to layout

    return () => window.removeEventListener('resize', handleResize)
  }, [drawLines])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-medium text-[#4A583E] tracking-tighter text-center mb-16">
          Conheça o Suppis Integra, uma solução completa de ponta a ponta
        </h2>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
              font-family: 'DeMonte';
              src: url('https://suppis2.openleads.com.br/wp-content/uploads/2025/12/DeMonte-Regular-1.ttf') format('truetype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
          }

          @font-face {
              font-family: 'DeMonte';
              src: url('https://suppis2.openleads.com.br/wp-content/uploads/2025/12/DeMonte-Bold.otf') format('opentype');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
          }

          .suppis-wrapper {
              width: 100% !important;
              max-width: 100% !important;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'DeMonte', Georgia, serif;
              font-style: normal;
              padding: 40px 20px;
              margin: 0;
              box-sizing: border-box;
          }

          .suppis-container {
              position: relative;
              width: 100% !important;
              max-width: 100% !important;
              aspect-ratio: 1.4 / 1;
          }

          .suppis-container #linesCanvas {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 1;
              pointer-events: none;
          }

          .suppis-container .center-circle {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 28%;
              aspect-ratio: 1 / 1;
              background: radial-gradient(ellipse at 40% 40%, #4D5D4A, #3D4D3A 40%, #2E3E2E 100%);
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-shadow: 
                  0 0 0 clamp(8px, 1.2vw, 14px) rgba(200, 200, 190, 0.45),
                  0 0 0 clamp(10px, 1.5vw, 18px) rgba(180, 180, 170, 0.2);
              z-index: 10;
              overflow: hidden;
              transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .suppis-container .center-circle:hover {
              transform: translate(-50%, -50%) scale(1.03);
              box-shadow: 
                  0 0 0 clamp(10px, 1.4vw, 16px) rgba(200, 200, 190, 0.5),
                  0 0 0 clamp(14px, 2vw, 22px) rgba(180, 180, 170, 0.25),
                  0 10px 40px rgba(0,0,0,0.15);
          }

          .suppis-container .center-content {
              z-index: 2;
              text-align: center;
          }

          .suppis-container .center-title {
              font-family: 'DeMonte', Georgia, serif;
              font-size: clamp(32px, 5vw, 52px);
              font-weight: 700;
              font-style: normal;
              color: #fff;
              line-height: 1.05;
          }

          .suppis-container .center-subtitle {
              font-family: 'DeMonte', Georgia, serif;
              font-size: clamp(14px, 1.9vw, 22px);
              font-weight: 400;
              font-style: normal;
              color: rgba(255,255,255,0.9);
              letter-spacing: 1px;
              margin-top: clamp(6px, 1vw, 12px);
          }

          .suppis-container .service-item {
              position: absolute;
              display: flex;
              align-items: center;
              gap: clamp(10px, 1.5vw, 18px);
              cursor: pointer;
          }

          .suppis-container .service-circle {
              width: clamp(65px, 9vw, 95px);
              aspect-ratio: 1 / 1;
              background: #FAFAFA;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 
                  0 0 0 clamp(5px, 0.7vw, 8px) rgba(190, 190, 180, 0.5),
                  0 0 0 clamp(7px, 1vw, 11px) rgba(200, 200, 190, 0.25);
              flex-shrink: 0;
              transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
              overflow: hidden;
          }

          .suppis-container .service-item:hover .service-circle {
              transform: scale(1.1);
              box-shadow: 
                  0 0 0 clamp(6px, 0.9vw, 10px) rgba(77, 93, 74, 0.35),
                  0 0 0 clamp(10px, 1.4vw, 15px) rgba(77, 93, 74, 0.18),
                  0 8px 25px rgba(0,0,0,0.12);
          }

          .suppis-container .service-circle img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: all 0.35s ease;
          }

          .suppis-container .service-label {
              font-family: 'DeMonte', Georgia, serif;
              font-size: clamp(13px, 1.7vw, 19px);
              font-weight: 400;
              font-style: normal;
              color: #3A4A3A;
              line-height: 1.3;
              transition: all 0.3s ease;
          }

          .suppis-container .item-marcenaria { top: 8%; left: 32%; flex-direction: row-reverse; }
          .suppis-container .item-marcenaria .service-label { text-align: right; }
          .suppis-container .item-iluminacao { top: 8%; right: 10%; }
          .suppis-container .item-gesso { top: 32%; right: 2%; }
          .suppis-container .item-marmoraria { bottom: 32%; right: 2%; }
          .suppis-container .item-pisos { bottom: 8%; right: 18%; }
          .suppis-container .item-metais { bottom: 8%; left: 28%; flex-direction: row-reverse; }
          .suppis-container .item-metais .service-label { text-align: right; }
          .suppis-container .item-cortinas { bottom: 32%; left: 2%; flex-direction: row-reverse; }
          .suppis-container .item-cortinas .service-label { text-align: right; }
          .suppis-container .item-eletrica { top: 32%; left: 2%; flex-direction: row-reverse; }
          .suppis-container .item-eletrica .service-label { text-align: right; }

          @media (max-width: 900px) {
              .suppis-container { aspect-ratio: 1.2 / 1; }
              .suppis-container .center-circle { width: 30%; }
              .suppis-container .service-label { font-size: clamp(11px, 2vw, 16px); }
          }

          @media (max-width: 600px) {
              .suppis-wrapper { padding: 15px 5px; }
              .suppis-container { aspect-ratio: 1 / 1.1; }
              .suppis-container .center-circle { width: 32%; }
              .suppis-container .service-circle { width: clamp(50px, 14vw, 70px); }
              .suppis-container .service-label { font-size: clamp(10px, 2.8vw, 14px); max-width: 70px; }
              .suppis-container .service-item { gap: clamp(5px, 1.2vw, 10px); }
              .suppis-container .item-marcenaria { top: 4%; left: 28%; }
              .suppis-container .item-iluminacao { top: 4%; right: 5%; }
              .suppis-container .item-gesso { top: 28%; right: 0%; }
              .suppis-container .item-marmoraria { bottom: 28%; right: 0%; }
              .suppis-container .item-pisos { bottom: 4%; right: 12%; }
              .suppis-container .item-metais { bottom: 4%; left: 22%; }
              .suppis-container .item-cortinas { bottom: 28%; left: 0%; }
              .suppis-container .item-eletrica { top: 28%; left: 0%; }
          }
        ` }} />

        <div className="suppis-wrapper">
          <div className="suppis-container" id="suppis-container" ref={containerRef}>
            <canvas id="linesCanvas" ref={canvasRef}></canvas>

            <div className="center-circle" id="centerCircle">
              <div className="center-content">
                <div className="center-title">Suppis<br/>Integra</div>
                <div className="center-subtitle">Método Exclusivo</div>
              </div>
            </div>

            <div className="service-item item-marcenaria">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/marcenaria.jpeg" alt="Marcenaria" onLoad={drawLines} /></div>
              <span className="service-label">Marcenaria</span>
            </div>
            <div className="service-item item-iluminacao">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/iluminacao.jpeg" alt="Iluminação" onLoad={drawLines} /></div>
              <span className="service-label">Iluminação</span>
            </div>
            <div className="service-item item-gesso">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Gesso.png" alt="Gesso" onLoad={drawLines} /></div>
              <span className="service-label">Gesso</span>
            </div>
            <div className="service-item item-marmoraria">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Marmoraria.jpeg" alt="Marmoraria" onLoad={drawLines} /></div>
              <span className="service-label">Marmoraria</span>
            </div>
            <div className="service-item item-pisos">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Pisos.jpeg" alt="Pisos e Revestimentos" onLoad={drawLines} /></div>
              <span className="service-label">Pisos e<br/>Revestimentos</span>
            </div>
            <div className="service-item item-metais">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/METEAIS.jpeg" alt="Metais" onLoad={drawLines} /></div>
              <span className="service-label">Metais</span>
            </div>
            <div className="service-item item-cortinas">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/CORTINAS.jpeg" alt="Cortinas e Persianas" onLoad={drawLines} /></div>
              <span className="service-label">Cortinas e<br/>Persianas</span>
            </div>
            <div className="service-item item-eletrica">
              <div className="service-circle"><img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Eletrica.jpeg" alt="Elétrica" onLoad={drawLines} /></div>
              <span className="service-label">Elétrica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms - MUST be defined at top level
  const yHeroLeft = useTransform(scrollYProgress, [0, 1], [0, 100])
  const yHeroRight = useTransform(scrollYProgress, [0, 1], [0, -150])
  const yIntroCircle = useTransform(scrollYProgress, [0, 1], [0, -50])
  const yIntroFloating = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yIntegraTop = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yIntegraBottom = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yVantagens = useTransform(scrollYProgress, [0, 1], [0, 100])
  
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
          className="relative w-48 h-24"
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
            <div className={`relative transition-all duration-500 ${isScrolled ? 'w-48 h-10' : 'w-64 h-16'}`}>
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
            <Button size="sm" className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white rounded-full px-8 h-10 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300">
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
          <div className="w-64 h-16 relative mb-8">
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
          y={yHeroLeft}
        />
        <DecorativeIcon 
          className="w-[400px] bottom-40 -right-20" 
          rotation={-45} 
          opacity={0.1} 
          y={yHeroRight}
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
                <Button className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                  Falar com um especialista
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-white/20 text-[#4A583E] hover:bg-transparent hover:text-white hover:opacity-60 px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold backdrop-blur-xl transition-all duration-300">
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
                     y={yIntroCircle}
                   />
                </div>
              </div>

              <div className="space-y-12 relative">
                {/* Extra floating icon for modern feel */}
                <DecorativeIcon 
                  className="w-32 -top-20 -right-10" 
                  rotation={15} 
                  opacity={0.1} 
                  y={yIntroFloating}
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

      {/* New Section: Integra Visual Diagram */}
      <SuppisIntegraDiagram />

      {/* Section 2: Nosso Processo - Modern Card Grid */}
      <section id="suppis integra" className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-[10px] mb-6 block">Nosso Processo</span>
            <h2 className="text-5xl md:text-7xl font-medium text-[#4A583E] tracking-tighter leading-[0.95] mb-10">
              Como vamos fazer o seu projeto juntos
            </h2>
            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Aqui seu projeto sai do papel. Marcenaria sob medida e interiores completos com quem entende cada etapa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "Planejamento",
                desc: "Reunião inicial para entender suas necessidades, estilo e orçamento.",
                icon: <Lightbulb className="w-8 h-8" />,
                dark: true
              },
              {
                title: "Desenvolvimento",
                desc: "Criação do projeto de marcenaria personalizado e definição de acabamentos.",
                icon: <Pencil className="w-8 h-8" />,
                dark: false
              },
              {
                title: "Execução",
                desc: "Fabricação e instalação coordenada com gestão profissional de cronograma.",
                icon: <Settings className="w-8 h-8" />,
                dark: true
              },
              {
                title: "Entrega",
                desc: "Acompanhamento final, ajustes e entrega completa do ambiente pronto.",
                icon: <Key className="w-8 h-8" />,
                dark: false
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`p-12 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  item.dark 
                    ? 'bg-[#4A583E] text-white' 
                    : 'bg-white text-[#4A583E] shadow-sm border border-black/[0.03]'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-10 ${
                  item.dark ? 'bg-white/10' : 'bg-[#4A583E]/5'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-medium mb-6 tracking-tight">{item.title}</h3>
                <p className={`text-lg leading-relaxed font-light ${
                  item.dark ? 'text-white/80' : 'text-zinc-500'
                }`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                Quero começar meu projeto
                <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </motion.div>
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
          y={yVantagens}
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

      {/* Testimonials - Refined Light Section with Contrast */}
      <section className="relative pt-40 pb-72 bg-transparent z-30">
        {/* Background preenchimento verde para sobreposição */}
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[#4A583E] pointer-events-none" />
        
        <div className="absolute inset-x-0 top-0 bottom-32 bg-[#F5F2ED] rounded-t-[100px] md:rounded-t-[250px] rounded-b-[100px] md:rounded-b-[200px] shadow-2xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-[10px] mb-6 block">Depoimentos</span>
              <h2 className="text-4xl md:text-6xl font-medium text-[#4A583E] tracking-tighter leading-tight mb-10">
                O que dizem sobre <br/> a experiência Suppis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "A Suppis transformou meu apartamento em um refúgio de paz. O acabamento da marcenaria é algo que nunca vi antes em anos de mercado.",
                  author: "Mariana Silveira",
                  role: "Arquiteta & Cliente",
                  img: "https://i.pravatar.cc/150?u=mariana"
                },
                {
                  text: "Gestão completa que me permitiu focar no meu trabalho enquanto meu novo escritório era montado. Entrega impecável e dentro do prazo.",
                  author: "Ricardo Fonseca",
                  role: "Empresário",
                  img: "https://i.pravatar.cc/150?u=ricardo"
                },
                {
                  text: "O método Suppis Integra eliminou todas as minhas dores de cabeça com a obra. Ter tudo centralizado é o verdadeiro luxo moderno.",
                  author: "Ana Paula Costa",
                  role: "Cliente Residencial",
                  img: "https://i.pravatar.cc/150?u=ana"
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="bg-white p-10 rounded-[3rem] shadow-sm border border-black/[0.02] flex flex-col justify-between"
                >
                  <p className="text-[#4A583E] text-lg font-light italic leading-relaxed mb-8">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden grayscale">
                      <Image src={testimonial.img} alt={testimonial.author} width={56} height={56} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[#4A583E] font-medium text-sm uppercase tracking-wide">{testimonial.author}</p>
                      <p className="text-zinc-400 text-[9px] uppercase tracking-[0.2em] mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - XYZ Inspired Layout */}
      <footer className="bg-[#4A583E] text-white pt-56 pb-12 -mt-48 relative z-20">
        <div className="container mx-auto px-6">
          {/* Top Row: Logo & Socials */}
          <div className="flex flex-col md:flex-row md:items-center gap-10 mb-20">
            <div className="relative w-72 h-20">
              <Image src={LOGO_URL} alt="Suppis Logo" fill className="object-contain object-left brightness-0 invert" />
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <MessageCircle className="w-5 h-5" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Grid: Info Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-8">Mapa do Site</h4>
              <ul className="space-y-4 text-sm font-medium text-white/80 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Processos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atelier</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-8">Funcionamento</h4>
              <p className="text-sm font-medium text-white/80 leading-relaxed uppercase tracking-widest">
                Segunda à Sexta<br/>
                08h às 18h30
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-8">Endereço</h4>
              <p className="text-sm font-medium text-white/80 leading-relaxed uppercase tracking-widest">
                Rua Doutor Marinho Lobo, 23<br/>
                Centro, Joinville - SC<br/>
                CEP: 89201-020
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-8">Contato</h4>
              <ul className="space-y-3 text-sm font-medium text-white/80 uppercase tracking-widest">
                <li>+55 47 99924-7199</li>
                <li>contato@suppis.com.br</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/20">
            <p>© 2025 Suppis Soluções. Crafted for excellence.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
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
