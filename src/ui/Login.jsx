"use client";

import { saveUser } from "@/redux/userSlice";
import { API_BASE_URL } from "@/utils/apiConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          pin: pin,
        }),
      });
      const data = await response.json();

      console.log("login page data", data);
      dispatch(saveUser(data?.loggedData));
      router.push("/");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
    // const loggedData = {
    //   phone: phone,
    //   pin: pin,
    // };
  };

  console.log("userInfo", userInfo);
  return (
    <div className="w-full min-h-[95vh] grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white/45 w-full p-5 flex items-center justify-center">
        <div className="w-full md:w-[80%]">
          <div>
            <p className="text-2xl font-medium text-[#1D3471]">
              HeraTech Software
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="font-semibold text-gray-800 my-2">Login</p>
            <div>
              {/* input fields here */}
              <div className="flex flex-col gap-y-2">
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
                {/* login button section here */}
                <div className="my-3">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-1 rounded-sm bg-[#1D3471] text-sm text-white"
                  >
                    Login
                  </button>
                </div>
                {/* I don't have any account */}
                <div>
                  <p className="text-gray-800 text-sm">
                    I don&apos;t have any account{" "}
                    <Link
                      href={"/register"}
                      className="underline font-semibold cursor-pointer"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 w-full hidden md:block">
        <p>Image side</p>
      </div>
    </div>
  );
};

export default Login;
