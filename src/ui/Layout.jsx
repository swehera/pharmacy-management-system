"use client";

import { usePathname } from "next/navigation";
import Container from "./Container";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import CheckLayout from "./checkLayout";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [pathname]);
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CheckLayout>
            <Container className=" flex justify-between gap-10">
              {showSideBar && (
                <div className=" hidden md:block w-[20%]">
                  <Sidebar />
                </div>
              )}

              <div
                className={` w-full  md:w-[80%] ${
                  showSideBar === false && " w-full  md:w-full"
                } `}
              >
                {showSideBar && <Header />}

                {children}
              </div>
            </Container>
          </CheckLayout>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default Layout;
