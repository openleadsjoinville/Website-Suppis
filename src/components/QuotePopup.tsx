"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Sparkles, Home } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const POPUP_IMAGE = "https://suppis2.openleads.com.br/wp-content/uploads/2025/12/7-3-scaled.png"

export function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = localStorage.getItem('hasSeenQuotePopup_v20_final')
        if (!hasSeenPopup) {
          setIsOpen(true)
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    // Show popup after 4 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenQuotePopup_v20_final')
      if (!hasSeenPopup) {
        setIsOpen(true)
      }
    }, 4000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenQuotePopup_v20_final', 'true')
  }

  return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[90vw] md:max-w-[800px] p-0 overflow-hidden border-none bg-transparent shadow-none" showCloseButton={false}>
          <DialogTitle className="sr-only">Solicitar Orçamento Suppis</DialogTitle>
          <DialogDescription className="sr-only">Formulário para solicitação de orçamento personalizado Suppis Integra.</DialogDescription>

          <div className="relative w-full bg-[#faf9f6] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Close button - custom to fit the design better */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md text-[#4A583E] hover:bg-[#4A583E] hover:text-white transition-all duration-300"
          >
            <X size={20} />
          </button>

          {/* Left Side: Image/Visual */}
          <div className="relative w-full md:w-5/12 h-48 md:h-auto overflow-hidden">
            <Image 
              src={POPUP_IMAGE} 
              alt="Design de Interiores Suppis" 
              fill 
              className="object-cover grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A583E]/60 to-transparent md:bg-gradient-to-r" />
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#d4c3b0]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Exclusividade</span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium tracking-tighter leading-none">Padrão Suppis de Qualidade</h3>
            </div>
          </div>

          {/* Right Side: Content & CTA */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-[10px] mb-4 block">Oportunidade</span>
                    <h2 className="text-3xl md:text-4xl font-medium text-[#4A583E] tracking-tighter leading-[1.1] mb-6">
                      Antes de sair... leve a excelência da Suppis para o seu espaço.
                    </h2>
                <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed">
                  Garanta um orçamento personalizado e descubra como o método Suppis Integra pode elevar o nível do seu projeto.
                </p>
            </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: <Home size={18} />, text: "Interiores completos de ponta a ponta" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-600 text-sm">
                    <div className="text-[#4A583E]">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => {
                  window.open('https://wa.me/5547999247199?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20projeto.', '_blank')
                  handleClose()
                }}
                className="bg-[#4A583E] hover:bg-[#3D4932] text-white px-8 py-7 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] flex-1"
              >
                Solicitar Orçamento Agora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-center md:text-left mt-6 text-[10px] text-zinc-400 uppercase tracking-widest">
              Atendimento exclusivo para Joinville e região.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
