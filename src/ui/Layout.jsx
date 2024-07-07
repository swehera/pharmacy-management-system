"use client";

import Container from "./Container";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Container className=" flex justify-between gap-10">
        <div className=" hidden md:block w-[20%]">
          <Sidebar />
        </div>

        <div className=" w-full  md:w-[80%] ">
          <Header />
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Layout;
