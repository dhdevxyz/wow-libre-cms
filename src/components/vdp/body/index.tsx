import React from "react";

const VdpBody = () => {
  return (
    <section className="contenedor relative pt-12 text-white">
      <div className="items-center flex flex-wrap">
        <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
          <img
            alt="Company Growth"
            className="w-full h-auto max-w-xl rounded-lg shadow-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3mdXNvsAibDssvMLGp6irHNDB_EDfL2UFGg&s"
          />
        </div>
        <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
          <div className="md:pr-12">
            <div className="text-pink-400 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-600 mt-8">
              <i className="fas fa-rocket text-xl"></i>
            </div>
            <h3 className="text-3xl font-semibold">A growing company</h3>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              The extension comes with three pre-built pages to help you get
              started faster. You can change the text and images and you're good
              to go.
            </p>
            <ul className="list-none mt-6">
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-400 bg-pink-600 mr-3">
                      <i className="fas fa-fingerprint"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-gray-300">
                      Carefully crafted components
                    </h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-400 bg-pink-600 mr-3">
                      <i className="fab fa-html5"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-gray-300">Amazing page examples</h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-400 bg-pink-600 mr-3">
                      <i className="far fa-paper-plane"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-gray-300">Dynamic components</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-500 font-semibold py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="text-gray-400 hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Notus JS
                </a>{" "}
                by
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-400 hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default VdpBody;
