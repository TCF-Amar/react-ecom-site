import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FiEye, FiEyeOff, FiLock, FiMail, FiShoppingBag } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, type SetURLSearchParams } from "react-router-dom";
import type { LoginRequest } from "../types/authTypes";


interface LoginProps {
  setParams: SetURLSearchParams
  showPassword: boolean
  togglePass: () => void
}
function LoginComponent({ setParams, showPassword , togglePass}: LoginProps) {
  const { signInUser, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData: LoginRequest = { email, password };
    signInUser(userData);
  };
  return (
    <div className="flex-1 flex flex-col justify-center p-8 w-full max-w-full lg:max-w-150 lg:px-16 overflow-y-auto hide-scroll ">
      <div className="w-full max-w-105 mx-auto opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 mb-12 tracking-tight">
          <div className="w-9 h-9 bg-linear-to-br from-slate-900 to-slate-700  flex items-center justify-center text-white shadow-md shadow-slate-900/15">
            <FiShoppingBag size={20} />
          </div>
          <span>MyShop</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[2.25rem] font-bold text-slate-900 mb-2 tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="text-slate-500 text-base">
            Please enter your details to sign in.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm  animate-in fade-in slide-in-from-top-2 duration-300">
            {error.code === "auth/user-not-found"
              ? "User not found"
              : "Invalid email or password"}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email address
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                id="email"
                className="w-full py-3.5 pl-12 pr-4 border border-slate-200  text-base text-slate-900 bg-slate-50 transition-all focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 placeholder:text-slate-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onError={(e) => {
                  console.log(e);
                }}
                required
              />
              <FiMail className="absolute left-4 text-slate-400 text-[1.125rem] pointer-events-none transition-colors" />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full py-3.5 pl-12 pr-4 border border-slate-200  text-base text-slate-900 bg-slate-50 transition-all focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FiLock className="absolute cursor-pointer left-4 text-slate-400 text-[1.125rem] pointer--none transition-colors" />
              <button
                type="button"
                className="absolute cursor-pointer right-4 text-slate-400 text-[1.125rem] pointer--none transition-colors"
              >
                {showPassword ? (
                  <FiEye onClick={togglePass} />
                ) : (
                  <FiEyeOff onClick={togglePass} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <Link
              to="#"
              className="text-sm text-slate-900 font-semibold hover:opacity-70 transition-opacity"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white  text-base font-semibold transition-all hover:bg-slate-800 active:translate-y-0.5 shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_6px_16px_rgba(15,23,42,0.25)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex items-center text-center my-8 text-slate-400 text-sm font-medium">
          <div className="flex-1 border-b border-slate-100"></div>
          <span className="px-4">Or continue with</span>
          <div className="flex-1 border-b border-slate-100"></div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => alert("Not implement yet")}
            className="flex-1 flex items-center justify-center gap-3 py-3.5 border border-slate-200  bg-white text-slate-700 text-[0.9375rem] font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            <FcGoogle size={20} />
            Google
          </button>
        </div>

        <div className="text-center mt-10 text-[0.9375rem] text-slate-500 flex gap-2 justify-center">
          Don't have an account?
          <p
            onClick={() => setParams({ mode: "sign-up" })}
            className="text-slate-900 font-semibold ml-1.5 hover:underline cursor-pointer"
          >
            Sign up for free
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
