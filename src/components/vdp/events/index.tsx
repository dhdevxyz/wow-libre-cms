import { EventsVdp } from "@/model/model";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importar los estilos

interface ServerEventsProps {
  events: EventsVdp[];
  t: (key: string, options?: any) => string;
}
const ServerEvents: React.FC<ServerEventsProps> = ({ events, t }) => {
  return (
    <section className="contenedor py-12 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        📅 {t("vdp-server.events.title")}
      </h1>
      <p className="text-lg text-white/80 text-center max-w-2xl mx-auto leading-relaxed">
        {t("vdp-server.events.description")}
      </p>

      <div className="mt-8 max-w-4xl mx-auto">
        <Carousel
          showThumbs={false} // Oculta miniaturas
          autoPlay={true} // Activa autoplay
          infiniteLoop={true} // Hace que el carrusel sea infinito
          interval={3000} // Velocidad del autoplay en ms
          transitionTime={500} // Duración de la transición en ms
          showArrows={true} // Muestra flechas de navegación
          showIndicators={true} // Muestra indicadores abajo
          showStatus={false} // Oculta el contador de diapositivas
          swipeable={true} // Permite deslizar en móviles
          emulateTouch={true} // Simula el tacto en desktop
        >
          {events.map((evento) => (
            <div key={evento.id} className="p-4">
              <a
                href="#"
                className="group relative block bg-black rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  alt="event-server"
                  src={evento.img}
                  className="h-[400px] w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
                />
                <div className="relative p-6">
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide text-green-400`}
                  >
                    {evento.title}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {evento.description}
                  </p>
                  <div className="mt-32 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-white/90">{evento.disclaimer}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Carousel>
      </div>
      <span className="flex items-center pt-10">
        <span className="h-px flex-1 bg-blue-400"></span>
        <span className="h-px flex-1 bg-blue-400"></span>
      </span>
    </section>
  );
};

export default ServerEvents;
