import React from "react";
interface IntegrationsHeaderProps {
  t: (key: string, options?: any) => string;
}
const IntegrationsHeader: React.FC<IntegrationsHeaderProps> = ({ t }) => {
  return (
    <section className="bg-midnight text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-1/2 lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl">
            {t("integrations.header-plataform.title")}
            <span className="sm:block">
              {t("integrations.header-plataform.subtitle")}
            </span>
          </h1>
          <p className="mx-auto max-w-xl sm:text-2xl/relaxed">
            {t("integrations.header-plataform.description")} 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsHeader;
