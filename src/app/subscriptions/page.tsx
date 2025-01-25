"use client";
import { getPlanAvailable } from "@/api/plan";
import { buyProduct } from "@/api/store";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import PremiumBenefitsCarrousel from "@/components/premium-carrousel";
import MultiCarouselSubs from "@/components/subscriptions/carrousel";
import FaqsSubscriptions from "@/components/subscriptions/faqs";
import { useUserContext } from "@/context/UserContext";
import { BuyRedirectDto, PlanModel } from "@/model/model";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCashRegister, FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Subscriptions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [planModel, setPlan] = useState<PlanModel>();
  const { user } = useUserContext();
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Contenido a la izquierda */}
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10">
                  Pase Épico de Azeroth
                </h2>
                <p className="text-lg sm:text-xl lg:text-3xl mb-6 break-words">
                  Suscríbete y disfruta los mejores beneficios a un precio
                  increíble.
                </p>
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-lg sm:text-xl lg:text-3xl line-through">
                      ${Math.floor(planModel?.price ?? 0)} /mes
                    </p>
                    <span className="bg-green-500 text-white text-sm sm:text-lg font-semibold px-3 py-1 rounded-full">
                      {planModel?.discount}% OFF
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl lg:text-4xl pt-2 font-semibold">
                    ${Math.floor(planModel?.discounted_price ?? 0)} /mes
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-10">
                {!loading && user.logged_in ? (
                  <button
                    onClick={() =>
                      (window.location.href =
                        "https://checkout.bold.co/payment/LNK_M4YW8QT2BZ")
                    }
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
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
                  WowLibre. <br />
                  Puedes cancelar cuando quieras.
                </p>
              </div>
            </div>

            {/* Contenido a la derecha (imágenes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-16">
              <div className="relative h-[350px] sm:h-[450px] w-full sm:w-[300px] select-none mx-auto overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_9d9020e8c72f431988e33d61613a6b99~mv2.webp"
                  alt="Premium-Sub"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-[350px] sm:h-[450px] w-full sm:w-[300px] select-none mx-auto overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_438ad2c9ddcf42019912c84800383194~mv2.jpg"
                  alt="premium"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contenedor-reduce">
        <div className="py-12 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-start text-white mb-8">
              Beneficios
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Grow 1 */}
              <div
                className="p-8 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px]"
                style={{
                  background: "linear-gradient(to right, #1e1e2f, #3a3a3f)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Servicios Gratuitos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="text-gray-300 rounded-lg text-xl">
                    Cambia de facción o renombra a tus personajes, ¡todo
                    completamente gratis!
                  </div>
                </div>
              </div>

              {/* Grow 2 */}
              <div
                className="p-8 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px]"
                style={{
                  background: "linear-gradient(to right, #1e1e2f, #3a3a3f)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  ¡Items y Monturas Gratis al Suscribirte!
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="text-gray-300 rounded-lg text-xl">
                    Obtén exclusivos items y monturas gratis como recompensa por
                    tu apoyo a la comunidad. ¡Suscríbete y empieza a disfrutar
                    de estos increíbles beneficios ahora mismo!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PremiumBenefitsCarrousel />

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
              src="https://www.youtube.com/embed/tyNgbHX9p2U?si=lKHYhhVpbUunp-LP"
              title="World of Warcraft: Battle for Azeroth Cinematic Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          <MultiCarouselSubs />
        </div>
      </div>

      <div className="contenedor-minimun">
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
            <button
              onClick={() =>
                (window.location.href =
                  "https://checkout.bold.co/payment/LNK_M4YW8QT2BZ")
              }
              className="bg-blue-500 text-white font-bold py-4 px-10 rounded-lg w-full"
            >
              Realizar Pago
            </button>
            <p className="text-lg pt-4 break-words text-white text-center w-full">
              Al suscribirte, aceptas los Términos y condiciones de WowLibre.
              Puedes cancelar cuando quieras.
            </p>
          </div>
        </div>
      </div>

      <FaqsSubscriptions />
    </div>
  );
};

export default Subscriptions;
