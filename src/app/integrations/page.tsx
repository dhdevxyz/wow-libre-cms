"use client";
import IntegrationsBody from "@/components/integrations/body";
import IntegrationsHeader from "@/components/integrations/header";
import NavbarAuthenticated from "@/components/navbar-authenticated";

const IntegrationsPage = () => {
  return (
    <div>
      <div className="contenedor mb-6">
        <NavbarAuthenticated />
      </div>
      <IntegrationsHeader />
      <IntegrationsBody />
    </div>
  );
};

export default IntegrationsPage;
