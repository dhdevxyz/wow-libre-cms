"use client";

import NavbarAuthenticated from "@/components/navbar-authenticated";
import Plans from "@/components/plan";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import BankCharacter from "@/components/bank_character";

const Bank = () => {
  const token = Cookies.get("token");
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loggin, setLoggin] = useState(false);

  useEffect(() => {
    setLoggin(token != null && user.logged_in);
  }, [token]);

  const pricingPlans = [
    {
      name: "Inicial",
      description:
        "Inicia tu aventura en Azeroth con un préstamo básico de oro para ayudarte a comenzar.",
      price: "1,050g",
      frecuency: "/Pago único",
      features: [
        "Interés del 5% ",
        "Préstamo de un 1k de oro",
        "Pago máximo: 1 mes",
      ],
      buttonText: "Solicitar Préstamo",
      buttonLink: "#",
    },

    {
      name: "Pro",
      description:
        "Domina Azeroth con ventajas exclusivas y sin preocupaciones.",
      price: "48,000g",
      frecuency: "/Pago único",
      features: [
        "Interés del 20% ",
        "Préstamo de 40k de oro",
        "Pago máximo: 2 mes",
        "Exclusión del cobro diario en eventos",
      ],
      buttonText: "Solicitar Préstamo",
      buttonLink: "#",
    },
    {
      name: "Starter",
      description:
        "Potencia tu aventura con recursos esenciales para tu crecimiento.",
      price: "11,000g",
      frecuency: "/Pago único",
      features: [
        "Interés del 10% ",
        "Préstamo de un 10k de oro",
        "Pago máximo: 1 mes",
      ],
      buttonText: "Solicitar Préstamo",
      buttonLink: "#",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>
      <div
        className="text-white mb-20 mt-14"
        style={{
          background: "linear-gradient(to right, #2D2D2A, #6C2C77, #D3A82C)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-10">
                  ¡Domina Azeroth con un Préstamo de Oro Exclusivo!
                </h2>
                <p className="text-lg lg:text-2xl mb-4 break-words">
                  Eleva tu aventura en Azeroth a un nivel épico con nuestro
                  Préstamo de Oro. Consigue la financiación necesaria para
                  potenciar tu equipo, expandir tu colección de tesoros, o
                  simplemente disfrutar al máximo de las mejores experiencias
                  del juego.
                </p>
                <ul className="list-disc list-inside text-lg lg:text-xl mb-4 pt-2 pl-6 space-y-2">
                  <li className="text-lg lg:text-xl font-semibold">
                    Solicita tu préstamo con pago único hoy mismo
                  </li>
                  <li className="text-lg lg:text-xl font-semibold">
                    Razones para no pedir préstamos:
                  </li>
                  <li className="text-lg lg:text-xl">
                    <strong>Intereses Altos:</strong> Los intereses pueden
                    aumentar el costo total del préstamo.
                  </li>
                  <li className="text-lg lg:text-xl">
                    <strong>Endeudamiento:</strong> Puede ser difícil pagar el
                    monto total y acumular más deudas.
                  </li>
                  <li className="text-lg lg:text-xl">
                    <strong>Presión y Estrés:</strong> La responsabilidad de
                    pagar puede afectar tu disfrute del juego.
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                {loggin ? (
                  <>
                    <Link
                      href="#plans"
                      onClick={openModal}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                    >
                      Solicitar prestamo
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    Registrarme
                  </Link>
                )}

                <p className="text-lg pt-4 break-words">
                  Los préstamos tienen intereses. Consulta la sección de
                  "Clientes en Mora" si no puedes pagar.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              <div className="relative h-80 lg:h-auto select-none">
                <img
                  src="/img/bank/globlin-gold-bank.webp"
                  alt="Globin-loan"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-80 lg:h-auto select-none">
                <img
                  src="/img/bank/globlin-gold-bank-loan.webp"
                  alt="Globin-loan-bank"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between mt-20 mb-20 ">
        <div className="text-center ">
          <p className="mt-4 text-lg leading-9 text-gray-300 font-regular">
            Guía de Cobro en Azeroth
          </p>
          <h3 className="text-3xl sm:text-5xl leading-normal font-extrabold tracking-tight text-gray-100">
            ¿Cómo <span className="text-indigo-600">Funciona?</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul className="md:grid md:grid-cols-3 md:col-gap-10 md:row-gap-10">
            <li className="bg-gray-200 p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-500 text-white border-4 border-white text-xl font-semibold">
                    1
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-1xl leading-6 font-semibold text-gray-900">
                    Notificaciones de Pago
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-800">
                    Recibirás notificaciones en el juego para recordarte cuando
                    tu préstamo esté próximo a vencer.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-200 p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-yellow-500 text-white border-4 border-white text-xl font-semibold">
                    2
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-1xl leading-6 font-semibold text-gray-900">
                    Período de Gracia
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-800">
                    Si no pagas a tiempo, tendrás un período de gracia de 15
                    días para ponerte al día antes de que se apliquen sanciones.
                  </p>
                </div>
              </div>
            </li>
            <li className="bg-gray-200 p-5 pb-10 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 relative top-0 -mt-16">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-600 text-white border-4 border-white text-xl font-semibold">
                    3
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-1xl leading-6 font-semibold text-gray-900">
                    Consecuencias de Incumplimiento
                  </h4>
                  <p className="mt-2 text-base leading-6 text-gray-800">
                    Si no realizas el pago, el sistema deducirá automáticamente
                    el oro adeudado de tus cuentas. En caso de no contar con
                    suficiente oro, se descontarán objetos del juego de valor
                    equivalente.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <section className=" pt-10 overflow-hidden  md:pt-0 sm:pt-16 2xl:pt-16 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Nuestros clientes
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Testimonios de nuestros clientes
          </p>
        </div>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div className="p-2">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                ¡Hola! 👋 Soy
                <br className="block " />
                Fizzle Glint
              </h2>

              <div className="mt-8  rounded-lg text-white">
                <p className="text-lg">
                  En una lejana región de Azeroth, hubo una vez un aventurero
                  llamado Fizzle que, tentado por una oferta de oro fácil,
                  decidió tomar un préstamo sin pensarlo dos veces. Aunque el
                  oro prometía mejorar su equipo y llenar sus cofres de tesoros,
                  pronto descubrió que las deudas y las promesas incumplidas se
                  convirtieron en un peso abrumador.
                </p>
                <p className="mt-4 text-lg">
                  Fizzle aprendió la lección de la manera más dura: a veces, la
                  codicia puede llevarnos por caminos oscuros. En lugar de
                  aceptar el oro sin considerar las consecuencias, es mejor
                  evaluar cuidadosamente nuestras opciones y buscar caminos que
                  no nos lleven a la desesperación.
                </p>
                <p className="mt-4 text-lg">
                  Así que, antes de tomar una decisión, piénsalo bien. El oro
                  puede brillar, pero la libertad y la paz mental son aún más
                  valiosas.
                </p>

                <p className="mt-4 text-xl text-gray-300 md:mt-8">
                  <span className="relative inline-block">
                    <span className="absolute inline-block w-full bottom-0.5 h-2 bg-gray-900"></span>
                    <span className="relative"> Have a question? </span>
                  </span>
                  <br className="block sm:hidden" />
                  Ask me on{" "}
                  <a
                    href="#"
                    title=""
                    className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
                  >
                    Twitter
                  </a>
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="/img/bank/blob-shape.svg"
                alt="goblin_ground"
              />

              <img
                className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                src="/img/bank/globin-bamboozled.webp"
                alt="goblin_ground_bamboozled"
              />
            </div>
          </div>
        </div>
      </section>
      <div className=" border-t border-gray-700 contenedor"></div>

      <section className=" py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-white">
              Guia de prestamos
            </p>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Solicita el plan de prestamos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-white lg:text-xl lg:leading-8">
              que mas acomode a tus necesidades
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-4">
            <li className="flex-start group relative flex lg:flex-col">
              <span
                className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                aria-hidden="true"
              ></span>
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-white"
                >
                  <path
                    d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-6 lg:ml-0 lg:mt-10">
                <p className="text-lg font-bold text-white before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 uppercase">
                  Requisitos
                </p>
                <ul className="list-disc list-inside">
                  <li className="mt-2 text-base text-white">
                    Tiempo de juego minimo 23 horas
                  </li>
                  <li className="mt-2 text-base text-white">Ser nivel 80 </li>
                </ul>
              </div>
            </li>
            <li className="flex-start group relative flex lg:flex-col">
              <span
                className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                aria-hidden="true"
              ></span>
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-white"
                >
                  <path
                    d="M2 3L2 21M22 3V21M11.8 20H12.2C13.8802 20 14.7202 20 15.362 19.673C15.9265 19.3854 16.3854 18.9265 16.673 18.362C17 17.7202 17 16.8802 17 15.2V8.8C17 7.11984 17 6.27976 16.673 5.63803C16.3854 5.07354 15.9265 4.6146 15.362 4.32698C14.7202 4 13.8802 4 12.2 4H11.8C10.1198 4 9.27976 4 8.63803 4.32698C8.07354 4.6146 7.6146 5.07354 7.32698 5.63803C7 6.27976 7 7.11984 7 8.8V15.2C7 16.8802 7 17.7202 7.32698 18.362C7.6146 18.9265 8.07354 19.3854 8.63803 19.673C9.27976 20 10.1198 20 11.8 20Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-6 lg:ml-0 lg:mt-10">
                <p className="text-xl font-bold text-white before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 uppercase">
                  Selecciona el Plan Ideal para Ti
                </p>
                <p className="mt-2 text-base text-white">
                  Elige el plan perfecto que se adapte a tus necesidades y
                  maximiza tu experiencia.
                </p>
              </div>
            </li>
            <li className="flex-start group relative flex lg:flex-col">
              <span
                className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                aria-hidden="true"
              ></span>
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-white"
                >
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12C22 9.79086 17.5228 8 12 8C6.47715 8 2 9.79086 2 12M22 12C22 14.2091 17.5228 16 12 16C6.47715 16 2 14.2091 2 12M12 22C6.47715 22 2 17.5228 2 12M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2M12 22C9.79086 22 8 17.5228 8 12C8 6.47715 9.79086 2 12 2M2 12C2 6.47715 6.47715 2 12 2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-6 lg:ml-0 lg:mt-10">
                <p className="text-xl font-bold text-white before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 uppercase">
                  ¡Tu Paquete de Oro Está en Camino!
                </p>
                <p className="mt-2 text-base text-white">
                  En unos minutos, revisa el correo en el juego para recibir tu
                  valioso paquete.
                </p>
              </div>
            </li>
            <li className="flex-start group relative flex lg:flex-col">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-white"
                >
                  <path
                    d="M5.50049 10.5L2.00049 7.9999L3.07849 6.92193C3.964 6.03644 4.40676 5.5937 4.9307 5.31387C5.39454 5.06614 5.90267 4.91229 6.42603 4.86114C7.01719 4.80336 7.63117 4.92617 8.85913 5.17177L10.5 5.49997M18.4999 13.5L18.8284 15.1408C19.0742 16.3689 19.1971 16.983 19.1394 17.5743C19.0883 18.0977 18.9344 18.6059 18.6867 19.0699C18.4068 19.5939 17.964 20.0367 17.0783 20.9224L16.0007 22L13.5007 18.5M7 16.9998L8.99985 15M17.0024 8.99951C17.0024 10.1041 16.107 10.9995 15.0024 10.9995C13.8979 10.9995 13.0024 10.1041 13.0024 8.99951C13.0024 7.89494 13.8979 6.99951 15.0024 6.99951C16.107 6.99951 17.0024 7.89494 17.0024 8.99951ZM17.1991 2H16.6503C15.6718 2 15.1826 2 14.7223 2.11053C14.3141 2.20853 13.9239 2.37016 13.566 2.5895C13.1623 2.83689 12.8164 3.18282 12.1246 3.87469L6.99969 9C5.90927 10.0905 5.36406 10.6358 5.07261 11.2239C4.5181 12.343 4.51812 13.6569 5.07268 14.776C5.36415 15.3642 5.90938 15.9094 6.99984 16.9998V16.9998C8.09038 18.0904 8.63565 18.6357 9.22386 18.9271C10.343 19.4817 11.6569 19.4817 12.7761 18.9271C13.3643 18.6356 13.9095 18.0903 15 16.9997L20.1248 11.8745C20.8165 11.1827 21.1624 10.8368 21.4098 10.4331C21.6291 10.0753 21.7907 9.6851 21.8886 9.27697C21.9991 8.81664 21.9991 8.32749 21.9991 7.34918V6.8C21.9991 5.11984 21.9991 4.27976 21.6722 3.63803C21.3845 3.07354 20.9256 2.6146 20.3611 2.32698C19.7194 2 18.8793 2 17.1991 2Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div className="ml-6 lg:ml-0 lg:mt-10">
                <p className="text-xl font-bold text-white before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 uppercase">
                  ¡Recuerda el pago oportuno!
                </p>
                <p className="mt-2 text-base text-white">
                  Disfruta del oro recién llegado en tu juego, sin descuidar la
                  fecha del pago oportuno.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section id="plans">
        <Plans pricingPlans={pricingPlans} />
      </section>
      {token && loggin && (
        <BankCharacter
          isOpen={isModalOpen}
          token={token}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Bank;
