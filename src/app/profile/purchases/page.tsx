"use client";
import React, { useEffect, useState } from "react";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { getTransactions } from "@/api/transactions";
import Cookies from "js-cookie";
import { Transaction } from "@/model/model";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 4;

const Purchases = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      try {
        const data = await getTransactions(
          token || "",
          currentPage,
          ITEMS_PER_PAGE
        );
        setTransactions(data.transactions);
        setTotalTransactions(data.size);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, token]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="contenedor  overflow-hidden">
      <div className="mb-20">
        <NavbarAuthenticated />
      </div>
      <div className="flex flex-wrap -mx-3 dark:bg-gray-900 w-full max-h-full overflow-hidden">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-1 flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-gray-800 m-5 dark:bg-gray-900">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-gray-700 bg-gray-800 dark:bg-gray-900">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl text-white">
                  <span className="mr-3 font-semibold">
                    Donaciones realizadas
                  </span>
                  <span className="mt-1 text-secondary-dark text-gray-400">
                    Encuentra un listado total de donaciones
                  </span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <button
                    onClick={() => setCurrentPage(0)}
                    className="inline-block text-[.925rem] font-medium text-center cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-white bg-gray-700 border-0 py-2 px-5 hover:bg-gray-600"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
              <div className="flex-auto block py-8 pt-6 px-9 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center min-h-[340px]">
                    <p className="text-center text-lg font-medium text-gray-400">
                      Cargando transacciones...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full w-full min-h-[40vh] max-h-[40rem] overflow-hidden">
                    <div className="flex-grow overflow-auto min-h-[340px]">
                      <table className="w-full align-middle text-white border-neutral-700">
                        <thead className="border-b border-gray-700">
                          <tr className="font-semibold text-[0.95rem] text-gray-400">
                            <th className="pb-3 text-start min-w-[175px] text-xl">
                              ITEM
                            </th>
                            <th className="pb-3 text-end min-w-[100px] text-xl">
                              Precio
                            </th>
                            <th className="pb-3 text-end min-w-[100px] text-xl">
                              Moneda
                            </th>
                            <th className="pb-3 text-end min-w-[100px] text-xl">
                              PROGRESS
                            </th>
                            <th className="pb-3 pr-12 text-end min-w-[175px] text-xl">
                              STATUS
                            </th>
                            <th className="pb-3 pr-12 text-end min-w-[100px] text-xl">
                              DATE
                            </th>
                            <th className="pb-3 text-end min-w-[50px] text-xl">
                              DETAILS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr
                              key={transaction.id}
                              className="border-b border-dashed border-gray-700 last:border-b-0"
                            >
                              <td className="p-3 pl-0 select-none">
                                <div className="flex items-center">
                                  <div className="relative inline-block shrink-0 rounded-2xl mr-3">
                                    <img
                                      src={transaction.logo}
                                      width="80"
                                      height="50"
                                      className="inline-block shrink-0 rounded-2xl object-cover"
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex flex-col justify-start">
                                    <a
                                      href="#"
                                      className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg text-gray-200 hover:text-primary"
                                    >
                                      {transaction.product_name}
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 pr-0 text-end text-xl text-gray-300 ">
                                {transaction.price}
                              </td>
                              <td className="p-3 pr-0 text-end text-sm text-gray-300">
                                {transaction.currency}
                              </td>
                              <td className="p-3 pr-0 text-end">
                                <span className="text-center text-sm inline-flex px-2 py-1 font-semibold  text-green-400 bg-green-900 rounded-lg">
                                  {transaction.progress}%
                                </span>
                              </td>
                              <td className="p-3 pr-12 text-end">
                                <span className="text-sm text-center inline-flex px-4 py-3 font-semibold text-[.95rem] text-blue-400 bg-blue-900 rounded-lg">
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="pr-0 text-end text-sm text-gray-300 ">
                                {transaction.date}
                              </td>
                              <td className="p-3 pr-0 text-end">
                                <button className="ml-auto text-gray-300 bg-gray-700 hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium text-center rounded-2xl transition-colors duration-200 shadow-none justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center items-center mt-10">
                      <ReactPaginate
                        previousLabel="Anterior"
                        nextLabel="Siguiente"
                        pageCount={Math.ceil(
                          totalTransactions / ITEMS_PER_PAGE
                        )}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex space-x-2"}
                        pageLinkClassName={
                          "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                        }
                        previousLinkClassName={
                          "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                        }
                        nextLinkClassName={
                          "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                        }
                        forcePage={currentPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
