import React from "react";

const announcements = [
  {
    id: 1,
    title: "¿Cómo mejorar el rendimiento en Livewire y Alpine JS?",
    description:
      "Explora las mejores prácticas para optimizar la renderización en tus proyectos.",
    author: "John Doe",
    comments: 14,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: true,
  },
  {
    id: 2,
    title: "Errores comunes en React y cómo evitarlos",
    description:
      "Descubre los errores más frecuentes en React y cómo solucionarlos eficientemente.",
    author: "Jane Smith",
    comments: 8,
    img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
  {
    id: 3,
    title: "Optimización de servidores para aplicaciones Node.js",
    description:
      "Guía completa sobre rendimiento y escalabilidad en servidores Node.js.",
    author: "Carlos Mendoza",
    comments: 22,
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: true,
  },
  {
    id: 4,
    title: "Las mejores herramientas para desarrolladores en 2024",
    description:
      "Exploramos las herramientas más útiles para mejorar la productividad en el desarrollo web.",
    author: "Laura García",
    comments: 5,
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
  {
    id: 4,
    title: "Las mejores herramientas para desarrolladores en 2024",
    description:
      "Exploramos las herramientas más útiles para mejorar la productividad en el desarrollo web.",
    author: "Laura García",
    comments: 5,
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
  {
    id: 4,
    title: "Las mejores herramientas para desarrolladores en 2024",
    description:
      "Exploramos las herramientas más útiles para mejorar la productividad en el desarrollo web.",
    author: "Laura García",
    comments: 5,
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
  {
    id: 4,
    title: "Las mejores herramientas para desarrolladores en 2024",
    description:
      "Exploramos las herramientas más útiles para mejorar la productividad en el desarrollo web.",
    author: "Laura García",
    comments: 5,
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
  {
    id: 4,
    title: "Las mejores herramientas para desarrolladores en 2024",
    description:
      "Exploramos las herramientas más útiles para mejorar la productividad en el desarrollo web.",
    author: "Laura García",
    comments: 5,
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    solved: false,
  },
];

const ServerBlog = () => {
  return (
    <div className="contenedor max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
      <h2 className="text-4xl font-bold text-white text-center mb-6">
        📅 Noticias
      </h2>
      <p className="text-lg text-white/80 text-center max-w-2xl mx-auto leading-relaxed">
        Descubre los eventos más emocionantes en el mundo del diseño, desarrollo
        y fotografía. ¡Conoce a los mejores en la industria!
      </p>

      <h3 className="text-2xl font-bold text-white mb-4">
        📢 Últimos Anuncios
      </h3>

      {/* Contenedor con Scroll invisible si hay más de 3 elementos */}
      <div className="max-h-[300px] overflow-hidden hover:overflow-auto space-y-4 overflow-y-auto scrollbar-hide">
        {announcements.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-gray-700 bg-gray-800 p-4"
          >
            <div className="flex items-start gap-4">
              <img
                alt={post.title}
                src={post.img}
                className="size-14 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-medium text-lg">
                  <a href="#" className="hover:underline text-blue-400">
                    {post.title}
                  </a>
                </h3>

                <p className="line-clamp-2 text-sm text-gray-300">
                  {post.description}
                </p>

                <div className="mt-2 flex items-center gap-2 text-gray-400 text-xs">
                  <span>💬 {post.comments} comentarios</span>
                  <span>•</span>
                  <span>
                    Publicado por{" "}
                    <a
                      href="#"
                      className="font-medium underline hover:text-gray-200"
                    >
                      {post.author}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Indicador de estado (Resuelto o No Resuelto) */}
            {post.solved && (
              <div className="flex justify-end mt-2">
                <span className="inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-600 px-3 py-1.5 text-white text-xs font-medium">
                  ✅ Resuelto
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default ServerBlog;
