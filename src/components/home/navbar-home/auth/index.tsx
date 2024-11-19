import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDown from "../dropdown";
import "../style.css";

const NavbarAuth = () => {
  const { t } = useTranslation();
  const { user, clearUserData } = useUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jwt = Cookies.get("token");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setIsLoggedIn(user.logged_in && jwt != null);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="nav-auth relative">
      {!isLoggedIn && (
        <>
          <Link className="nav-auth-category font-serif" href="/login">
            {t("navbar.sections.position-six")}
          </Link>
          <Link className="nav-auth-category font-serif" href="/register">
            {t("navbar.sections.position-seven")}
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link
            className="nav-auth-category font-serif"
            href="/profile/purchases"
          >
            {t("navbar.sections.position-eight")}
          </Link>
          <Link
            className="nav-auth-category font-serif"
            href="https://t.me/wowlibreservers/129"
          >
            {t("navbar.sections.position-nine")}
          </Link>

          <button className="nav-auth-category" onClick={toggleDropdown}>
            <div className="w-10 h-10 rounded-full overflow-hidden ">
              <img
                src={user.avatar}
                alt="Profile-Img"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </>
      )}

      {showDropdown && (
        <div className="absolute top-full mt-2 right-0">
          <DropDown user={user} clearUserData={clearUserData} />
        </div>
      )}
    </nav>
  );
};

export default NavbarAuth;
