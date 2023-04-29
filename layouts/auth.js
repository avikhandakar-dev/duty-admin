import AuthContext from "@lib/authContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const AuthLayout = ({ children }) => {
  const { user, authenticating } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const redirect = () => {
      if (authenticating || !user) return;
      if (user) {
        return router.replace("/");
      }
    };
    redirect();
  }, [user, authenticating]);

  return <>{children}</>;
};

export default AuthLayout;
