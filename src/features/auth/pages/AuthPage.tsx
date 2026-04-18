import { useState } from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import { useSearchParams } from "react-router-dom";

function AuthPage() {
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") || "sign-in";
    const [showPassword, setShowPassword] = useState(false);
  
  const togglePass = () => setShowPassword(!showPassword);

  const renderContent = () => {
    if (mode === "sign-up") {
      return (
        <RegisterComponent
          setParams={setParams}
          showPassword={showPassword}
          togglePass={togglePass}
        />
      );
    }

    return <LoginComponent setParams={setParams} showPassword={showPassword} togglePass={togglePass} />;
  };

  return (
    <div className="flex h-screen font-sans bg-white transition-all duration-500 ease-in-out">
      <div className="hidden lg:flex lg:flex-col lg:justify-end flex-1 bg-cover object-cover bg-center relative p-16  bg-[url(https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop)]">
        {/* <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop"
          alt=""
        /> */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/5"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-[3rem] font-bold mb-4 leading-[1.1] tracking-tight">
            Welcome to MyShop
          </h2>
          <p className="text-lg text-slate-300 max-w-[90%] leading-relaxed">
            Main Halku hu re. Ja re halku bahar ja kar kaam kar ghar baithke
            bas khana khata hai rahata hai. Kuchh kaam Dhaam kar bas pade rahata
            hai.
          </p>
        </div>
      </div>
      <div className="h-screen overflow-hidden overflow-y-auto flex  items-start w-full lg:w-[40vw] hide-scroll">
        {renderContent()}
      </div>
    </div>
  );
}

export default AuthPage;
