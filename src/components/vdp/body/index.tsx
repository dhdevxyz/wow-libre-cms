import React from "react";

const VdpBody = ({
  serverData,
  t,
  serverName,
  youtubeUrl,
}: {
  serverData: { [key: string]: string };
  t: (key: string, options?: any) => string;
  serverName: string;
  youtubeUrl: string;
}) => {
  return (
    <section className="contenedor relative pt-12 text-white mb-10 mt-10">
      <div className="items-center flex flex-wrap">
        <div className="w-full md:w-8/12 ml-auto mr-auto px-4 flex justify-center  rounded-md">
          <iframe
            width="800"
            height="350"
            src={
              youtubeUrl ||
              "https://www.youtube.com/embed/sxPji1VlsU0?si=EPa0DkocLJ-Nurx2"
            }
            title="World of Warcraft: Battle for Azeroth Cinematic Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
          <div className="md:pr-12">
            <div className="text-yellow-400 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-yellow-600 mt-8">
              <i className="fas fa-rocket text-xl"></i>
            </div>
            <h3 className="text-3xl font-semibold text-yellow-400">
              {serverName.toUpperCase()}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              {t("vdp-server.body.title")}
            </p>

            {/* Renderizando dinámicamente los datos del servidor */}
            <ul className="list-none mt-6">
              {Object.entries(serverData).map(([key, value], index) => (
                <li key={index} className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-2 px-2 uppercase rounded-full text-yellow-400 bg-yellow-600 mr-3">
                        <i className="fas fa-check-circle"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-300 text-lg">
                        {key}: <span className="text-yellow-400">{value}</span>
                      </h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VdpBody;
