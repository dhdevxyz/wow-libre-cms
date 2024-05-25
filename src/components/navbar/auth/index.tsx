import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../style.css";
import { useUserContext } from "@/context/UserContext";

const Auth = () => {
  const { user, setUser } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user.logged_in);
  }, []);

  const loggedInLink = isLoggedIn ? "/profile" : "/register";
  const linkText = isLoggedIn ? "Mi Perfil" : "Crea tu cuenta";

  return (
    <nav className="nav-auth">
      <Link className="nav-auth-category" href={loggedInLink}>
        {linkText}
      </Link>

      {!isLoggedIn && (
        <Link className="nav-auth-category" href="/login">
          Ingresa
        </Link>
      )}

      {isLoggedIn && (
        <Link className="nav-auth-category" href="/login">
          Mis Compras
        </Link>
      )}
    </nav>
  );
};

export default Auth;
