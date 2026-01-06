"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_LOGO = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/9cefdaef-e4d8-4d89-ab4f-77b2e9f76adf/whatsapp1-2-resized-1767739642981.webp?width=8000&height=8000&resize=contain"

const CTAS = [
  "Olá! Como podemos ajudar hoje?",
  "Fale com um especialista agora!",
  "Solicite seu orçamento personalizado",
  "Estamos online! Tire suas dúvidas",
  "Transforme seu espaço com a Suppis"
]

export function WhatsAppButton() {
  const [isOnline, setIsOnline] = useState(false)
  const [ctaIndex, setCtaIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date()
      const day = now.getDay() // 0 is Sunday, 1 is Monday... 6 is Saturday
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const currentTimeInMinutes = hours * 60 + minutes

      const isWeekday = day >= 1 && day <= 5
      const isWithinHours = currentTimeInMinutes >= 8 * 60 && currentTimeInMinutes <= (18 * 60 + 30)

      setIsOnline(isWeekday && isWithinHours)
    }

    checkOnlineStatus()
    const statusInterval = setInterval(checkOnlineStatus, 60000) // Check every minute

    const ctaInterval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % CTAS.length)
    }, 10000)

    return () => {
      clearInterval(statusInterval)
      clearInterval(ctaInterval)
    }
  }, [])

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="bg-white px-6 py-4 rounded-3xl shadow-2xl border border-black/5 max-w-[240px] pointer-events-auto relative"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-black/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 shadow-sm"
            >
              ×
            </button>
            <div className="flex flex-col gap-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={ctaIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#4A583E] text-sm font-medium leading-tight"
                >
                  {CTAS[ctaIndex]}
                </motion.p>
              </AnimatePresence>
              {isOnline && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold">Estamos online</span>
                </div>
              )}
            </div>
            {/* Arrow for the speech bubble */}
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r border-b border-black/5 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/5547999247199"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          boxShadow: [
            "0 0 0 0px rgba(74, 88, 62, 0)",
            "0 0 0 15px rgba(74, 88, 62, 0.2)",
            "0 0 0 30px rgba(74, 88, 62, 0)"
          ]
        }}
        transition={{ 
          scale: { duration: 0.5 },
          boxShadow: { 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-3xl pointer-events-auto relative overflow-hidden bg-[#25D366]"
      >
        <Image 
          src={WHATSAPP_LOGO} 
          alt="WhatsApp" 
          fill 
          className="object-contain p-0"
        />
      </motion.a>
    </div>
  )
}
