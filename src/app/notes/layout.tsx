import React from "react";
import Nav from "./components/Nav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex ">
        <Nav />
        {children}
      </div>
    </>
  );
};

export default layout;
