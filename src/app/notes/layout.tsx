import React from "react";
import Nav from "../../components/Navs/Nav";
import MobileNav from "@/components/Navs/MobileNav";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex ">
        <Nav />
        <MobileNav />
        {children}
      </div>
    </>
  );
};

export default layout;
