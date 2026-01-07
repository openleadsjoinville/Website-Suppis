"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Lenis from 'lenis'
import { QuotePopup } from '@/components/QuotePopup'
import { WhatsAppButton } from '@/components/WhatsAppButton'
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
  Key,
  MapPin
} from 'lucide-react'

// Constants
const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-Suppis-Fundo-transparente-1766487680528.png?width=8000&height=8000&resize=contain"
const GEOMETRIC_PATH = "M354.05,388.54c-12.44,18.39-29.6,32.07-49.81,40.63-20.87,8.84-43.41,11.52-65.77,7.21-14.5-2.8-28.11-7.75-40.94-14.95-20.09-11.27-35.57-28.57-44.63-49.74-9.5-21.46-12.29-44.91-7.86-68.01,1.86-10.15,4.82-19.54,8.78-29l43.01.36c-1.35-17.42,1.85-33.94,8.42-50.2l-125.92-2.87c-10.62-23.7-12.3-50.42-4.2-75.3,3.93-12.29,9.43-23.63,16.58-34.31,13.2-19.92,32.12-34.68,54.43-43.16,36.12-13.72,72.21-8.16,105.1,10.82,26.57,15.96,42.49,40.27,49.56,70.34,27.05-2.74,52.67,3.96,75.75,17.09,19.64,11.34,34.76,28.43,43.63,49.3,9.19,20.99,12.05,43.83,7.96,66.43-1.98,11.19-5.3,21.67-9.8,31.83l-42.2-.94c1.72,26.62-7.43,52.63-22.1,74.47ZM222.62,194.41c18.63-24.53,46.69-39.76,76.92-43.83-6.79-29.29-22.36-53-47.56-68.65-13.08-7.98-27.17-13.5-42.22-16.71-21.78-4.64-43.86-2.49-64.49,5.64-21.42,8.44-39.56,22.76-52.36,41.94-22.02,33.29-29.05,70.63-12.74,107.99l125.66,2.81c4.52-10.57,9.84-20.09,16.79-29.19ZM366.45,276.47c5.14,11.53,8.51,23.42,9.55,36.21l41.57,1.02c4.18-9.57,7.2-19.19,9.15-29.52,4.26-22.52,1.68-45.31-7.4-66.29-8.57-20.5-23.2-37.36-42.32-48.73-22.15-13.06-50.19-20.78-75.96-17.43,3.34,16.39,3.01,32.2-.36,48.02-2.08,9.45-4.99,18.3-8.86,27.09l-85.19-2.01c-6.7,16.03-9.95,32.85-8.54,50.25l80.92.69,87.43.7ZM291.05,225.62c10.15-23.88,14.14-48.46,8.73-73.8-12.92,1.6-24.82,5.37-36.3,10.87-15.21,7.36-28.2,17.72-38.68,30.96-7.21,9.15-12.94,18.94-17.63,30.02l83.89,1.95ZM353.98,386.44c13.8-21.09,22.81-46.82,20.91-72.46l-169.08-3.85c-4.72-10.93-7.75-22.14-8.86-33.88l-42.27-.32c-4,9.44-6.87,18.97-8.64,29.13-4.17,22.55-1.16,45.24,7.95,66.17,9.07,20.81,24.14,37.88,43.97,49.03,13.21,7.43,27.31,12.5,42.3,15.21,20.93,3.78,41.91,1.27,61.55-6.64,21.35-8.6,39.39-22.94,52.16-42.39ZM365.68,277.71l-97.58-.81-69.95-.67c1.16,11.39,4.02,22.41,8.53,32.68l168.07,3.85c-.92-12.42-4.26-23.89-9.07-35.05Z"
const HERO_VIDEO_URL = "https://suppis2.openleads.com.br/wp-content/uploads/2025/12/video-1766457434494.mp4"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
}

const DecorativeIcon = ({ 
  className = "", 
  rotation = 0, 
  opacity = 0.4, 
  y = 0,
  color = "#d2d6d1"
}: { 
  className?: string, 
  rotation?: number, 
  opacity?: number, 
  y?: any,
  color?: string
}) => (
  <motion.div 
    className={`absolute pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)`, opacity, y }}
  >
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <path d={GEOMETRIC_PATH} fill={color} />
    </svg>
  </motion.div>
)

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Força as propriedades de autoplay no DOM para garantir compatibilidade mobile
    video.muted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    
    const playVideo = () => {
      video.play().catch(() => {
        // Silently handle autoplay rejection
      })
    }

    playVideo()

    // Fallback: inicia o vídeo na primeira interação caso o autoplay seja bloqueado pelo sistema
    const handleInteraction = () => {
      playVideo()
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('mousedown', handleInteraction)
    }

    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('scroll', handleInteraction)
    window.addEventListener('mousedown', handleInteraction)

    return () => {
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('mousedown', handleInteraction)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-60 pointer-events-none"
    >
      <source src={HERO_VIDEO_URL} type="video/mp4" />
    </video>
  )
}

const SuppisIntegraDiagram = () => {
  useEffect(() => {
    function drawLines() {
        const container = document.getElementById('suppis-container');
        const canvas = document.getElementById('linesCanvas') as HTMLCanvasElement;
        if (!container || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const centerCircle = document.getElementById('centerCircle');
        const items = container.querySelectorAll('.service-circle');
        if (!centerCircle) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);

        ctx.strokeStyle = 'rgba(165, 165, 155, 0.6)';
        ctx.lineWidth = 1.2;

        const centerRect = centerCircle.getBoundingClientRect();
        const centerX = centerRect.left - rect.left + centerRect.width / 2;
        const centerY = centerRect.top - rect.top + centerRect.height / 2;
        const centerRadius = centerRect.width / 2;

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            
            const itemX = itemRect.left - rect.left + itemRect.width / 2;
            const itemY = itemRect.top - rect.top + itemRect.height / 2;
            const itemRadius = itemRect.width / 2;

            const angle = Math.atan2(itemY - centerY, itemX - centerX);

            const startX = centerX + Math.cos(angle) * centerRadius;
            const startY = centerY + Math.sin(angle) * centerRadius;

            const endX = itemX - Math.cos(angle) * itemRadius;
            const endY = itemY - Math.sin(angle) * itemRadius;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        });
    }

    function waitForImages() {
        const images = document.querySelectorAll('.suppis-container .service-circle img');
        let loadedCount = 0;
        
        if (images.length === 0) {
          setTimeout(drawLines, 100);
          return;
        }

        images.forEach(img => {
            const image = img as HTMLImageElement;
            if (image.complete) {
                loadedCount++;
            } else {
                image.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        setTimeout(drawLines, 50);
                    }
                });
            }
        });
        
        if (loadedCount === images.length) {
            setTimeout(drawLines, 100);
        }
    }

    if (document.readyState === 'complete') {
        waitForImages();
        setTimeout(drawLines, 200);
    } else {
        window.addEventListener('load', () => {
            waitForImages();
            setTimeout(drawLines, 200);
        });
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(drawLines, 50);
    };
    window.addEventListener('resize', handleResize);

    if (document.fonts) {
        document.fonts.ready.then(() => {
            setTimeout(drawLines, 100);
        });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section id="suppis-integra" className="pt-10 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-[10px] mb-6 block">Solução Completa</span>
          <h2 className="text-4xl md:text-6xl font-medium text-[#4A583E] tracking-tighter leading-[0.95] mb-8">
            Suppis Integra
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed">
            Nosso método exclusivo que conecta todos os pilares do seu projeto em um único ecossistema de gestão e execução.
          </p>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            .suppis-wrapper {
                width: 100% !important;
                max-width: 100% !important;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                padding: 10px 20px 40px 20px;
                margin: 0;
                box-sizing: border-box;
            }

            .suppis-wrapper * {
                margin: 0;
                padding: 0;
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
                width: 25%;
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

            .suppis-container .center-circle::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 60 Q45 40 60 55 Q75 70 60 85 Q45 100 30 80 Q15 60 30 60Z' fill='rgba(255,255,255,0.02)'/%3E%3Cpath d='M70 30 Q85 20 95 35 Q105 50 90 60 Q75 70 65 55 Q55 40 70 30Z' fill='rgba(255,255,255,0.015)'/%3E%3C/svg%3E");
                background-size: 100% 100%;
                opacity: 0.6;
            }

            .suppis-container .center-content {
                z-index: 2;
                text-align: center;
            }

            .suppis-container .center-title {
                font-size: clamp(28px, 4.5vw, 48px);
                font-weight: 700;
                font-style: normal;
                color: #fff;
                line-height: 1.05;
            }

            .suppis-container .center-subtitle {
                font-size: clamp(12px, 1.7vw, 18px);
                font-weight: 400;
                font-style: normal;
                color: rgba(255,255,255,0.9);
                letter-spacing: 1px;
                margin-top: clamp(4px, 0.8vw, 10px);
            }

            .suppis-container .service-item {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transform: translate(-50%, -50%);
                width: auto;
                z-index: 5;
                gap: 12px;
            }

            .suppis-container .service-circle {
                width: clamp(60px, 8vw, 90px);
                aspect-ratio: 1 / 1;
                background: #FAFAFA;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 
                    0 0 0 clamp(4px, 0.6vw, 7px) rgba(190, 190, 180, 0.5),
                    0 0 0 clamp(6px, 0.8vw, 10px) rgba(200, 200, 190, 0.25);
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

            .suppis-container .service-item:hover .service-circle img {
                transform: scale(1.1);
            }

            .suppis-container .service-label {
                font-size: clamp(11px, 1.4vw, 16px);
                font-weight: 500;
                font-style: normal;
                color: #3A4A3A;
                line-height: 1.2;
                transition: all 0.3s ease;
                text-align: center;
                white-space: nowrap;
                pointer-events: none;
            }

            .suppis-container .service-item:hover .service-label {
                color: #2E3E2E;
                font-weight: 600;
            }

            /* Posicionamento Desktop (Ellipse-based) */
            .suppis-container .item-marcenaria { top: 10%; left: 50%; flex-direction: column-reverse; }
            .suppis-container .item-iluminacao { top: 22%; left: 78%; flex-direction: row; }
            .suppis-container .item-gesso { top: 50%; left: 90%; flex-direction: row; }
            .suppis-container .item-marmoraria { top: 78%; left: 78%; flex-direction: row; }
            .suppis-container .item-pisos { top: 90%; left: 50%; flex-direction: column; }
            .suppis-container .item-metais { top: 78%; left: 22%; flex-direction: row-reverse; }
            .suppis-container .item-cortinas { top: 50%; left: 10%; flex-direction: row-reverse; }
            .suppis-container .item-eletrica { top: 22%; left: 22%; flex-direction: row-reverse; }

            .suppis-container .item-gesso .service-label,
            .suppis-container .item-iluminacao .service-label,
            .suppis-container .item-marmoraria .service-label { text-align: left; }

            .suppis-container .item-cortinas .service-label,
            .suppis-container .item-metais .service-label,
            .suppis-container .item-eletrica .service-label { text-align: right; }

            @media (max-width: 900px) {
                .suppis-container {
                    width: 100% !important;
                    aspect-ratio: 1.1 / 1;
                }
                .suppis-container .center-circle { width: 32%; }
                .suppis-container .item-iluminacao { left: 82%; }
                .suppis-container .item-marmoraria { left: 82%; }
                .suppis-container .item-metais { left: 18%; }
                .suppis-container .item-eletrica { left: 18%; }
            }

            @media (max-width: 600px) {
                .suppis-wrapper { padding: 20px 5px; }
                .suppis-container {
                    width: 100% !important;
                    aspect-ratio: 1 / 1.6;
                }
                .suppis-container .center-circle { width: 42%; }
                .suppis-container .center-title { font-size: 26px; }
                .suppis-container .center-subtitle { font-size: 11px; margin-top: 4px; }
                
                .suppis-container .service-circle { width: 62px; }
                .suppis-container .service-label {
                    font-size: 11px;
                    line-height: 1.1;
                }
                .suppis-container .service-item { gap: 8px; }

                /* Posicionamento Mobile (Vertical Ellipse) */
                .suppis-container .item-marcenaria { top: 6%; left: 50%; flex-direction: column-reverse; }
                .suppis-container .item-iluminacao { top: 18%; left: 82%; flex-direction: row; }
                .suppis-container .item-gesso { top: 40%; left: 88%; flex-direction: row; }
                .suppis-container .item-marmoraria { top: 68%; left: 85%; flex-direction: row; }
                .suppis-container .item-pisos { top: 92%; left: 55%; flex-direction: column; }
                .suppis-container .item-metais { top: 85%; left: 18%; flex-direction: row-reverse; }
                .suppis-container .item-cortinas { top: 58%; left: 12%; flex-direction: row-reverse; }
                .suppis-container .item-eletrica { top: 30%; left: 15%; flex-direction: row-reverse; }
            }

        ` }} />

        <div className="suppis-wrapper">
          <div className="suppis-container" id="suppis-container">
            <canvas id="linesCanvas"></canvas>

            <div className="center-circle" id="centerCircle">
              <div className="center-content">
                <div className="center-title">Suppis<br/>Integra</div>
                <div className="center-subtitle">Método Exclusivo</div>
              </div>
            </div>

            <div className="service-item item-marcenaria">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/marcenaria.jpeg" alt="Marcenaria" />
              </div>
              <span className="service-label">Marcenaria</span>
            </div>

            <div className="service-item item-iluminacao">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/iluminacao.jpeg" alt="Iluminação" />
              </div>
              <span className="service-label">Iluminação</span>
            </div>

            <div className="service-item item-gesso">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Gesso.png" alt="Gesso" />
              </div>
              <span className="service-label">Gesso</span>
            </div>

            <div className="service-item item-marmoraria">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Marmoraria.jpeg" alt="Marmoraria" />
              </div>
              <span className="service-label">Marmoraria</span>
            </div>

            <div className="service-item item-pisos">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Pisos.jpeg" alt="Pisos e Revestimentos" />
              </div>
              <span className="service-label">Pisos e<br/>Revestimentos</span>
            </div>

            <div className="service-item item-metais">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/METEAIS.jpeg" alt="Metais" />
              </div>
              <span className="service-label">Metais</span>
            </div>

            <div className="service-item item-cortinas">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/CORTINAS.jpeg" alt="Cortinas e Persianas" />
              </div>
              <span className="service-label">Cortinas e<br/>Persianas</span>
            </div>

            <div className="service-item item-eletrica">
              <div className="service-circle">
                <img src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/Eletrica.jpeg" alt="Elétrica" />
              </div>
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
    const lenis = new Lenis()
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    const timer = setTimeout(() => setIsLoading(false), 2000)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      lenis.destroy()
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
        className={`fixed left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled 
            ? 'top-4 mx-auto w-[95%] max-w-7xl bg-white/80 backdrop-blur-2xl py-2 px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20' 
            : 'top-0 w-full bg-transparent py-3 sm:py-6 px-0 border-transparent shadow-none'
        }`}
      >
        <div className={`mx-auto h-full flex items-center justify-between transition-all duration-500 ${isScrolled ? 'w-full px-2' : 'container px-6'}`}>
          <div className="flex items-center">
            <div className={`relative transition-all duration-500 ${isScrolled ? 'w-28 sm:w-36 md:w-48 h-7 sm:h-9 md:h-10' : 'w-36 sm:w-48 md:w-64 lg:w-72 h-9 sm:h-12 md:h-18 lg:h-20 translate-y-[6px]'}`}>
              <Image 
                src={LOGO_URL} 
                alt="Suppis Logo" 
                fill 
                className={`object-contain transition-all duration-500 ${isScrolled ? '' : 'brightness-0 invert'}`}
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-10">
            {[
              { label: 'Início', href: '#home' },
              { label: 'Suppis Integra', href: '#suppis-integra' },
              { label: 'Serviços', href: '#servicos' },
              { label: 'Nossos Diferenciais', href: '#diferenciais' }
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`text-[13px] uppercase tracking-[0.25em] font-semibold transition-all hover:opacity-50 whitespace-nowrap ${
                  isScrolled ? 'text-zinc-600' : 'text-zinc-100'
                }`}
              >
                {item.label}
              </a>
            ))}
              <Button 
                onClick={() => window.open('https://wa.me/5547999247199?text=Olá!%20Vi%20o%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista.', '_blank')}
                size="sm" className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white rounded-full px-6 xl:px-8 h-10 text-[12px] uppercase tracking-[0.15em] font-bold transition-all duration-300 flex-shrink-0">
                Fale Conosco
              </Button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
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
            {([
              { label: 'Início', href: '#home' },
              { label: 'Suppis Integra', href: '#suppis-integra' },
              { label: 'Serviços', href: '#servicos' },
              { label: 'Nossos Diferenciais', href: '#diferenciais' },
              { label: 'Fale Conosco', href: 'https://wa.me/5547999247199?text=Olá!%20Vi%20o%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista.' }
            ]).map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-[#4A583E] tracking-tighter"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section - Immersive with Curve Bottom */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden [@media(max-width:1024px)_and_(orientation:landscape)]:h-auto [@media(max-width:1024px)_and_(orientation:landscape)]:min-h-screen [@media(max-width:1024px)_and_(orientation:landscape)]:py-24">
        <div className="absolute inset-0 z-0 bg-black">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Decorative Icons on Hero */}
        <DecorativeIcon 
          className="w-[500px] top-5 -left-20" 
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

        <div className="container mx-auto px-4 relative z-10 md:pl-28 [@media(max-width:1024px)_and_(orientation:landscape)]:pt-12">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.h1 
                custom={0}
                variants={fadeIn}
                className="text-4xl sm:text-6xl md:text-8xl font-medium text-white mb-4 sm:mb-8 tracking-tighter leading-[0.95] [@media(max-width:1024px)_and_(orientation:landscape)]:text-3xl [@media(max-width:1024px)_and_(orientation:landscape)]:sm:text-6xl"
              >
                Seu imóvel nas <br/> mãos certas<span className="text-[#d4c3b0]">.</span>
              </motion.h1>
              <motion.p 
                custom={1}
                variants={fadeIn}
                className="text-lg md:text-2xl text-zinc-200 mb-6 sm:mb-12 max-w-2xl font-light leading-relaxed [@media(max-width:1024px)_and_(orientation:landscape)]:text-base [@media(max-width:1024px)_and_(orientation:landscape)]:md:text-2xl [@media(max-width:1024px)_and_(orientation:landscape)]:mb-6"
              >
                Especialistas em projeto de interiores e marcenaria com execução integrada. 
                Sofisticação e gestão inteligente para seu lar.
              </motion.p>
              <motion.div 
                custom={2}
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 [@media(max-width:1024px)_and_(orientation:landscape)]:scale-90 [@media(max-width:1024px)_and_(orientation:landscape)]:origin-left"
              >
                <Button 
                  onClick={() => window.open('https://wa.me/5547999247199?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20meu%20imóvel.', '_blank')}
                  className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white px-8 sm:px-10 py-4 sm:py-8 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                  Falar com um especialista
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-white/20 text-[#4A583E] hover:bg-transparent hover:text-white hover:opacity-60 px-8 sm:px-10 py-4 sm:py-8 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold backdrop-blur-xl transition-all duration-300">
                  Conheça a Suppis
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Large stylized transition curve at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-[#faf9f6] rounded-t-[50px] sm:rounded-t-[100px] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] md:rounded-t-[200px] [@media(max-width:1024px)_and_(orientation:landscape)]:h-12" />
      </section>

      {/* Section 1: Intro - Refined & Delicate */}
      <section className="py-32 bg-[#faf9f6] relative z-20 -mt-px overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://suppis2.openleads.com.br/wp-content/uploads/2025/12/7-3-scaled.png"
                  alt="Minimalist Design"
                  fill
                  className="object-cover grayscale-[0.3]"
                />
              </motion.div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="space-y-12 relative"
            >
              <div className="space-y-6">
                <span className="text-[#4A583E] font-medium uppercase tracking-[0.3em] text-xs">Processo de Elite</span>
                <h2 className="text-5xl md:text-6xl font-medium text-[#4A583E] tracking-tighter leading-tight">
                  Cansado de obras intermináveis, <br /> fornecedores desalinhados e <br /> orçamentos fora da realidade?
                </h2>
                <p className="text-zinc-500 text-xl leading-relaxed font-light">
                  Sabemos que reformar pode ser um pesadelo: atrasos, retrabalho e frustrações. 
                  Você merece um parceiro que cuida de tudo, do primeiro traço ao último ajuste.
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
                    variants={fadeIn}
                    custom={i}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Section: Integra Visual Diagram */}
      <SuppisIntegraDiagram />

      {/* Section 2: Nosso Processo - Modern Card Grid */}
      <section id="servicos" className="py-32 bg-[#faf9f6] relative overflow-hidden">
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={i}
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
              <Button 
                onClick={() => window.open('https://wa.me/5547999247199?text=Olá!%20Quero%20começar%20meu%20projeto%20com%20a%20Suppis.%20Como%20funciona?', '_blank')}
                className="bg-[#4A583E] hover:bg-white hover:text-[#4A583E] text-white px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                Quero começar meu projeto
                <ArrowRight className="ml-3 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Sobre Nós */}
      <section id="sobre" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-[#4A583E] font-medium uppercase tracking-[0.3em] text-xs mb-8 block"
            >
              Sobre Nós
            </motion.span>
            
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-5xl md:text-7xl font-medium text-[#4A583E] tracking-tighter mb-16"
            >
              Somos a Suppis.
            </motion.h2>

            <div className="space-y-12 text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={1}
              >
                Nascemos para transformar a forma como as<br className="hidden md:block" /> pessoas vivenciam um projeto de interiores.
              </motion.p>

              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={2}
              >
                Acreditamos que um ambiente bem feito é<br className="hidden md:block" /> resultado de conexão, entre ideias, materiais,<br className="hidden md:block" /> profissionais e execução.
              </motion.p>

              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={3}
              >
                Por isso, integramos todas as etapas em um<br className="hidden md:block" /> só caminho, reduzindo ruídos e elevando a<br className="hidden md:block" /> experiência.
              </motion.p>

              <div className="pt-8">
                <motion.span 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={4}
                  className="text-[#4A583E] font-medium block mb-6"
                >
                  Nosso propósito é simples:
                </motion.span>
                <motion.p 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={5}
                  className="text-3xl md:text-4xl text-[#4A583E] font-medium tracking-tight"
                >
                  entregar espaços completos, coerentes e<br className="hidden md:block" /> prontos para receber histórias.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vantagens - Modern Card Grid */}
      <section id="diferenciais" className="py-32 bg-[#eef1da] relative overflow-hidden">
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
              A Suppis é a parceira do seu projeto de vida.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                title: "De ponta a ponta, interiores completos.", 
                desc: "Soluções integradas para transformar obras em lares prontos, com confiança e credibilidade.",
                icon: <Home className="w-6 h-6" />
              },
              { 
                title: "Credibilidade em cada detalhe.", 
                desc: "Integramos parceiros, processos e soluções com transparência e confiança.",
                icon: <Sparkles className="w-6 h-6" />
              },
              { 
                title: "Suppis Integra", 
                desc: "Conectamos arquitetos, engenheiros e fornecedores que compartilham o mesmo compromisso com a excelência.",
                icon: <Hammer className="w-6 h-6" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={i}
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
      <section className="relative pt-40 pb-72 bg-[#eef1da] z-30 overflow-hidden">
        {/* Decorative element for Testimonials */}
        <DecorativeIcon 
          className="w-[600px] -top-20 -left-40" 
          rotation={-30} 
          opacity={0.04} 
          color="#4a583e"
        />
        
        
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
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  custom={i}
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

      {/* Showroom Section */}
      <section className="py-24 bg-[#eef1da] relative z-40 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="bg-[#4A583E] rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden relative shadow-2xl">
            {/* Decorative background element */}
            <DecorativeIcon 
              className="w-[800px] -top-40 -right-40" 
              rotation={15} 
              opacity={0.05} 
              color="#ffffff"
            />
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="space-y-8"
              >
                <span className="text-white/60 font-medium uppercase tracking-[0.4em] text-[10px] block">Onde estamos</span>
                <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter leading-[0.95]">
                  Visite nosso <br/> Showroom
                </h2>
                <p className="text-white/70 text-lg font-light leading-relaxed max-w-lg">
                  Aqui você sente na prática o que significa ter marcenaria própria, acabamento impecável e um parceiro que cuida do seu projeto de ponta a ponta.
                </p>
                
                <div className="flex items-start gap-4 text-white/80">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight">Rua Doutor Marinho Lobo, 23</p>
                    <p className="text-sm uppercase tracking-[0.2em] opacity-60">Centro, Joinville - SC</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => window.open('https://wa.me/5547999247199?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20projeto.', '_blank')}
                      className="bg-[#25D366] text-white hover:bg-[#128C7E] px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Solicitar Orçamento
                      <MessageCircle className="ml-3 w-4 h-4" />
                    </Button>
                  <Button 
                    onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Marinho+Lobo,+23,+Centro,+Joinville+-+SC', '_blank')}
                    className="bg-white text-[#4A583E] hover:bg-[#eef1da] px-10 py-8 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Ver no Google Maps
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.9657!2d-48.8475!3d-26.3032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb0402b85e05d%3A0xc3f7a26245a4a58d!2sRua%20Doutor%20Marinho%20Lobo%2C%2023%20-%20Centro%2C%20Joinville%20-%20SC!5e0!3m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Custom Stylized Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px] fill-[#4A583E]">
            <path d="M0,120V80C300,20,900,20,1200,80V120H0z" />
          </svg>
        </div>
      </section>

      {/* Footer - XYZ Inspired Layout */}
      <footer className="bg-[#4A583E] text-white pt-16 pb-12 relative z-20 overflow-hidden">
        {/* Decorative element for Footer */}
        <DecorativeIcon 
          className="w-[800px] -bottom-40 -right-40" 
          rotation={15} 
          opacity={0.05} 
          color="#d2d6d1"
        />
        <div className="container mx-auto px-6 relative z-10">
          {/* Top Row: Logo & Socials */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row md:items-center gap-10 mb-20"
          >
            <div className="relative w-72 h-20">
              <Image src={LOGO_URL} alt="Suppis Logo" fill className="object-contain object-left brightness-0 invert" />
            </div>
            
            <div className="flex gap-4">
              <motion.a 
                custom={0}
                variants={fadeIn}
                href="https://www.instagram.com/suppis.interiores" 
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                custom={1}
                variants={fadeIn}
                href="https://wa.me/5547999247199?text=Olá!%20Vi%20o%20site%20da%20Suppis%20e%20gostaria%20de%20mais%20informações." 
                target="_blank"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Bottom Grid: Info Columns */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24"
          >
            {[
              {
                title: "Mapa do Site",
                content: (
                  <ul className="space-y-4 text-sm font-medium text-white/80">
                    <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#suppis-integra" className="hover:text-white transition-colors">Suppis Integra</a></li>
                    <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                    <li><a href="#diferenciais" className="hover:text-white transition-colors">Nossos diferenciais</a></li>
                  </ul>
                )
              },
              {
                title: "Funcionamento",
                content: (
                  <p className="text-sm font-medium text-white/80 leading-relaxed">
                    Segunda à Sexta<br/>
                    08h às 18h30
                  </p>
                )
              },
              {
                title: "Endereço",
                content: (
                  <p className="text-sm font-medium text-white/80 leading-relaxed">
                    Rua Doutor Marinho Lobo, 23<br/>
                    Centro, Joinville - SC<br/>
                    CEP: 89201-020
                  </p>
                )
              },
              {
                title: "Contato",
                content: (
                  <ul className="space-y-3 text-sm font-medium text-white/80">
                    <li>+55 47 99924-7199</li>
                    <li>contato@suppis.com.br</li>
                  </ul>
                )
              }
            ].map((col, i) => (
              <motion.div key={i} custom={i} variants={fadeIn}>
                <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-8">{col.title}</h4>
                {col.content}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/20"
          >
            <p>© 2025 Suppis Soluções. Um site padrão Open Leads</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </motion.div>
        </div>
      </footer>
      
      <WhatsAppButton />
      <QuotePopup />
    </div>
  )
}
