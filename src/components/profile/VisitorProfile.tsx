"use client";

import { handleListPins } from "@/actions/pins";
import { Pin } from "@/types/pin";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const VisitorProfile = () => {
  const access_token = getCookie("access_token") as string;
  const [data, setData] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!access_token) return;
        const res = await handleListPins(1, 10, access_token);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [access_token]);
  console.log({ data }, "visitor");
  return <div></div>;
};

export default VisitorProfile;
