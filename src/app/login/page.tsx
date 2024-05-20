"use client";

import React, { ChangeEvent, useState } from "react";
import "./style.css";
import Link from "next/link";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {};

  return (
    <div className="login-page">
      <div className="login-banner">
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbe1582ef1691da64/653ad22f23ad6fdfc530381c/WoW_11.0_PreSaleSupportAssets_Bnet_CheckoutThumbnail_960x540_B06.png?imwidth=1920&imdensity=2.625"
          alt="Banner"
        />
      </div>
      <div className="login-form">
        <div className="login-form-btn-back text-xl md:text-4xl lg:text-5xl xl:text-5xl">
          <a href="/">X</a>
        </div>
        <div className="login-form-section-primary">
          <h2 className="text-lg md:text-6xl lg:text-6xl xl:text-6xl">
            Iniciar sesión
          </h2>
        </div>
        <div className="login-form-section-register">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username" className="mb-2">
              Ingresa tu username
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleUserNameChange}
            />
            <label htmlFor="password" className="mb-2">
              Ingresa tu Password
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 login-form-section-register-buttom"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="login-form-section-question mt-2">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link className="register-link" href="/register">
                Crea tu cuenta
              </Link>
            </p>
            <p>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
          <div className="login-form-section-footer pt-2">
            <div className="mt-28 text-xl md:text-1xl lg:text-2xl xl:text-2xl">
              <p>
                World of Warcraft® and Blizzard Entertainment® are all
                trademarks or registered trademarks of Blizzard Entertainment in
                the United States and/or other countries. These terms and all
                related materials, logos, and images are copyright © Blizzard
                Entertainment. This site is in no way associated with or
                endorsed by Blizzard Entertainment®.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
