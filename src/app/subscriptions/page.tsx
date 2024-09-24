"use client";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Link from "next/link";
import React, { useState } from "react";
import { FaCreditCard, FaMoneyCheckAlt, FaCashRegister } from "react-icons/fa"; // Asegúrate de tener react-icons instalado
import Carousel from "react-multi-carousel";
import Slider from "react-slick";

const Subscriptions = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const items = [
    {
      id: 1,
      image: "https://i.ibb.co/QnVTf01/1082103-raptor-fosilizado.jpg",
      title: "Dinosaurio Durotar",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 2,
      image: "https://i.ibb.co/HrdwNS5/Okan01.jpg",
      title: "Komodo",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 3,
      image: "https://i.ibb.co/GkZyPNH/1125458-montura-espectral-de-eve.jpg",
      title: "Escoba",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 4,
      image: "https://i.ibb.co/sVNbt0v/images.jpg",
      title: "Perro Inframundo",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 5,
      image: "https://i.ibb.co/MSH1gsz/7-UDK5-QF3-RP1-O1690524396550.jpg",
      title: "Ropa Gm",
      description: "Item",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
  ];

  // Definición de las preguntas y respuestas
  const faqs = [
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.",
    },
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer:
        "Puedes realizar un pedido a través de nuestra página web o llamándonos directamente.",
    },
    {
      question: "¿Cuál es la política de devolución?",
      answer:
        "Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.",
    },
    {
      question: "¿Ofrecen soporte técnico?",
      answer:
        "Sí, ofrecemos soporte técnico a nuestros clientes durante el horario de atención.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

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
                      $ 39.990/mes
                    </p>
                    <span className="bg-green-500 text-white text-lg font-semibold px-3 py-1 rounded-full">
                      50% OFF
                    </span>
                  </div>
                  <p className="text-lg lg:text-4xl pt-2 font-semibold">
                    $ 29.990/mes
                  </p>
                </div>
              </div>
              <div className="mt-10">
                {true ? (
                  <Link
                    href="#plans"
                    className="px-6 py-5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    Quiero suscribirme
                  </Link>
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
                  Servicios gratis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="p-4 text-gray-300 rounded-lg">
                    Cambia de faccion, renombra tus persoanjes totalmente gratis
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
                  40% OFF en las donaciones
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <div className="p-4 text-gray-300 rounded-lg">
                    En millones de productos de menos de $ 60.000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-start mb-4">
            <span className="bg-green-500 text-white text-xl font-semibold px-3 py-1 rounded-full mr-4">
              100% OFF
            </span>
            <div className="flex flex-col">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mr-4 mb-1">
                Título del Promocional
              </h2>
              <h3 className="text-xl text-gray-300">
                Subtítulo atractivo que acompaña el título
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
                  $100.000
                </span>
                <span className="bg-green-500 text-white text-2xl font-semibold px-3 py-1 rounded-full">
                  20% OFF
                </span>
              </div>
              <span className="text-4xl font-bold text-white">$80.000</span>
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
