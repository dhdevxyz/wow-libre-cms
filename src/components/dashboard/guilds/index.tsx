"use client";

import React, { useEffect, useState } from "react";

interface Guild {
  id: number;
  name: string;
  description: string;
  members: number;
}

const GuildsDashboard: React.FC = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);

  // Mock guilds data
  const fetchGuilds = async () => {
    const mockData: Guild[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Guild ${i + 1}`,
      description: `Description for Guild ${i + 1}`,
      members: 20 + i * 2,
    }));

    const filteredData = mockData.filter((guild) =>
      guild.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setGuilds(paginatedData);
    setTotalElements(filteredData.length);
  };

  useEffect(() => {
    fetchGuilds();
  }, [searchTerm, currentPage, itemsPerPage]);

  const totalPages =
    totalElements && itemsPerPage ? Math.ceil(totalElements / itemsPerPage) : 0;

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-extrabold mb-6 text-blue-400">
        Guilds
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search guilds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto"
        style={{ height: "400px", overflowY: "auto" }}
      >
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Members</th>
            </tr>
          </thead>
          <tbody>
            {guilds.map((guild, index) => (
              <tr
                key={guild.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                <td className="px-4 py-2 border-b border-gray-600">
                  {guild.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {guild.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {guild.description}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {guild.members}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">
            Show:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-2 py-1 rounded bg-gray-800 text-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalPages === 0}
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {totalPages > 0 ? currentPage : 0} of{" "}
            {totalPages > 0 ? totalPages : 0}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuildsDashboard;
