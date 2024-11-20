import React from "react";

const Information = () => {
  return (
    <div className="contenedor bg-midnight relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-800">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              stroke-width="0"
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-400">
                ¡Bienvenido a Wow Libre!
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Versión Beta
              </h1>
              <p className="mt-6 text-xl/8 text-gray-300">
                Actualmente, nuestra plataforma está en su fase beta. Esto
                significa que podrías encontrar algunos detalles o
                características en desarrollo. Apreciamos tu comprensión y apoyo
                mientras seguimos mejorando.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-800 shadow-xl ring-1 ring-gray-600/10 sm:w-[57rem]"
            src="http://imgfz.com/i/vaGf8zM.png"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-300 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-400">
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      Push to deploy.
                    </strong>{" "}
                    Podrías notar cambios en la plataforma debido a las
                    actualizaciones en curso que estamos desarrollando.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      SSL certificates.
                    </strong>{" "}
                    Contamos con certificados de seguridad SSL para garantizar
                    la protección de tu información.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      Database backups.
                    </strong>{" "}
                    Toda la información proporcionada estará segura con
                    respaldos regulares, y las cuentas no serán eliminadas.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Agradecemos enormemente cualquier reporte sobre errores que
                puedas encontrar en nuestra plataforma. ¡Tu ayuda nos permite
                mejorar para que disfrutes al máximo del contenido de juego!
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">
                ¿Se eliminarán mis personajes? ¡No te preocupes!
              </h2>
              <p className="mt-6">
                Durante la fase beta, tus datos estarán a salvo. ¡No se
                eliminará ninguna cuenta ni personaje!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
