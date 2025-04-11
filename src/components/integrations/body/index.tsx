import PricingPlans from "@/components/princing";
import React from "react";

interface IntegrationsBodyProps {
  t: (key: string, options?: any) => string;
}

const IntegrationsBody: React.FC<IntegrationsBodyProps> = ({ t }) => {
  return (
    <section id="community" className="bg-mid-900 text-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
          {/* Contenedor de la Imagen (Fija en la parte superior) */}
          <div className="sticky top-0 self-start">
            <img
              src="https://static.wixstatic.com/media/5dd8a0_ee6badb1babc44caae9116919c469636~mv2.webp"
              className="rounded-lg shadow-lg"
              alt="Documentation"
            />
          </div>

          {/* Contenedor de la Documentación (Creciente hacia abajo) */}
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl text-blue-400">
              {t("integrations.guide-documentation.title")}
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              {t("integrations.guide-documentation.description")}
            </p>

            <div className="mt-6 space-y-8">
              {/* Paso 1 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.guide-documentation.steps.step1.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.guide-documentation.steps.step1.description"
                  )}
                </p>
                <a
                  href="https://www.wowlibre.com/register"
                  target="_blank"
                  className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                  {t("integrations.guide-documentation.steps.step1.btn-txt")}
                </a>
              </div>

              {/* Paso 2 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.guide-documentation.steps.step2.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.guide-documentation.steps.step2.description"
                  )}
                </p>
              </div>
              {/* Paso 3 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.guide-documentation.steps.step3.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.guide-documentation.steps.step3.description"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección: Vinculación del Servidor */}
      <section className="bg-midnight text-white py-16 mt-5">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl text-blue-400 text-center">
            {t("integrations.guide-documentation.vinculation-server.title")}
          </h2>

          <p className="mt-4 text-gray-300 text-xl text-center">
            {t(
              "integrations.guide-documentation.vinculation-server.description"
            )}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Paso 1 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">1</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step1.title"
                )}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step1.description"
                )}
              </p>
              <a
                href="https://www.wowlibre.com/servers"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step1.btn-txt"
                )}
              </a>
            </div>

            {/* Paso 2 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">2</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step2.title"
                )}
              </h3>
              <p className="mt-2 text-gray-400 text-xl">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step2.description"
                )}
              </p>

              <a
                href="https://www.wowlibre.com/register/server"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step2.btn-txt"
                )}
              </a>
            </div>

            {/* Paso 3 */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <span className="text-4xl font-bold text-blue-400">3</span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step3.title"
                )}
              </h3>
              <p className="mt-2 text-gray-300 text-lg">
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step3.description"
                )}
              </p>
              <a
                href="https://www.mediafire.com/file/x5uxl7dafk0xrtx/wow-libre-client-0.0.1-SNAPSHOT.jar/file"
                target="_blank"
                className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                {t(
                  "integrations.guide-documentation.vinculation-server.steps.step3.btn-txt"
                )}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva sección: Detalles de los Campos Requeridos */}
      <section className="bg-midnight text-white py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl text-blue-400 text-center">
            {t("integrations.detail-request-server.title")}
          </h2>

          <p className="mt-4 text-gray-300 text-lg text-center">
            {t("integrations.detail-request-server.description")}
          </p>

          <div className="mt-12 space-y-8">
            {/* Campo: Nombre del Servidor */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.name-server.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t(
                  "integrations.detail-request-server.name-server.description"
                )}
              </p>
            </div>

            {/* Campo: Web */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.web.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t("integrations.detail-request-server.web.description")}
              </p>
            </div>
            {/* Campo: Expansion */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.expansion.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t("integrations.detail-request-server.expansion.description")}
              </p>
            </div>
            {/* Campo: Host */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.host.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t("integrations.detail-request-server.host.description")}{" "}
                "http://" o "https://".
                <br />
                <strong>
                  {t("integrations.detail-request-server.host.example")}:
                </strong>{" "}
                <span className="text-blue-400">
                  https://www.wowlibre.com:8090
                </span>
                <br />
                {t("integrations.detail-request-server.host.description-two")}
                <strong>8090</strong>.
              </p>
            </div>

            {/* Campo: Realmlist */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.realmlist.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t("integrations.detail-request-server.realmlist.description")}
              </p>
            </div>

            {/* Campo: Tipo Servidor */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.type-server.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t(
                  "integrations.detail-request-server.type-server.description"
                )}
              </p>
            </div>

            {/* Campo:  Contraseña */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t("integrations.detail-request-server.password.title")}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t("integrations.detail-request-server.password.description")}
              </p>
            </div>

            {/* Campo: Usuario & Contraseña Externo */}
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white">
                {t(
                  "integrations.detail-request-server.credentials-external.title"
                )}
              </h3>
              <p className="mt-2 text-gray-400 text-lg">
                {t(
                  "integrations.detail-request-server.credentials-external.description"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-4xl font-bold sm:text-4xl text-blue-400 text-center ">
          {t("integrations.configuration-server.title")}
        </h2>
        <p className="mt-4 text-gray-300 text-xl text-center">
          {t("integrations.configuration-server.description")}
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
              {t("integrations.configuration-server.guide.title")}
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              {t("integrations.configuration-server.guide.description")}
            </p>

            <div className="mt-6 space-y-8">
              {/* Paso 1 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.configuration-server.steps.step1.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.configuration-server.steps.step1.description"
                  )}
                </p>
                <a
                  href="https://www.mediafire.com/file/x5uxl7dafk0xrtx/wow-libre-client-0.0.1-SNAPSHOT.jar/file"
                  target="_blank"
                  className="inline-block mt-4 rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                  {t("integrations.configuration-server.steps.step1.btn-txt")}
                </a>
              </div>

              {/* Paso 2 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.configuration-server.steps.step2.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.configuration-server.steps.step2.description"
                  )}{" "}
                  <a
                    href="https://www.wowlibre.com/servers"
                    className="text-blue-400 hover:underline"
                  >
                    www.wowlibre.com/servers
                  </a>
                  {t(
                    "integrations.configuration-server.steps.step2.description-two"
                  )}
                </p>
              </div>
              {/* Paso 3 */}
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("integrations.configuration-server.steps.step3.title")}
                </h3>
                <p className="text-gray-300 mt-2 text-xl">
                  {t(
                    "integrations.configuration-server.steps.step3.description"
                  )}
                </p>

                {/* Windows */}
                <div className="mt-8">
                  <h4 className="text-4xl font-semibold text-blue-400">
                    Windows
                  </h4>
                  <p className="text-gray-300 mt-8 text-lg">
                    {t("integrations.configuration-server.windows.title")}
                  </p>

                  <ul className="text-gray-300 mt-2 text-lg list-decimal list-inside space-y-2">
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step1.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        https://www.oracle.com/co/java/technologies/downloads/
                      </code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step2.title"
                      )}
                    </li>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step3.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>java -version</code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step4.title"
                      )}
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
        set SECRET_JWT=A3F1E6B2D0A728C9F54D8B32C7A59A
        7D0B9A8F94D1F6C762E7DA56231988C158
        set SERVER_WEB_NAME=NombreDelServer

        cd /d C:\app\
        java -jar wow-libre-client-0.0.1-SNAPSHOT.jar
        pause`}
                      </code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step5.title"
                      )}{" "}
                      (`C:\app\`).
                    </li>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step6.title"
                      )}
                    </li>
                    <li>
                      {t(
                        "integrations.configuration-server.windows.steps.step7.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>shell:startup</code>
                    </pre>
                    <li>
                      <strong>
                        {t(
                          "integrations.configuration-server.windows.steps.step8.note"
                        )}{" "}
                      </strong>
                      {t(
                        "integrations.configuration-server.windows.steps.step8.title"
                      )}
                      <code>C:\app\</code>,{" "}
                      {t(
                        "integrations.configuration-server.windows.steps.step8.description"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        move wow-libre-client-0.0.1-SNAPSHOT.jar C:\app\
                      </code>
                    </pre>
                  </ul>
                </div>

                {/* Linux */}
                <div className="mt-8">
                  <h4 className="text-4xl font-semibold text-blue-400">
                    Linux
                  </h4>
                  <p className="mt-5 text-gray-300 text-lg">
                    {t("integrations.configuration-server.linux.title")}
                  </p>

                  <ul className="text-gray-300 mt-2 text-lg list-decimal list-inside space-y-2">
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step1.title"
                      )}
                    </li>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step2.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        sudo apt update && sudo apt install openjdk-17-jdk
                      </code>
                    </pre>
                    <li>
                      {" "}
                      {t(
                        "integrations.configuration-server.linux.steps.step3.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>java -version</code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step4.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        sudo nano /etc/systemd/system/wow-libre-client.service
                      </code>
                    </pre>
                    <li>
                      {" "}
                      {t(
                        "integrations.configuration-server.linux.steps.step5.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md overflow-x-auto text-sm sm:text-base">
                      <code className="whitespace-pre">
                        {`[Unit]
Description=Wow Libre Client
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/app/
ExecStart=/usr/bin/java -jar /root/app/wow-libre-client-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
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
Environment="SECRET_JWT=A3F1E6B2D0A728C9F54D8B32C
7A59A7D0B9A8F94D1F6C762E7DA56231988C158"
Environment="SERVER_WEB_NAME=NombreDelServer"

[Install]
WantedBy=multi-user.target`}
                      </code>
                    </pre>

                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step6.title"
                      )}
                    </li>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step7.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl daemon-reload</code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step8.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl enable wow-libre-client</code>
                    </pre>
                    <li>
                      {" "}
                      {t(
                        "integrations.configuration-server.linux.steps.step9.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl start wow-libre-client</code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step10.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>sudo systemctl status wow-libre-client</code>
                    </pre>
                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step11.title"
                      )}
                    </li>
                    <pre className="bg-gray-800 text-white px-3 py-2 rounded-md">
                      <code>
                        mv wow-libre-client-0.0.1-SNAPSHOT.jar /root/app/
                      </code>
                    </pre>

                    <li>
                      {t(
                        "integrations.configuration-server.linux.steps.step12.title"
                      )}
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
        className=" flex flex-col items-center justify-center  bg-gradient-to-r bg-midnight text-white p-10 "
      >
        <PricingPlans />
      </div>
    </section>
  );
};

export default IntegrationsBody;
