'use client';

export function Projects() {
  const projects = [
    {
      title: "Residência Contemporânea",
      category: "Interiores",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Cozinha Minimalista",
      category: "Marcenaria",
      image: "https://images.unsplash.com/photo-1556911220-e15024046484?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Suíte Master",
      category: "Design",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Office Boutique",
      category: "Corporativo",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Living Integrado",
      category: "Interiores",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Espaço Gourmet",
      category: "Marcenaria",
      image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section id="projetos" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#4A583E] font-medium uppercase tracking-[0.4em] text-xs mb-4 block">
              Portfólio Selecionado
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-[#4A583E] tracking-tighter leading-tight">
              Onde a técnica <br />
              encontra a <span className="italic font-serif">arte.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-sm md:text-base font-light">
            Uma seleção de projetos que exemplificam nossa busca incansável pela perfeição e pelo design atemporal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <p className="text-[#4A583E]/60 text-[10px] uppercase tracking-widest font-bold mb-1">
                {project.category}
              </p>
              <h3 className="text-xl font-medium text-[#4A583E] tracking-tight">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
