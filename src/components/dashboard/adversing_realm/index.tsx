import {
  createAdvertisementById,
  getRealmAdvertisementById,
} from "@/api/realmAdvertisement";
import { UserModel } from "@/context/UserContext";
import { RealmAdvertisement } from "@/model/RealmAdvertising";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AdvertisingRealmFormProps {
  token: string;
  user: UserModel;
  realmId: number;
}

const emptyRealmAdvertisement: RealmAdvertisement = {
  id: 0,
  title: "",
  tag: "",
  sub_title: "",
  description: "",
  cta_primary: "",
  img_url: "",
  footer_disclaimer: "",
  redirect: "",
  realmlist: "",
  copy_success: false,
};

const AdvertisingRealmForm: React.FC<AdvertisingRealmFormProps> = ({
  user,
  token,
  realmId,
}) => {
  const [formData, setFormData] = useState<RealmAdvertisement>(
    emptyRealmAdvertisement
  );
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<"ES" | "EN" | "PT">("ES");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRealmAdvertisementById(
          realmId,
          language,
          token
        );
        if (response) {
          setFormData(response);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          timer: 43500,
        });
      }
    };

    fetchData();
  }, [realmId, token, language]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAdvertisementById(
        realmId,
        token,
        formData.title,
        formData.tag,
        formData.sub_title,
        formData.description,
        formData.cta_primary,
        formData.img_url,
        formData.footer_disclaimer,
        language
      );

      Swal.fire({
        title: "¡Éxito!",
        text: "Los cambios se han guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton:
            "bg-indigo-600 text-white font-semibold py-2 px-4 rounded",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "ES" | "EN" | "PT");
  };

  const getValue = (key: keyof RealmAdvertisement) =>
    String(formData[key] ?? "");

  return (
    <div className="text-gray-200 flex flex-col items-center md:p-12 space-y-12">
      {/* Vista del Reino */}
      <section className="p-5 bg-gradient-to-bl from-blue-900 via-gray-900 to-black rounded-xl w-full">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-4 md:mb-0">
                Reinos - <span className="text-indigo-500">Experiencia</span>
              </h1>

              {/* Idioma */}
              <div className="flex items-center">
                <label className="text-gray-300 font-semibold mr-2">
                  Idioma:
                </label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                >
                  <option value="ES">Español</option>
                  <option value="EN">Inglés</option>
                  <option value="PT">Portugués</option>
                </select>
              </div>
            </div>
            <p className="text-xl text-gray-300 mt-4">
              Información del reino actual
            </p>
          </div>

          <div className="flex flex-wrap items-center mb-8 rounded-xl">
            <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
              <div
                className="bg-no-repeat bg-cover bg-center h-80 rounded-xl shadow-lg overflow-hidden group"
                style={{
                  backgroundImage: `url(${formData.img_url})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-2xl font-semibold px-6 text-center">
                    {formData.footer_disclaimer}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 text-white text-center md:text-left px-4 mb-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {formData.title}{" "}
                <span className="text-indigo-500 pb-2">{formData.tag}</span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-xl mb-4">
                {formData.sub_title}
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {formData.description}
              </p>

              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href={formData.redirect}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 focus:ring-4 focus:ring-gray-600 transition">
                    {formData.cta_primary}
                  </button>
                </a>
                <button
                  className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:from-indigo-500 hover:to-indigo-700 focus:ring-4 focus:ring-indigo-600 transition"
                  onClick={() => handleCopy(formData.realmlist)}
                >
                  {copied ? "¡Copiado!" : "Realmlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de edición */}
      <section
        className="relative rounded-lg shadow-xl p-8 w-full max-w-6xl bg-gray-900 border border-transparent"
        style={{
          backgroundImage: "linear-gradient(#1f2937, #111827)",
          borderImage: "linear-gradient(to right, #6366f1, #06b6d4)",
          borderImageSlice: 1,
        }}
      >
        <h2 className="text-3xl font-extrabold text-indigo-400 mb-8 tracking-wide">
          Editor de Reino
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Etiqueta", name: "tag" },
            { label: "Subtítulo", name: "sub_title" },
            { label: "Descripción", name: "description", textarea: true },
            {
              label: "Disclaimer",
              name: "footer_disclaimer",
              textarea: true,
            },
            { label: "Imagen de fondo (URL)", name: "img_url" },
            { label: "Texto del botón principal", name: "cta_primary" },
          ].map(({ label, name, textarea }) => (
            <div key={name} className="col-span-1">
              <label
                htmlFor={name}
                className="block mb-2 font-semibold text-gray-300"
              >
                {label}
              </label>
              {textarea ? (
                <textarea
                  id={name}
                  name={name}
                  value={getValue(name as keyof RealmAdvertisement)}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700 focus:border-emerald-300 focus:outline-none transition resize-none"
                  required
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type="text"
                  value={getValue(name as keyof RealmAdvertisement)}
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700 focus:border-emerald-300 focus:outline-none transition"
                  required
                />
              )}
            </div>
          ))}

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 font-semibold py-3 rounded shadow-md focus:ring-2 focus:ring-indigo-400 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdvertisingRealmForm;
