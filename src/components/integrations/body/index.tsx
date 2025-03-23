import PricingPlans from "@/components/princing";
import React from "react";

const IntegrationsBody = () => {
  return (
    <section id="community" className="bg-mid-900 text-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
          {/* Contenedor de la Imagen (Fija en la parte superior) */}
          <div className="sticky top-0 self-start">
            <img
              src="https://static.wixstatic.com/media/5dd8a0_ee6badb1babc44caae9116919c469636~mv2.webp"
              className="rounded-lg shadow-lg"
              alt="Vista previa de documentación"
            />
          </div>

          {/* Contenedor de la Documentación (Creciente hacia abajo) */}
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl text-blue-400">
              Guía de integración
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              Aprende cómo integrar nuestra plataforma en tu proyecto en pocos
              pasos. Sigue estas instrucciones y accede a nuestras herramientas
              de desarrollo de manera eficiente.
            </p>

            <div className="mt-6 space-y-8">
              {/* Paso 1 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  1. Crear una cuenta en la plataforma
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Para comenzar, es necesario registrarse en la plataforma.
                  Accede al siguiente enlace y completa el formulario de
                  registro:
                </p>
                <a
                  href="https://www.wowlibre.com/register"
                  target="_blank"
                  className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                  Registrarme
                </a>
              </div>

              {/* Paso 2 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  2. Validar correo
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Una vez registrado, recibirás un correo para validar tu
                  cuenta. Este paso es obligatorio antes de continuar con la
                  vinculación del servidor.
                </p>
              </div>
              {/* Paso 3 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  3. Panel de vinculacion
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Para vincular el servidor debes crear un servidor en la
                  plataforma, actualmente solo damos soporte a la expansion de
                  LK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección: Vinculación del Servidor */}
      <section className="bg-midnight text-white py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl text-blue-400 text-center">
            Vinculación del Servidor
          </h2>

          <p className="mt-4 text-gray-300 text-lg text-center">
            Conecta tu servidor con nuestra plataforma en solo tres pasos.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Paso 1 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">1</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                Accede al panel de servidores
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                Accede al panel de servidores para vincular tu servidor. Desde
                este panel, podrás visualizar y gestionar todos los servidores
                conectados a nuestra plataforma.
              </p>
              <a
                href="https://www.wowlibre.com/servers"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Mis servidores
              </a>
            </div>

            {/* Paso 2 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">2</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                Configura tu servidor
              </h3>
              <p className="mt-2 text-gray-400 text-xl">
                En esta sección, deberás proporcionar una serie de datos
                esenciales para completar la vinculación de tu servidor de
                manera exitosa.
              </p>

              <a
                href="https://www.wowlibre.com/register/server"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Vincular mi servidor
              </a>
            </div>

            {/* Paso 3 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">3</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                Vincula y verifica
              </h3>
              <p className="mt-2 text-gray-300 text-lg">
                Una vez envíes la solicitud, nuestra plataforma iniciará el
                proceso de comunicación con la aplicación Java, la cual debes
                descargar y ejecutar en tu servidor.
              </p>
              <a
                href="https://www.mediafire.com/file/x5uxl7dafk0xrtx/wow-libre-client-0.0.1-SNAPSHOT.jar/file"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Descargar App
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva sección: Detalles de los Campos Requeridos */}
      <section className="bg-midnight text-white py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl text-blue-400 text-center">
            Detalles de los Campos Requeridos
          </h2>

          <p className="mt-4 text-gray-300 text-lg text-center">
            Asegúrate de completar correctamente cada campo para una vinculación
            exitosa.
          </p>

          <div className="mt-12 space-y-8">
            {/* Campo: Nombre del Servidor */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                Nombre del Servidor
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                Especifica el nombre con el que deseas identificar tu servidor
                en la plataforma.
              </p>
            </div>

            {/* Campo: Web */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">Web</h3>
              <p className="mt-2 text-gray-400 text-lg">
                Proporciona el enlace oficial donde los jugadores podrán obtener
                información y registrarse. Puedes ingresar la URL de tu propio
                sitio web o, si no cuentas con uno, utilizar nuestro dominio
                oficial: www.wowlibre.com/register.
              </p>
            </div>
            {/* Campo: Expansion */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">Expansion</h3>
              <p className="mt-2 text-gray-400 text-lg">
                Selecciona la expansion de juego de tu servidor
              </p>
            </div>
            {/* Campo: Host */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">Host</h3>
              <p className="mt-2 text-gray-400 text-lg">
                Proporciona la dirección IP pública de tu servidor, un dato
                esencial para la comunicación con nuestra plataforma. Si
                utilizas un dominio, asegúrate de incluir "http://" o
                "https://".
                <br />
                <strong>Ejemplo:</strong>{" "}
                <span className="text-blue-400">
                  https://www.wowlibre.com:8090
                </span>
                <br />
                Además, es crucial especificar el puerto en el que la aplicación
                está escuchando. Si no has realizado cambios en la configuración
                predeterminada, el puerto por defecto es <strong>8090</strong>.
              </p>
            </div>

            {/* Campo: Realmlist */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">Realmlist</h3>
              <p className="mt-2 text-gray-400 text-lg">
                Suministranos el realmlist de tu servidor para que la comunidad
                pueda acceder a el.
              </p>
            </div>

            {/* Campo: Tipo Servidor */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                Tipo de servidor
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                Actualmente, ofrecemos tres categorías de servidores: INSTANT,
                BLIZZLIKE y CUSTOM. Selecciona la categoría que mejor describa
                el estado de tu servidor. Este campo es únicamente informativo y
                no afecta la vinculación.
              </p>
            </div>

            {/* Campo:  Contraseña */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">Contraseña</h3>
              <p className="mt-2 text-gray-400 text-lg">
                Crea una contraseña que se utilizará en el panel de
                administración de tu servidor para realizar cambios. Esta es una
                medida de seguridad adicional diseñada para proteger el acceso y
                la configuración de tu servidor.
              </p>
            </div>

            {/* Campo: Usuario & Contraseña Externo */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                Usuario y Contraseña para la plataforma
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                Estos datos son fundamentales para que nuestra plataforma se
                comunique de manera segura con la aplicación. Esto nos permite
                agregar una capa de seguridad adicional, garantizando que solo
                nuestra plataforma, WoW Libre, pueda acceder a las APIs
                expuestas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold sm:text-4xl text-blue-400 text-center ">
          Configuracion de la aplicacion
        </h2>
        <p className="mt-4 text-gray-300 text-lg text-center">
          Este paso es crucial, ya que a través de esta aplicación nuestra
          plataforma establece una comunicación segura y eficiente con tu
          infraestructura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 mt-10">
          {/* Contenedor de la Imagen (Fija en la parte superior) */}
          <div className="sticky top-0 self-start">
            <img
              src="https://static.wixstatic.com/media/5dd8a0_caf73adcc69d421896f2df703f08e696~mv2.gif"
              className="rounded-lg shadow-lg"
              alt="Vista previa de documentación"
            />
          </div>

          {/* Contenedor de la Documentación (Creciente hacia abajo) */}
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl text-blue-400">
              Guía de configuración
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              Esta aplicación web está desarrollada en Java, utilizando el
              framework Spring y basada en una arquitectura de microservicios.
            </p>

            <div className="mt-6 space-y-8">
              {/* Paso 1 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  1. Descargar aplicacion
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Actualmente, el código fuente es abierto, y seguimos
                  mejorándolo día a día para optimizar su rendimiento y añadir
                  nuevas funcionalidades. Además, hemos dejado el archivo JAR
                  compilado, listo para que lo descargues y uses fácilmente.
                </p>
                <a
                  href="https://www.mediafire.com/file/x5uxl7dafk0xrtx/wow-libre-client-0.0.1-SNAPSHOT.jar/file"
                  target="_blank"
                  className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                  Descargar App
                </a>
              </div>

              {/* Paso 2 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  2. Copiar Api key
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Si has seguido los pasos anteriores, dirígete a la sección{" "}
                  <a
                    href="https://www.wowlibre.com/servers"
                    className="text-blue-400 hover:underline"
                  >
                    www.wowlibre.com/servers
                  </a>
                  , donde se muestran todos tus servidores vinculados. En la
                  tabla, encontrarás una columna llamada "API Key", desde la
                  cual podrás copiar tu clave fácilmente.
                </p>
              </div>
              {/* Paso 3 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  3. Instalacion y ejecusion
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  Antes de iniciar la aplicación en Java, es necesario realizar
                  algunos pasos previos de instalación y configuración de
                  variables de entorno, según el sistema operativo que estés
                  utilizando.
                </p>

                {/* Windows */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-white">Windows</h4>
                  <p className="text-gray-300 mt-2 text-lg">
                    Sigue estos pasos para instalar Java JDK 17, crear y
                    configurar el servicio en Windows:
                  </p>

                  <ul className="text-gray-300 mt-2 text-lg list-decimal list-inside space-y-2">
                    <li>
                      Descarga e instala Java JDK 17 desde el sitio oficial de
                      Oracle o adoptium.net:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        https://www.oracle.com/co/java/technologies/downloads/
                      </code>
                    </pre>
                    <li>
                      Durante la instalación, asegúrate de agregar Java al PATH
                      del sistema.
                    </li>
                    <li>Verifica la instalación ejecutando en la terminal:</li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>java -version</code>
                    </pre>
                    <li>
                      Crea un archivo por lotes (`wow-libre-client.bat`) con el
                      siguiente contenido:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md whitespace-pre-wrap">
                      <code>
                        {`@echo off
        set API_KEY_WOW_LIBRE=vuad1kt0jdidddxxxdv
        set USERNAME_WOW_LIBRE=wowlibre@gmail.com
        set PASSWORD_WOW_LIBRE=wowlibreclave
        set GM_USERNAME=wowlibregm
        set GM_PASSWORD=wowlibreclave
        set DB_WOW_LIBRE_USERNAME=acore
        set DB_WOW_LIBRE_PASSWORD=acore
        set SECRET_JWT=A3F1E6B2D0A728C9F54D8B32C7A59A7D0B9A8F94D1F6C762E7DA56231988C158
        set SERVER_WEB_NAME=NombreDelServer

        cd /d C:\app\
        java -jar wow-libre-client-0.0.1-SNAPSHOT.jar
        pause`}
                      </code>
                    </pre>
                    <li>
                      Guarda el archivo y colócalo en la carpeta donde estará la
                      aplicación (`C:\app\`).
                    </li>
                    <li>
                      Para ejecutar el servicio manualmente, haz doble clic en
                      `wow-libre-client.bat`.
                    </li>
                    <li>
                      Si deseas que se ejecute automáticamente al iniciar
                      Windows, crea un acceso directo del archivo `.bat` en la
                      carpeta `shell:startup`.
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>shell:startup</code>
                    </pre>
                    <li>
                      <strong>Nota:</strong> Asegúrate de colocar el archivo
                      `.jar` descargado en la carpeta especificada en el script.
                      En este ejemplo, la ruta usada es
                      <code>C:\app\</code>, pero puedes cambiarla según tu
                      necesidad. Para mover el archivo, puedes usar el
                      Explorador de archivos o el siguiente comando en cmd:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        move wow-libre-client-0.0.1-SNAPSHOT.jar C:\app\
                      </code>
                    </pre>
                  </ul>
                </div>

                {/* Linux */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-white">Linux</h4>
                  <p className="text-gray-300 mt-2 text-lg">
                    Sigue estos pasos para instalar Java JDK 17, crear y
                    configurar el servicio en Linux:
                  </p>

                  <ul className="text-gray-300 mt-2 text-lg list-decimal list-inside space-y-2">
                    <li>Abre una terminal.</li>
                    <li>
                      Instala Java JDK 17 ejecutando el siguiente comando:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        sudo apt update && sudo apt install openjdk-17-jdk
                      </code>
                    </pre>
                    <li>Verifica la instalación ejecutando:</li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>java -version</code>
                    </pre>
                    <li>
                      Crea el archivo del servicio con el siguiente comando:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        sudo nano /etc/systemd/system/wow-libre-client.service
                      </code>
                    </pre>
                    <li>Agrega el siguiente contenido al archivo:</li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md whitespace-pre-wrap">
                      <code>
                        {`[Unit]
Description=Wow Libre Client
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/app/
ExecStart=/usr/bin/java -jar /root/app/wow-libre-client-0.0.1-SNAPSHOT.jar
Restart=on-failure
RestartSec=10s

# Variables de entorno
Environment="API_KEY_WOW_LIBRE=vuad1kt0jdidddxxxdv"
Environment="USERNAME_WOW_LIBRE=wowlibre@gmail.com"
Environment="PASSWORD_WOW_LIBRE=wowlibreclave"
Environment="GM_USERNAME=wowlibregm"
Environment="GM_PASSWORD=wowlibreclave"
Environment="DB_WOW_LIBRE_USERNAME=acore"
Environment="DB_WOW_LIBRE_PASSWORD=acore"
Environment="SECRET_JWT=A3F1E6B2D0A728C9F54D8B32C7A59A7D0B9A8F94D1F6C762E7DA56231988C158"
Environment="SERVER_WEB_NAME=NombreDelServer"


[Install]
WantedBy=multi-user.target`}
                      </code>
                    </pre>
                    <li>
                      Guarda los cambios y cierra el editor (`CTRL + X`, luego
                      `Y` y `ENTER`).
                    </li>
                    <li>
                      Recarga los servicios de systemd para aplicar la
                      configuración:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl daemon-reload</code>
                    </pre>
                    <li>
                      Habilita el servicio para que inicie automáticamente con
                      el sistema:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl enable wow-libre-client</code>
                    </pre>
                    <li>Inicia el servicio manualmente:</li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl start wow-libre-client</code>
                    </pre>
                    <li>
                      Verifica que el servicio esté funcionando correctamente:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl status wow-libre-client</code>
                    </pre>
                    <li>
                      <strong>Nota:</strong> Asegúrate de colocar el archivo
                      `.jar` descargado en la carpeta especificada en{" "}
                      <code>WorkingDirectory</code>. En este ejemplo, la ruta
                      usada es
                      <code>/root/app/</code>, pero puedes cambiarla según tu
                      necesidad. Para mover el archivo, puedes usar el siguiente
                      comando:
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        mv wow-libre-client-0.0.1-SNAPSHOT.jar /root/app/
                      </code>
                    </pre>

                    <li>
                      <strong>Nota:</strong> Como paso final, es necesario
                      activar <strong>SOAP</strong> en el emulador editando el
                      archivo <code>worldserver.conf</code>.
                      <br />
                      Esto permitirá que la plataforma se comunique con la
                      aplicación y automatice procesos mediante los comandos del
                      emulador.
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>SOAP.Enabled = 1</code>
                    </pre>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="pricing"
        className="contenedor flex flex-col items-center justify-center  bg-gradient-to-r bg-midnight text-white p-10 "
      >
        <PricingPlans />
      </div>
    </section>
  );
};

export default IntegrationsBody;
