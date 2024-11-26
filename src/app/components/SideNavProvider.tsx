import React from "react";
import SideNav from "./SideNav";

interface props {
  children: React.ReactNode;
}

export default function SideNavProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen w-[100vw]">
      <SideNav />
      <div className="grow h-full w-full min-h-screen px-12 py-8">
        {children}
      </div>
    </div>
  );
}
