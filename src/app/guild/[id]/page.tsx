"use client";

import GuildCharacter from "@/components/guild_character";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Link from "next/link";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import DisplayMoney from "@/components/money";

import { getGuild } from "@/api/guilds";
import { GuildData } from "@/model/model";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BenefitsModel } from "@/model/benefit-model";
import { benefitsActive } from "@/api/benefit";
import { useUserContext } from "@/context/UserContext";
import { useTranslation } from "react-i18next";
import WowheadTooltip from "@/utils/wowhead";

const GuildDetail = () => {
  const searchParams = useSearchParams();

  const { user } = useUserContext();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const guildId = Number(id);
  const [guild, setGuild] = useState<GuildData>();
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggin, setLoggin] = useState(false);
  const [benefits, setBenefits] = useState<BenefitsModel[]>([]);
  const router = useRouter();
  const serverId = Number(searchParams.get("server"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guildsResponse, benefits] = await Promise.all([
          getGuild(guildId, serverId),
          benefitsActive(),
        ]);

        if (!guildsResponse.public_access) {
          router.push("/guild");
        }
        setBenefits(benefits);
        setGuild(guildsResponse);
        setIsLoading(false);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          willClose: () => {
            router.push("/guild");
          },
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/guild");
          }
        });
      }
    };
    fetchData();
    setLoggin(token != null && user.logged_in);
  }, [token]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <WowheadTooltip />
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>
      <div
        className="text-white mt-14"
        style={{
          background: "linear-gradient(to right, #0B1218, #2B5876, #4E4376)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-10">
                  {t("guild-detail.welcome-txt")}: {guild?.name}
                </h2>
                <p className="text-lg lg:text-2xl mb-4 break-words">
                  {guild?.info}
                </p>
              </div>
              <div>
                {loggin ? (
                  <>
                    <button
                      onClick={openModal}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                    >
                      {t("guild-detail.btn-authenticated")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    {t("guild-detail.btn-unauthenticated")}
                  </Link>
                )}
                <p className="text-lg pt-4 break-words">{guild?.motd}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8 select-none">
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_d3843acf700e43b3a5aac5bf19f145b6~mv2.webp"
                  alt="guild-img-one"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_aa7097f05b69423fb6e4da3c7f2a79e9~mv2.jpg"
                  alt="guild-img-two"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">
                {t("guild-detail.statistics.member-txt")}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {guild?.members}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">
                {t("guild-detail.statistics.benefits-txt")}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {0}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">
                {t("guild-detail.statistics.gold-guild-txt")}
              </dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-white sm:text-4xl">
                <DisplayMoney money={guild?.bank_money || 0} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="contenedor mb-20">
        <div className="container px-6 py-10 mx-auto">
          <div className="xl:flex xl:items-center xL:-mx-4">
            <div className="xl:w-1/2 xl:mx-4">
              <h1 className="text-2xl font-semibold   lg:text-3xl text-white">
                {t("guild-detail.incentive.title")}
              </h1>

              <p className="max-w-2xl mt-4 text-gray-400 ">
                {t("guild-detail.incentive.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
              <div>
                <img
                  className="object-cover rounded-xl aspect-square "
                  src="https://wow.zamimg.com/uploads/blog/images/19963-blizzard-takes-action-against-gallywix-and-gold-selling-for-real-money.jpg"
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                  {t("guild-detail.event.primary.title")}
                </h1>

                <p className="mt-2   text-gray-300 text-lg">
                  {t("guild-detail.event.primary.description")}
                </p>
              </div>

              <div>
                <img
                  className="object-cover rounded-xl aspect-square "
                  src="https://i.blogs.es/b8677c/wow-monturas/500_333.webp"
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                  {t("guild-detail.event.secondary.title")}
                </h1>

                <p className="mt-2   text-gray-300 text-lg">
                  {t("guild-detail.event.secondary.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center ">
            <img
              className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96  lg:h-[36rem] rounded-2xl hover:shadow hover:shadow-teal-800"
              src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/hd/HD1RQDNY2B1E1565028457549.jpg"
              alt=""
            />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-5xl font-semibold text-blue-500 ">“</p>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                {t("guild-detail.competition.title")}
              </h1>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                {t("guild-detail.competition.description")}
              </p>

              <h3 className="mt-6 text-lg font-medium text-blue-500">
                {guild?.server_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {t("guild-detail.competition.event-txt")}
              </p>

              <div className="flex items-center justify-between mt-12 lg:justify-start">
                <button
                  title="left arrow"
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  title="right arrow"
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contenedor mt-10">
        <section className="dark">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              {t("guild-detail.events.title")}
              <span className="text-blue-500">
                {t("guild-detail.events.duration")}
              </span>
            </h1>
            <p className="text-xl text-center text-gray-800 dark:text-white mt-2 max-w-xl mx-auto">
              {t("guild-detail.events.description")}
            </p>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800"
                >
                  <span className="inline-block p-3 text-blue-500  ">
                    <img
                      src={benefit.logo}
                      alt="Logo"
                      className="w-40 h-40 rounded-full "
                    />
                  </span>

                  <div className="flex flex-col font-semibold capitalize text-white">
                    <div className="text-3xl">{benefit.title}</div>
                    <div className="text-lg text-yellow-500 pt-1">
                      {benefit.sub_title}
                    </div>
                  </div>
                  <p className="text-gray-400  text-2xl">
                    {benefit.description}
                  </p>
                  <br />

                  <a
                    href={`${benefit.link}`}
                    data-wh-icon-size="small"
                    className="flex items-center -mx-1 text-lg text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                  >
                    <span className="mx-1">Detalle del ítem</span>
                    <svg
                      className="w-4 h-4 mx-1 rtl:-scale-x-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="dark contenedor">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            {t("guild-detail.benefits.title")}
            <span className="text-blue-500">
              {t("guild-detail.benefits.subtitle")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            {t("guild-detail.benefits.disclaimer")}
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
            {guild?.benefits && guild?.benefits.length > 0 ? (
              guild.benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-gray-800 dark:border-gray-700 dark:hover:border-transparent"
                >
                  <div className="flex flex-col sm:-mx-4 sm:flex-row">
                    <img
                      className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
                      src={benefit.logo}
                      alt=""
                    />

                    <div className="mt-4 sm:mx-4 sm:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">
                        {benefit.title}
                      </h1>

                      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300 text-lg">
                        {benefit.sub_title}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-center text-yellow-500 text-2xl">
                  {t("guild-detail.benefits.no-benefits")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {token && loggin && (
        <GuildCharacter
          isOpen={isModalOpen}
          token={token}
          guildId={guildId}
          serverId={serverId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GuildDetail;
