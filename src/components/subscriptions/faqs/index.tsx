import { getFaqsSubscription } from "@/api/subscriptions";
import { FaqsSubscriptionsDto } from "@/model/model";
import React, { useEffect, useState } from "react";

interface FaqsSubscriptionsProps {
  language: string;
}

const FaqsSubscriptions: React.FC<FaqsSubscriptionsProps> = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState<FaqsSubscriptionsDto[]>();
  const [loading, setLoading] = useState(true);

  const toggleAnswer = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqsSubscription(language);
        setFaqs(data);
      } catch (err) {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [language]);

  return (
    <div className="contenedor">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <h2 className="text-3xl font-bold text-start text-white mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          {!loading &&
            faqs?.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="flex justify-between items-center w-full text-left text-xl font-bold text-white"
                >
                  <span className="text-xl">{faq.question}</span>
                  <span className=" text-white">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="mt-2 text-gray-300 text-lg">{faq.answer}</div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FaqsSubscriptions;
