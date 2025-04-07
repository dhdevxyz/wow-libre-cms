"use client";

import { getPlanAcquisition } from "@/api/home";
import { useUserContext } from "@/context/UserContext";
import { PlansAcquisition } from "@/model/model";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PricingPlans() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<PlansAcquisition[]>();
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getPlans = await getPlanAcquisition(user.language);
        setPlans(getPlans);
        setLoading(false);
      } catch (error: any) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <section className="py-12 contenedor mx-auto">
        <div className="flex justify-center items-center h-screen">
          <svg
            className="animate-spin h-10 w-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8.009 8.009 0 0 1 12 20Z"
            />
          </svg>
        </div>
      </section>
    );
  }

  if (error || !plans) {
    return null;
  }

  return (
    <section className="py-12 contenedor mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
          {t("plans-and-pricing.title")}
        </h1>
        <p className="mt-4 text-2xl text-gray-400">
          {t("plans-and-pricing.description")}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12 px-4 ${
          plans.length < 4 ? "justify-center" : ""
        } flex flex-wrap`}
      >
        {plans?.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col h-full"
          >
            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-4 text-gray-400 text-xl">{plan.description}</p>
            <div className="my-8">
              <span className="text-5xl font-extrabold text-white">
                {plan.price}
              </span>
            </div>
            <ul className="mb-8 space-y-2 text-xl text-gray-400 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={plan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 mt-auto"
            >
              {plan.button_text}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
