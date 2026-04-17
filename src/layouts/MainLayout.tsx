// import React, { use } from 'react'
import { Outlet } from "react-router-dom";
import TopBar from "../shared/components/TopBar"
import Header from "../shared/components/Header";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
     <TopBar/>
     <Header/>
      <main className="">
      {/* lorem3000 */}
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default MainLayout;
