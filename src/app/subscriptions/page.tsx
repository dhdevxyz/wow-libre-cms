"use client";
import { getPlanAvailable } from "@/api/plan";
import { buyProduct } from "@/api/store";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import MultiCarouselSubs from "@/components/subscriptions/carrousel";
import { useUserContext } from "@/context/UserContext";
import { BuyRedirectDto, PlanModel } from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCashRegister, FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa"; // Asegúrate de tener react-icons instalado
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Subscriptions = () => {
  const faqs = [
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario de atención es de lunes a sabados de 9:00 AM a 6:00 PM.",
    },
    {
      question: "¿Que beneficios obtengo con una subscripcion?",
      answer:
        "Al realizar una subscripcion  obtendras servicios de juego totalmente  gratis a todas las cuentas vinculadas en wow libre y adicionalmente tendras un beneficio del 50% de descuento en todas los elementos de la tienda y semanal mente recibiras eventos especiales y regalos adicionales por tu contribuicion.",
    },
    {
      question: "¿Cuál es la política de devolución?",
      answer:
        "Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.",
    },
    {
      question: "¿Ofrecen soporte técnico?",
      answer:
        "Sí, ofrecemos soporte técnico priorizado a nuestros clientes durante el horario de atención.",
    },
  ];
  const [loading, setLoading] = useState<boolean>(true);
  const [planModel, setPlan] = useState<PlanModel>();
  const [activeIndex, setActiveIndex] = useState(null);
  const { user } = useUserContext();
  const [product, setProduct] = useState<BuyRedirectDto>();
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const plan = await getPlanAvailable();
        setPlan(plan);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [user]);

  const handleBuy = async () => {
    try {
      if (!token) {
        return;
      }

      const response: BuyRedirectDto = await buyProduct(
        null,
        null,
        null,
        token,
        true
      );
      router.push(response.redirect);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
    }
  };

  const toggleAnswer = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>

      <div
        className="text-white mb-20 mt-14"
        style={{
          background: "linear-gradient(to right, #0b486b, #f56217)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-10">
                  Pase Épico de Azeroth
                </h2>
                <p className="text-lg lg:text-3xl mb-6 break-words">
                  Suscríbete y disfruta los mejores beneficios a un precio
                  increíble.
                </p>
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-lg lg:text-3xl line-through">
                      ${planModel?.price} /mes
                    </p>
                    <span className="bg-green-500 text-white text-lg font-semibold px-3 py-1 rounded-full">
                      {planModel?.discount}% OFF
                    </span>
                  </div>
                  <p className="text-lg lg:text-4xl pt-2 font-semibold">
                    $ {planModel?.discounted_price} /mes
                  </p>
                </div>
              </div>
              <div className="mt-10">
                {!loading && user.logged_in ? (
                  <button
                    onClick={handleBuy}
                    className="px-6 py-5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    Quiero suscribirme
                  </button>
                ) : (
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    Registrarme
                  </Link>
                )}

                <p className="text-lg pt-4 break-words">
                  Al suscribirte, aceptas los Términos y condiciones de
                  WowLibre. <br /> Puedes cancelar cuando quieras.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              <div className="relative h-[450px] w-[280px] select-none">
                <img
                  src="https://e0.pxfuel.com/wallpapers/121/817/desktop-wallpaper-deathwing-htc-one-warcraft-art-fantasy-dragon-dragon-thumbnail.jpg"
                  alt="Globin-loan"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-[450px] w-[280px] select-none">
                <img
                  src="https://mfiles.alphacoders.com/908/908747.jpg"
                  alt="Globin-loan-bank"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contenedor2">
        <div className="py-12 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-start text-white mb-8">
              Beneficios
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Grow 1 */}
              <div
                className="p-8 rounded-lg"
                style={{
                  background: "linear-gradient(to right, #1e1e2f, #3a3a3f)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Servicios Gratuitos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="p-4 text-gray-300 rounded-lg">
                    Cambia de facción o renombra a tus personajes, ¡todo
                    completamente gratis!
                  </div>
                </div>
              </div>

              {/* Grow 2 */}
              <div
                className="p-8 rounded-lg"
                style={{
                  background: "linear-gradient(to right, #1e1e2f, #3a3a3f)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  50% de Descuento en la tienda
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="p-4 text-gray-300 rounded-lg">
                    ¡Disfruta comprando con estos increíbles descuentos y lleva
                    más por menos!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-start mb-4">
            <span className="bg-green-500 text-white text-xl font-semibold px-3 py-1 rounded-full mr-4">
              {planModel?.discount} OFF
            </span>
            <div className="flex flex-col">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mr-4 mb-1">
                ¡Plan Promocional Irresistible!
              </h2>
              <h3 className="text-xl text-gray-300">
                ¡No dejes pasar esta oportunidad y disfruta todos los beneficios
                de una suscripción premium!
              </h3>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <iframe
              width="800"
              height="350"
              src="https://www.youtube.com/embed/jSJr3dXZfcg"
              title="World of Warcraft: Battle for Azeroth Cinematic Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <MultiCarouselSubs />
        </div>
      </div>

      <div className="contenedor3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Sección de Precio */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Precio Especial
            </h2>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <span className="line-through text-gray-400 text-3xl mr-2">
                  ${planModel?.price} /mes
                </span>
                <span className="bg-green-500 text-white text-2xl font-semibold px-3 py-1 rounded-full">
                  {planModel?.discount}% OFF
                </span>
              </div>
              <span className="text-4xl font-bold text-white">
                ${Math.round(planModel?.discounted_price || 15)} /mes
              </span>
            </div>
          </div>

          {/* Separador antes de la sección de Medios de Pago */}
          <div className="border-t border-gray-500 my-4"></div>

          {/* Título de Medios de Pago */}
          <h3 className="text-4xl lg:text-5xl font-bold text-white text-center mb-8">
            Medios de Pago
          </h3>

          {/* Sección de Medios de Pago en columna */}
          <div className="flex flex-col space-y-2 pt-5">
            {/* Componente de Medio de Pago 1 */}
            <div className="border rounded-lg p-3 flex items-center">
              <FaCreditCard className="text-white text-2xl mr-2" />
              <h4 className="text-2xl font-bold text-white mb-0">
                Tarjeta de Crédito
              </h4>
            </div>

            {/* Componente de Medio de Pago 2 */}
            <div className="border rounded-lg p-3 flex items-center">
              <FaMoneyCheckAlt className="text-white text-2xl mr-2" />
              <h4 className="text-2xl font-bold text-white mb-0">
                Transferencia Bancaria
              </h4>
            </div>

            {/* Componente de Medio de Pago 3 */}
            <div className="border rounded-lg p-3 flex items-center">
              <FaCashRegister className="text-white text-2xl mr-2" />
              <h4 className="text-2xl font-bold text-white mb-0">Efectivo</h4>
            </div>
          </div>

          {/* Botón al final */}
          <div className="flex flex-col justify-center mt-8 items-center w-full max-w-md mx-auto">
            <button className="bg-blue-500 text-white font-bold py-4 px-10 rounded-lg w-full">
              Realizar Pago
            </button>
            <p className="text-lg pt-4 break-words text-white text-center w-full">
              Al suscribirte, aceptas los Términos y condiciones de WowLibre.
              Puedes cancelar cuando quieras.
            </p>
          </div>
        </div>
      </div>

      <div className="contenedor">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <h2 className="text-3xl font-bold text-start text-white mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="flex justify-between items-center w-full text-left text-xl font-bold text-white"
                >
                  <span className="text-xl">{faq.question}</span>
                  <span className=" text-white">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="mt-2 text-gray-300 text-lg">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
