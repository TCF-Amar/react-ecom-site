// import React, { use } from 'react'
import { Outlet } from "react-router-dom";
import TopBar from "../shared/components/TopBar"
import Header from "../shared/components/Header";

function MainLayout() {
  return (
    <div className="min flex flex-col bg-slate-50 font-sans text-slate-900 ">
      <TopBar />
      <Header />
      <main className="m-auto flex flex-col w-full px-4 py-8 md:w-[70vw] justify-start h-full ">
        <Outlet />
      </main>
      <footer className="-100"></footer>
    </div>
  );
}

export default MainLayout;
