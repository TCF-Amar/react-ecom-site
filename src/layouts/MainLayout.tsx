// import React, { use } from 'react'
import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import  { Toaster } from "react-hot-toast";
 

function MainLayout() {
  return (
    <div className="min flex flex-col bg-slate-50 font-sans text-slate-900 ">
      <Header />
      <main className="m-auto flex flex-col w-full px-4 py-8 md:w-[70vw] justify-start h-full ">
        <Outlet />
      </main>
      <footer className="-100"></footer>
      <Toaster />
    </div>
  );
}

export default MainLayout;
