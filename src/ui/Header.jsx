"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Optional
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [dateTime, setDateTime] = useState({
    date: format(new Date(), "PPPP"), // Format: "Today, July 6, 2024"
    time: format(new Date(), "p"), // Format: "5:45 PM"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime({
        date: format(new Date(), "PPPP"),
        time: format(new Date(), "p"),
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full mt-5 mb-3 flex items-center justify-between">
      <div>
        <p className="text-2xl text-white">Hi, {userInfo?.name}</p>
        <p className="text-sm text-white">{dateTime.date}</p>
      </div>
      <div>
        <p className="text-3xl text-white">{dateTime.time}</p>
      </div>
    </div>
  );
};

export default Header;
