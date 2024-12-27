"use client";

import { getFaqs } from "@/api/faqs";
import NavbarMinimalist from "@/components/navbar-minimalist";
import MeetTheTeam from "@/components/team";
import { useUserContext } from "@/context/UserContext";
import { FaqsModel } from "@/model/model";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const faqsDefault: FaqsModel[] = [
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
  {
    question: "How can I pay for my appointment?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
  },
];

const Help: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqsModel[]>([]);
  const { user } = useUserContext();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: FaqsModel[] = await getFaqs(user.language);
        setFaqs(response);
      } catch (error) {
        setFaqs(faqsDefault);
      }
    };

    fetchData();
  }, []);

  const [visibleAnswers, setVisibleAnswers] = useState<boolean[]>(
    Array(faqs.length).fill(false)
  );

  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prevVisibleAnswers) => {
      const updatedVisibleAnswers = [...prevVisibleAnswers];
      updatedVisibleAnswers[index] = !updatedVisibleAnswers[index];
      return updatedVisibleAnswers;
    });
  };

  return (
    <div>
      <div className="contenedor">
        <NavbarMinimalist />
      </div>

      <div className="mt-10">
        <section
          id="features"
          className="container mx-auto px-4 space-y-6   py-8 md:py-12 lg:py-20"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-white">
              {t("support.title")}
            </h2>
            <p className="max-w-[80%] leading-normal text-muted-foreground sm:text-xl sm:leading-9 text-gray-300">
              {t("support.subtitle")}
            </p>
          </div>
        </section>
      </div>
      <section className="bg-midnight text-white contenedor mt-1">
        <div className="container max-w-9xl px-10 py-10 mx-auto">
          <div className="flex flex-col">
            <div className="w-full mb-6 rounded-2xl select-none">
              <img
                src="https://static.wixstatic.com/media/5dd8a0_ebe9448aef0f42dca6116185583ed2e3~mv2.webp"
                alt="Faqs"
                className="rounded-2xl hover:shadow hover:shadow-teal-800 w-full"
              />
            </div>
            <div className="w-full">
              <h1 className="text-2xl font-semibold text-center lg:text-3xl mb-6">
                {t("support.faqs.title")}
              </h1>

              <div className="mt-1 grid grid-cols-1 gap-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-700 rounded-lg flex flex-col"
                  >
                    <button
                      className="flex items-center justify-between w-full p-8 text-base"
                      onClick={() => toggleAnswer(index)}
                    >
                      <h1 className="font-semibold text-2xl">{faq.question}</h1>
                      <span className="text-gray-400 bg-gray-700 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              visibleAnswers[index]
                                ? "M6 18L18 6M6 6l12 12"
                                : "M18 12H6"
                            }
                          />
                        </svg>
                      </span>
                    </button>
                    <hr className="border-gray-700" />
                    {visibleAnswers[index] && (
                      <p className="p-8 text-lg flex-grow">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MeetTheTeam />
      </section>
    </div>
  );
};

export default Help;
