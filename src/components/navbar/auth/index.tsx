import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../style.css";
import { UserModel, useUserContext } from "@/context/UserContext";
import DropDown from "../dropdown";
import LoadingSpinner from "@/components/loading-spinner";

const Auth = () => {
  const { user, setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    setIsLoggedIn(user.logged_in);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="nav-auth relative">
      {" "}
      {/* Agrega la clase relative para establecer posición relativa */}
      {!isLoggedIn && (
        <Link className="nav-auth-category" href="/login">
          Ingresa
        </Link>
      )}
      {isLoggedIn && (
        <Link className="nav-auth-category" href="/purchases">
          Mis Compras
        </Link>
      )}
      {isLoggedIn && (
        <Link className="nav-auth-category" href="/purchases">
          Otros
        </Link>
      )}
      <button className="nav-auth-category" onClick={toggleDropdown}>
        {isLoggedIn ? (
          <div className="w-12 h-12 rounded-full overflow-hidden ">
            <img
              src={"https://i.pravatar.cc/200"}
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <Link className="nav-auth-category" href="/register">
            Crea tu cuenta
          </Link>
        )}
      </button>
      {showDropdown && (
        <div className="absolute top-full mt-2 right-0">
          {" "}
          {/* Ajusta el posicionamiento a right-0 */}
          <DropDown />
        </div>
      )}
    </nav>
  );
};

export default Auth;
