'use client';

import { useEffect } from 'react';

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
    <section id="suppis-integra" className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-6 flex flex-col">
        <div className="text-center mb-12 md:mb-20 flex-shrink-0">
          <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-[10px] mb-3 block">Ecossistema</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium text-[#4A583E] tracking-tighter leading-tight mb-6">
            Suppis Integra
          </h2>
          <p className="text-zinc-500 text-sm md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Nosso método exclusivo que conecta arquitetos, engenheiros e fornecedores <br className="hidden md:block" /> em uma gestão unificada para garantir a excelência absoluta do seu projeto.
          </p>
        </div>

        <div className="flex flex-center justify-center relative">
          <style dangerouslySetInnerHTML={{ __html: `
              .suppis-container {
                  position: relative;
                  width: 100%;
                  max-width: 1000px;
                  aspect-ratio: 1 / 1;
                  margin: 0 auto;
                  font-style: normal;
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
                  width: 22%;
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
                  font-size: clamp(24px, 3.5vw, 42px);
                  font-weight: 700;
                  font-style: normal;
                  color: #fff;
                  line-height: 1.05;
              }

              .suppis-container .center-subtitle {
                  font-size: clamp(10px, 1.3vw, 16px);
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
                  width: clamp(120px, 18vw, 220px);
                  z-index: 5;
                  gap: 12px;
              }

              .suppis-container .service-circle {
                  width: clamp(70px, 10vw, 110px);
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
                  font-size: clamp(13px, 1.6vw, 18px);
                  font-weight: 400;
                  font-style: normal;
                  color: #3A4A3A;
                  line-height: 1.3;
                  transition: all 0.3s ease;
                  text-align: center;
                  width: 100%;
                  pointer-events: none;
              }

              .suppis-container .service-item:hover .service-label {
                  color: #2E3E2E;
                  font-weight: 500;
              }

              /* Posicionamento Circular Proporcional - Aumentado o raio */
              .suppis-container .item-marcenaria { top: 8%; left: 50%; flex-direction: column-reverse; }
              .suppis-container .item-iluminacao { top: 20%; left: 82%; flex-direction: row; }
              .suppis-container .item-gesso { top: 50%; left: 92%; flex-direction: row; }
              .suppis-container .item-marmoraria { top: 80%; left: 82%; flex-direction: row; }
              .suppis-container .item-pisos { top: 92%; left: 50%; flex-direction: column; }
              .suppis-container .item-metais { top: 80%; left: 18%; flex-direction: row-reverse; }
              .suppis-container .item-cortinas { top: 50%; left: 8%; flex-direction: row-reverse; }
              .suppis-container .item-eletrica { top: 20%; left: 18%; flex-direction: row-reverse; }

              @media (min-width: 1024px) {
                  .suppis-container .item-gesso, 
                  .suppis-container .item-cortinas,
                  .suppis-container .item-eletrica,
                  .suppis-container .item-marcenaria,
                  .suppis-container .item-metais,
                  .suppis-container .item-iluminacao,
                  .suppis-container .item-marmoraria,
                  .suppis-container .item-pisos {
                      width: auto;
                      gap: 20px;
                  }
                  
                  .suppis-container .item-gesso .service-label { text-align: left; }
                  .suppis-container .item-iluminacao .service-label { text-align: left; }
                  .suppis-container .item-marmoraria .service-label { text-align: left; }
                  
                  .suppis-container .item-cortinas .service-label { text-align: right; }
                  .suppis-container .item-eletrica .service-label { text-align: right; }
                  .suppis-container .item-metais .service-label { text-align: right; }
              }

              @media (max-width: 900px) {
                  .suppis-container {
                      width: 100%;
                      max-width: 650px;
                      margin: 40px auto;
                  }
                  .suppis-container .center-circle { width: 30%; }
              }

              @media (max-width: 600px) {
                  .suppis-container {
                      width: 100%;
                      max-width: 480px;
                  }
                  .suppis-container .center-circle { width: 38%; }
                  .suppis-container .center-title { font-size: 22px; }
                  .suppis-container .center-subtitle { font-size: 10px; margin-top: 3px; }
                  
                  .suppis-container .service-circle { width: 62px; }
                  .suppis-container .service-label {
                      font-size: 11px;
                      line-height: 1.1;
                  }
                  .suppis-container .service-item { width: auto; gap: 8px; }
                  
                  /* Ajuste fino mobile */
                  .suppis-container .item-gesso { left: 94%; }
                  .suppis-container .item-cortinas { left: 6%; }
              }

          ` }} />

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

export default SuppisIntegraDiagram;
