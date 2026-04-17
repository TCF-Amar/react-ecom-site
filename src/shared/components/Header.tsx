import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiMenu,
} from "react-icons/fi";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { images } from "../../constants/images";

const Header: React.FC = () => {
  const { signOutUser, user, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navList: string[] = [
    "Home",
    "Collections",
    "Categories",
    "Deals",
    "Contact",
  ];

 

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl py-3`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-indigo-600  flex items-center  justify-center text-white transform group-hover:rotate-12 group-hover:scale-105 transition-transform">
            MS
          </div>
          <span className="hidden sm:block">My - Shop</span>
        </Link>

        <nav className="hidden lg:flex items-center ">
          {navList.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-[12px] font-bold transition-colors uppercase tracking-widest px-2 py-1 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-600"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-md relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-50 border-none  py-2 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none shadow-inner"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors relative">
              <FiHeart size={22} />

              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 border-2 border-white shadow-sm" />
            </button>
            <div className="relative text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group">
              <FiShoppingCart size={22} />
              <span className="absolute -top-3 -right-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 shadow-lg ring-4 ring-white transition-transform group-hover:scale-110">
                3
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-25 leading-tight">
                    {user?.displayName || "User"}
                  </p>
                  <button
                    onClick={signOutUser}
                    className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
                  >
                    Logout
                  </button>
                </div>
                <div className="w-10 h-10 bg-slate-100  flex items-center justify-center text-slate-600 border border-slate-200 overflow-hidden cursor-pointer hover:border-indigo-500 transition-all group">
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = images.defaultAvatar;
                      }}
                    />
                  ) : (
                    <FiUser
                      size={20}
                      className="group-hover:text-indigo-600 transition-colors"
                    />
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                Sign In
              </Link>
            )}

            <button
              className="lg:hidden p-2 text-slate-600 z-55"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl animate-in slide-in-from-top-4 duration-300 ">
          <div className="p-6 space-y-8">
            <div className="relative group md:hidden">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-50 border-none  py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
              />
            </div>

            <nav className="flex flex-col gap-1">
              {navList.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-lg font-bold text-slate-800 hover:text-indigo-600 py-3 border-b border-slate-50 last:border-none flex justify-between items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                  <FiSearch className="opacity-0 w-4 h-4" />{" "}
                </Link>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-4 md:hidden">
              <Link
                to={"/wishlist"}
                className="flex items-center justify-center gap-3 py-4 bg-slate-50  text-slate-900 font-bold border border-slate-100 active:scale-95 transition-all hover:scale-105"
              >
                <FiHeart size={20} /> Wishlist
              </Link>
              <Link
                to={"/profile"}
                className="flex items-center justify-center gap-3 py-4 bg-slate-50  text-slate-900 font-bold border border-slate-100 active:scale-95 transition-all hover:scale-105"
              >
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right block">
                      <p className="text-xs font-bold text-slate-900 truncate max-w-25 leading-tight">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs font-bold text-slate-900 truncate max-w-25 leading-tight">
                        {user?.email || "User"}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-slate-100  flex items-center justify-center text-slate-600 border border-slate-200 overflow-hidden cursor-pointer hover:border-indigo-500 transition-all group">
                      {user?.photoURL ? (
                        <img
                          src={user?.photoURL}
                          alt="User"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = images.defaultAvatar;
                          }}
                        />
                      ) : (
                        <FiUser
                          size={20}
                          className="group-hover:text-indigo-600 transition-colors"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                  >
                    Sign In
                  </Link>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
