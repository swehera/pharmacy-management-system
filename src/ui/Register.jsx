"use client";

import { API_BASE_URL } from "@/utils/apiConfig";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginPageImage, siteLogo } from "../../public/images";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [store_name, setStore_Name] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          store_name: store_name,
          phone: phone,
          pin: pin,
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[95vh] grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white/45 w-full p-5 flex items-center justify-center">
        <div className="w-full md:w-[80%]">
          <div>
            <Image src={siteLogo} alt="site-logo" width={300} height={300} />
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="font-semibold text-gray-800 my-2">Create Account</p>
            <div>
              {/* input fields here */}
              <div className="flex flex-col gap-y-2">
                <div className="w-full flex flex-col gap-y-2">
                  <label className="text-sm text-gray-800">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="px-3 py-1 border-[0.5px] border-gray-800 bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label className="text-sm text-gray-800">Store Name</label>
                  <input
                    type="text"
                    value={store_name}
                    onChange={(e) => setStore_Name(e.target.value)}
                    placeholder="Store Name"
                    className="px-3 py-1 border-[0.5px] border-gray-800 bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label className="text-sm text-gray-800">Phone number</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="px-3 py-1 border-[0.5px] border-gray-800 bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label className="text-sm text-gray-800">6 DIGIT PIN</label>
                  <input
                    type="number"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="6 DIGIT PIN"
                    className="px-3 py-1 border-[0.5px] border-gray-800 bg-white/45 text-gray-600 outline-none"
                  />
                </div>
                {/* create account button section here */}
                <div className="my-3">
                  <button
                    onClick={handleCreateAccount}
                    className="px-4 py-1 rounded-sm bg-[#1D3471] text-sm text-white"
                  >
                    Create account
                  </button>
                </div>
                {/* I don't have any account */}
                <div>
                  <p className="text-gray-800 text-sm">
                    I don&apos;t have any account{" "}
                    <Link
                      href={"/login"}
                      className="underline font-semibold cursor-pointer"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-full  hidden md:block">
        <Image
          src={loginPageImage}
          alt="pharma-assistant"
          width={2000}
          height={3000}
          className=" w-full h-full"
        />
      </div>
    </div>
  );
};

export default Register;
