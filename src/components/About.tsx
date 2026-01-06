'use client';

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000"
              alt="Designer working"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-[#4A583E] p-8 rounded-2xl hidden md:block max-w-[240px]">
              <p className="text-white text-3xl font-bold mb-1">12+</p>
              <p className="text-white/80 text-sm font-light uppercase tracking-wider">
                Anos de excelência em projetos de luxo
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-xs mb-4 block">
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-[#4A583E] tracking-tighter leading-tight">
                Design que transcende o <br />
                <span className="italic font-serif">convencional.</span>
              </h2>
            </div>
            
            <p className="text-zinc-600 text-lg font-light leading-relaxed">
              Na Suppis, acreditamos que um ambiente bem projetado tem o poder de transformar a qualidade de vida. 
              Nossa abordagem une a estética refinada da arquitetura contemporânea com a precisão técnica da marcenaria de alto padrão.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h4 className="text-[#4A583E] font-semibold text-lg">Visão Holística</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Cuidamos de cada detalhe, do conceito inicial à instalação final, garantindo harmonia absoluta.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[#4A583E] font-semibold text-lg">Execução Integrada</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Nosso método elimina atritos entre projeto e obra, entregando exatamente o que foi planejado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
