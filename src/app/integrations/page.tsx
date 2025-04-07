"use client";
import IntegrationsBody from "@/components/integrations/body";
import IntegrationsFeatures from "@/components/integrations/features";
import IntegrationsGallery from "@/components/integrations/gallery";
import IntegrationsHeader from "@/components/integrations/header";
import IntegrationsServices from "@/components/integrations/services";
import NavbarAuthenticated from "@/components/navbar-authenticated";

const IntegrationsPage = () => {
  return (
    <div>
      <div className="contenedor mb-6">
        <NavbarAuthenticated />
      </div>
      <IntegrationsServices />
      <IntegrationsFeatures />
      <IntegrationsGallery />
      <IntegrationsHeader />
      <IntegrationsBody />
    </div>
  );
};

export default IntegrationsPage;
