/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from "@/redux/api/appSlice";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import GetPremiumAccess from "./GetPremiumAccess";
import NotEligble from "./NotEligble";
const PremiumAccess = () => {
  const [isCapable, setIsCapable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkCapable = async () => {
      const url = baseUrl + "/user/can-have-premium";
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setIsCapable(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkCapable();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{isCapable ? <GetPremiumAccess /> : <NotEligble />}</div>;
};

export default PremiumAccess;