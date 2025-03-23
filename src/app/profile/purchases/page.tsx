"use client";
import React, { useEffect, useState } from "react";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { getTransactions } from "@/api/transactions";
import Cookies from "js-cookie";
import { Transaction } from "@/model/model";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "@/components/utilities/loading-spinner";

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
      <div className="p-6 overflow-hidden flex flex-col h-full">
        {loading ? (
          <div className="overflow-auto max-h-[40rem] flex-grow min-h-[500px] table-container">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="overflow-auto max-h-[40rem] flex-grow min-h-[500px] table-container">
            <table className="w-full text-white border-gray-700">
              <thead className="border-b border-gray-700 text-gray-400 text-lg">
                <tr>
                  <th className="pb-3 text-center">ITEM</th>
                  <th className="pb-3 text-center">Nombre</th>
                  <th className="pb-3 text-center">Precio</th>
                  <th className="pb-3 text-center">Moneda</th>
                  <th className="pb-3 text-center">PROGRESS</th>
                  <th className="pb-3 text-center">STATUS</th>
                  <th className="pb-3 text-center">DATE</th>
                  <th className="pb-3 text-center">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-dashed border-gray-700 last:border-b-0"
                  >
                    <td className="p-3 flex items-center justify-center">
                      <img
                        src={transaction.logo}
                        alt=""
                        className="w-24 h-16 rounded-lg object-cover mr-3"
                      />
                    </td>
                    <td className="p-3 text-center text-gray-300">
                      {transaction.product_name}
                    </td>
                    <td className="p-3 text-center text-gray-300">
                      {Math.floor(transaction.price)}
                    </td>
                    <td className="p-3 text-center text-gray-300">
                      {transaction.currency}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 text-sm font-semibold text-green-400 bg-green-900 rounded-lg">
                        {transaction.progress}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-4 py-2 text-sm font-semibold text-blue-400 bg-blue-900 rounded-lg">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-300">
                      {transaction.date}
                    </td>
                    <td className="p-3 text-center">
                      <button className="text-gray-300 bg-gray-700 hover:text-primary p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
        )}
        <div className="flex justify-center items-center mt-auto pb-4">
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Siguiente"
            pageCount={Math.ceil(totalTransactions / ITEMS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="pagination flex space-x-2"
            pageLinkClassName="text-white px-3 py-2 rounded-lg hover:bg-gray-600"
            previousLinkClassName="text-white px-3 py-2 rounded-lg hover:bg-gray-600"
            nextLinkClassName="text-white px-3 py-2 rounded-lg hover:bg-gray-600"
            forcePage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Purchases;
