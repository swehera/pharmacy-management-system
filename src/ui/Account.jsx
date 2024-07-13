"use client";

import { useSelector } from "react-redux";
import Container from "./Container";

const Account = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log("This is user info", userInfo);
  return (
    <Container>
      <div className=" bg-white w-full rounded-md p-4">
        <p className=" text-sm font-semibold">
          <span className=" text-[#1D3471]">Store Name:</span>{" "}
          {userInfo?.store_name}
        </p>
        <p className=" text-sm font-semibold">
          <span className=" text-[#1D3471]">Account Holder Name:</span>{" "}
          {userInfo?.name}
        </p>
        <p className=" text-sm font-semibold">
          <span className=" text-[#1D3471]">Phone:</span> {userInfo?.phone}
        </p>
        <p className=" text-sm font-semibold">
          <span className=" text-[#1D3471]">PIN:</span> {userInfo?.pin}
        </p>
      </div>
    </Container>
  );
};

export default Account;
