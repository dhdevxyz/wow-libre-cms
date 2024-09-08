import { useUserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UseAuthRedirect = () => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const jwt = Cookies.get("token");
    if (user.logged_in && jwt != null) {
      router.push("/accounts");
    }
  }, [user, router]);
};

export default UseAuthRedirect;
