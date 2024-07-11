import React, { useState } from "react";
import Container from "./Container";
import { BiSolidDashboard } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import { FaBoxOpen } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";
import Link from "next/link";

const MobileHeader = () => {
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
  return (
    <Container className=" block md:hidden w-full bg-blue-700/45 my-3">
      <div className=" grid grid-cols-3 gap-2">
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <BiSolidDashboard className=" text-white text-2xl" />
          <Link
            href={"/"}
            onClick={DashboardActice}
            className={` w-full py-1 text-sm text-center ${
              dashboard || pathname === "/"
                ? "bg-[#001039] text-white"
                : " text-white hover:bg-[#001039] duration-300"
            }   `}
          >
            Dashboard
          </Link>
        </div>
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <TiShoppingCart className=" text-white text-2xl" />
          <Link
            href={"/sell"}
            onClick={SellActice}
            className={` w-full py-1 text-sm text-center ${
              sell && pathname === "/sell"
                ? "bg-[#001039] text-white"
                : " text-white hover:bg-[#001039] duration-300"
            }   `}
          >
            Sell
          </Link>
        </div>
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <FaBoxOpen className=" text-white text-2xl" />
          <Link
            href={"/product"}
            onClick={ProductActice}
            className={` w-full py-1 text-sm text-center ${
              product && pathname === "/product"
                ? "bg-[#001039] text-white"
                : " text-white hover:bg-[#001039] duration-300"
            }   `}
          >
            Product
          </Link>
        </div>
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <TbReportSearch className=" text-white text-2xl" />
          <Link
            href={"/reports"}
            onClick={ReportsActice}
            className={` w-full py-1 text-sm text-center ${
              reports && pathname === "/reports"
                ? "bg-[#001039] text-white"
                : "text-white hover:bg-[#001039] duration-300"
            }   `}
          >
            Reports
          </Link>
        </div>
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <MdAccountBox className=" text-white text-2xl" />
          <Link
            href={"/account"}
            onClick={AccountActice}
            className={` w-full py-1 text-sm text-center ${
              account && pathname === "/account"
                ? "bg-[#001039] text-white"
                : " text-white hover:bg-[#001039] duration-300"
            }   `}
          >
            Account
          </Link>
        </div>
        <div className={` flex flex-col gap-y-1 items-center justify-center`}>
          <IoMdLogOut className=" text-red-500 text-2xl" />
          <button
            onClick={handleLogout}
            className="  py-1 w-full text-red-400 font-bold text-sm"
          >
            LogOut
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MobileHeader;
