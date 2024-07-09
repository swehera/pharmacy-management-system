"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CheckLayout = ({ children }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo || Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, [userInfo, router]);

  return <div>{children}</div>;
};

export default CheckLayout;
