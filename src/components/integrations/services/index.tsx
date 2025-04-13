import React from "react";

interface IntegrationsServicesProps {
  t: (key: string, options?: any) => string;
}

const IntegrationsServices: React.FC<IntegrationsServicesProps> = ({ t }) => {
  return (
    <>
      <section className="contenedor py-10 bg-midnight sm:py-20 lg:py-24">
        <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-4xl tracking-widest text-indigo-500 font-bold uppercase">
              {t("integrations.services.title")}
            </p>

            <p className="mt-6 mx-auto max-w-xl sm:text-xl/relaxed  text-slate-50">
              {t("integrations.services.sub-title")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-lg font-medium text-white hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#community"
              >
                {t("integrations.services.btn-online")}
              </a>

              <a
                className="block w-full rounded-sm border border-blue-600 px-12 py-3 text-lg font-medium text-white hover:bg-blue-600 focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#pricing"
              >
                {t("integrations.services.btn-plans")}
              </a>
            </div>
          </div>

          <div className="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-20 gap-x-4">
            <div className="space-y-8 lg:pr-8 xl:pr-12 lg:col-span-1 lg:space-y-12">
              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 text-green-500 w-9 h-9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-slate-50">
                    {t("integrations.services.features.new-relic-title")}
                  </h3>
                  <p className="mt-3 text-base text-slate-300">
                    {t("integrations.services.features.new-relic-description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 text-yellow-600 w-9 h-9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-slate-50">
                    {t("integrations.services.features.terminal-title")}
                  </h3>
                  <p className="mt-3 text-base text-slate-300">
                    {t("integrations.services.features.terminal-description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 text-red-500 w-9 h-9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-slate-50">
                    {t("integrations.services.features.security-title")}
                  </h3>
                  <p className="mt-3 text-base text-slate-300">
                    {t("integrations.services.features.security-description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 text-blue-500 w-9 h-9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.5 2.5 2.5 6.5 0 9m0-9C9.5 5.5 9.5 9.5 12 12m0 0c2.5 2.5 6.5 2.5 9 0m-9 0c-2.5-2.5-6.5-2.5-9 0"
                  />
                </svg>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-slate-50">
                    {t("integrations.services.features.website-title")}
                  </h3>
                  <p className="mt-3 text-base text-slate-300">
                    {t("integrations.services.features.website-description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:mt-0">
              <img
                className="w-full max-h-[600px] object-cover rounded-lg shadow-xl"
                src="https://static.wixstatic.com/media/5dd8a0_35941d5a836342e49064b9840cbbe508~mv2.webp"
                alt="Dashboard screenshot"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntegrationsServices;
