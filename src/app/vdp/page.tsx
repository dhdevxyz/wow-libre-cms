"use client";

import { getSubscriptionActive } from "@/api/subscriptions";
import { getServerNameAndExpansion } from "@/api/vdp";
import NativeBanners from "@/components/adversing/native_banner";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import ServerAnalytics from "@/components/vdp/analytics";
import ServerBlog from "@/components/vdp/blog";
import VdpBody from "@/components/vdp/body";
import ServerEvents from "@/components/vdp/events";
import VdpBanner from "@/components/vdp/header";
import ServerInformationVdp from "@/components/vdp/information";
import ServerRegister from "@/components/vdp/register";
import { ServerVdpDto } from "@/model/model";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Vdp = () => {
  const router = useRouter();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const [vdpModel, setServerVdp] = useState<ServerVdpDto>();
  const searchParams = useSearchParams();
  const token = Cookies.get("token");

  const serverName = searchParams.get("name");
  const expansion = searchParams.get("expansion");

  useEffect(() => {
    const fetchData = async () => {
      if (!serverName || !expansion) {
        setRedirect(true);
        return;
      }

      try {
        const [subscriptionActive, serverVdp] = await Promise.all([
          token ? getSubscriptionActive(token) : Promise.resolve(false),
          getServerNameAndExpansion(serverName, expansion),
        ]);
        setServerVdp(serverVdp);
        setIsSubscribed(subscriptionActive);
      } catch (error: any) {
        setRedirect(true);
      }
    };
    fetchData();
  }, [serverName, expansion]);

  useEffect(() => {
    if (redirect) {
      router.push("/");
    }
  }, [redirect]);

  if (!vdpModel) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (!serverName || !expansion) {
    setRedirect(true);
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="contenedor mb-6">
        <NavbarAuthenticated />
      </div>
      <VdpBanner
        type={vdpModel.type}
        name={vdpModel.name}
        realmlist={vdpModel.realmlist}
        description={vdpModel.disclaimer}
      />
      <ServerAnalytics cardData={vdpModel.cards} />
      <VdpBody serverData={vdpModel.information} />;
      <NativeBanners />
      <ServerInformationVdp isSubscribed={isSubscribed} />
      {token && (
        <ServerRegister
          serverName={serverName}
          expansion={expansion}
          jwt={token}
        />
      )}
      <ServerEvents events={vdpModel.events} />
      <ServerBlog />
    </div>
  );
};

export default Vdp;
