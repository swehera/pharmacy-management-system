"use client";

import { removeUser } from "@/redux/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { siteLogo } from "../../public/images";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dashboard, setDashboard] = useState(true);
  const [sell, setSell] = useState(false);
  const [product, setProduct] = useState(false);
  const [reports, setReports] = useState(false);
  const [account, setAccount] = useState(false);

  const dispatch = useDispatch();

  const DashboardActice = () => {
    setDashboard(true);
    setSell(false);
    setProduct(false);
    setReports(false);
    setAccount(false);
  };
  const SellActice = () => {
    setDashboard(false);
    setSell(true);
    setProduct(false);
    setReports(false);
    setAccount(false);
  };
  const ProductActice = () => {
    setDashboard(false);
    setSell(false);
    setProduct(true);
    setReports(false);
    setAccount(false);
  };
  const ReportsActice = () => {
    setDashboard(false);
    setSell(false);
    setProduct(false);
    setReports(true);
    setAccount(false);
  };
  const AccountActice = () => {
    setDashboard(false);
    setSell(false);
    setProduct(false);
    setReports(false);
    setAccount(true);
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    dispatch(removeUser());
    router.push("/login");
  };

  console.log("pathname", pathname);
  return (
    <div
      className={` bg-white w-[18%] h-[95vh]   fixed top-0 my-6 overflow-auto hidden md:block rounded-md scrollbar-hide`}
    >
      {/* our logo */}
      <Link
        href={"/"}
        className=" flex flex-col items-center justify-center text-3xl font-semibold text-[#1D3471] my-6"
      >
        {/* <div>
          <p>Farma</p>
        </div>
        <div>
          <p>BD</p>
        </div> */}
        <div>
          <Image src={siteLogo} alt="site-logo" width={150} height={150} />
        </div>
      </Link>

      {/* side menu section work */}
      <div className=" flex flex-col gap-y-3">
        <Link
          href={"/"}
          onClick={DashboardActice}
          className={` w-full py-1 text-sm text-center ${
            dashboard || pathname === "/"
              ? "bg-[#001039] text-white"
              : " hover:text-white hover:bg-[#001039] duration-300"
          }   `}
        >
          Dashboard
        </Link>
        <Link
          href={"/sell"}
          onClick={SellActice}
          className={` w-full py-1 text-sm text-center ${
            sell && pathname === "/sell"
              ? "bg-[#001039] text-white"
              : " hover:text-white hover:bg-[#001039] duration-300"
          }   `}
        >
          Sell
        </Link>
        <Link
          href={"/product"}
          onClick={ProductActice}
          className={` w-full py-1 text-sm text-center ${
            product && pathname === "/product"
              ? "bg-[#001039] text-white"
              : " hover:text-white hover:bg-[#001039] duration-300"
          }   `}
        >
          Product
        </Link>
        <Link
          href={"/reports"}
          onClick={ReportsActice}
          className={` w-full py-1 text-sm text-center ${
            reports && pathname === "/reports"
              ? "bg-[#001039] text-white"
              : " hover:text-white hover:bg-[#001039] duration-300"
          }   `}
        >
          Reports
        </Link>
        <Link
          href={"/account"}
          onClick={AccountActice}
          className={` w-full py-1 text-sm text-center ${
            account && pathname === "/account"
              ? "bg-[#001039] text-white"
              : " hover:text-white hover:bg-[#001039] duration-300"
          }   `}
        >
          Account
        </Link>
      </div>

      {/* logout button here */}
      <div className=" relative top-48 ">
        <button
          onClick={handleLogout}
          className=" bg-[#FF3030] py-1 w-full text-white font-bold text-sm"
        >
          Logout
        </button>
      </div>

      {/* developer information */}
      <div className=" flex items-center justify-center relative top-[194px]">
        <p className=" text-sm">Develop By Hira V 0.1.0.</p>
      </div>
    </div>
  );
};

export default Sidebar;
