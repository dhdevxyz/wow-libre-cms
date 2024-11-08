"use client";

import NavbarAuthenticated from "@/components/navbar-authenticated";
import Link from "next/link";
import ReactPaginate from "react-paginate";

import React, { useEffect, useState } from "react";
import { GuildDto, GuildsDto, ServerModel } from "@/model/model";
import { getServers } from "@/api/account/servers";
import { getGuilds } from "@/api/guilds";
import { useTranslation } from "react-i18next";

const Guild = () => {
  const [guilds, setGuilds] = useState<GuildDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAccounts, setFilteredAccounts] = useState<GuildDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasGuilds, setHasGuilds] = useState<boolean>(false);
  const accountsPerPage = 5;
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [servers, setServers] = useState<ServerModel[]>([]);
  const [selectedServer, setSelectedServer] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serversData, guildsResponse] = await Promise.all([
          getServers(),
          getGuilds(currentPage, accountsPerPage, searchTerm, selectedServer),
        ]);
        setServers(serversData);
        const response: GuildsDto = guildsResponse;
        setGuilds(response.guilds);
        setHasGuilds(response.size > 0);
        setTotalGuilds(response.size);
      } catch (error) {
        console.error("Ha ocurrido un error al obtener los personajes", error);
        setGuilds([]);
        setHasGuilds(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, selectedServer]);

  const handleServerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServer(event.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = guilds.filter((guild) =>
      guild.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, guilds]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="contenedor  h-screen-md">
      <NavbarAuthenticated />

      <div className="text-center pt-20">
        <h1 className="text-4xl font-bold text-white">
          {t("guild.availability.title")}
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          {t("guild.availability.description")}
        </p>
      </div>

      {hasGuilds ? (
        <>
          <div className=" dark w-full min-h-[50vh]">
            <div className="relative overflow-x-auto  sm:rounded-lg pt-20">
              <div className="flex items-center justify-between flex-wrap md:flex-nowrap space-y-4 md:space-y-0 pb-4 bg-midnight">
                {/* Buscador de servidor */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <select
                      id="table-search-server"
                      className="block p-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={selectedServer}
                      onChange={handleServerChange}
                    >
                      <option value="">
                        {" "}
                        {t("guild.availability.select-server")}
                      </option>
                      {servers.map((server) => (
                        <option key={server.id} value={server.name}>
                          {server.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buscador de usuario */}
                  {selectedServer && (
                    <div className="relative">
                      <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto min-h-[300px] flex flex-col justify-between select-none">
                <table className=" text-lg text-left rtl:text-right text-gray-400">
                  <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-one")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-two")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-three")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-four")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-five")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-six")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-eight")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("guild.table.position-nine")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAccounts.map((row) => (
                      <tr
                        key={row.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id={`checkbox-table-search-${row.id}`}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`checkbox-table-search-${row.id}`}
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4">{row.id}</td>
                        <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <img
                            className="w-12 h-12 p-1 rounded-full select-none"
                            src={
                              row.avatar != null
                                ? row.avatar
                                : "/img/guilds/guild-icon-default.png"
                            }
                            alt="https://icons8.com"
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {row.name}
                            </div>
                            <div className="font-normal text-gray-500">
                              {t("guild.guild-txt")}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 ">{row.leader_name}</td>
                        <td className="px-6 py-4">{row.server_name}</td>
                        <td className="px-6 py-4 ">{row.create_date}</td>
                        <td className="px-6 py-4">{row.members}</td>
                        <td className="px-6 py-4">
                          <a
                            href={row.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            Discord
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            href={{
                              pathname: `/guild/${row.id}`,
                              query: { server: row.server_id },
                            }}
                          >
                            Ir a detalle de guild
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-center items-center ">
                  <ReactPaginate
                    previousLabel={t("guild.btn.secondary")}
                    nextLabel={t("guild.btn.primary")}
                    breakLabel={""}
                    pageCount={Math.ceil(totalGuilds / accountsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination flex space-x-2"}
                    pageClassName={"page-item"}
                    pageLinkClassName={
                      "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                    }
                    previousClassName={"page-item"}
                    previousLinkClassName={
                      "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                    }
                    nextClassName={"page-item"}
                    nextLinkClassName={
                      "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                    }
                    breakClassName={"page-item"}
                    breakLinkClassName={
                      "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                    }
                    activeClassName={"active"}
                    activeLinkClassName={"bg-blue-900"}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative w-full h-auto flex flex-col items-center justify-center text-center pt-20 text-lg text-gray-500 max-w-full select-none">
          <div className="relative w-2/3 h-auto transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800">
            <img
              src="/img/guilds/guild-not-found.webp"
              alt="Create your guild"
              className="w-full h-auto max-w-none rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-black rounded-lg"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-3xl font-bold mb-4">
                {t("guild.no-availability.title")}
              </h2>
              <p className="text-xl mx-auto max-w-2xl">
                {t("guild.no-availability.description")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guild;
