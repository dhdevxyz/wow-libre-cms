"use client";

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
import { useUserContext } from "@/context/UserContext";
import { InternalServerError } from "@/dto/generic";
import { ServerVdpDto } from "@/model/model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Vdp = () => {
  const { user, clearUserData } = useUserContext();
  const router = useRouter();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [vdpModel, setServerVdp] = useState<ServerVdpDto>();
  const searchParams = useSearchParams();

  const serverName = searchParams.get("name");
  const expansion = searchParams.get("expansion");

  useEffect(() => {
    const fetchData = async () => {
      if (!serverName || !expansion) {
        setRedirect(true);
        return;
      }

      try {
        const getServerName = await getServerNameAndExpansion(
          serverName,
          expansion
        );
        setServerVdp(getServerName);
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          if (error.statusCode === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "ERROR",
              color: "white",
              background: "#0B1218",
              timer: 4000,
              willClose: () => {
                clearUserData();
                setRedirect(true);
              },
            });
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
            color: "white",
            background: "#0B1218",
            timer: 4500,
          });
          setRedirect(true);
        }
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

  return (
    <section>
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
      <ServerInformationVdp />
      <ServerRegister />
      <ServerEvents />
      <ServerBlog />
    </section>
  );
};

export default Vdp;
