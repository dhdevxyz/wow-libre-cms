"use client";
import IntegrationsBody from "@/components/integrations/body";
import IntegrationsFeatures from "@/components/integrations/features";
import IntegrationsGallery from "@/components/integrations/gallery";
import IntegrationsHeader from "@/components/integrations/header";
import IntegrationsServices from "@/components/integrations/services";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { useTranslation } from "react-i18next";

const IntegrationsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="contenedor mb-6">
        <NavbarAuthenticated />
      </div>
      <IntegrationsServices t={t} />
      <IntegrationsFeatures t={t} />
      <IntegrationsGallery t={t} />
      <IntegrationsHeader t={t} />
      <IntegrationsBody t={t} />
    </div>
  );
};

export default IntegrationsPage;
