import { FiChevronLeft } from "react-icons/fi";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate()
  const { cartData, loading , error } = useCart();

  console.log(cartData);
  console.log(loading);
  console.log(error);

  if (cartData.length !== 0) {
      return (
        <div className="h-100 w-full flex flex-col gap-4 justify-center items-center  text-3xl font-semibold text-black/50 ">
          <p>Cart Khali hai </p>
            <button
                  onClick={()=>navigate(-1)}
                    className=" flex gap-3 justify-center items-center text-xl bg-slate-900 text-white p-2 pr-4">
                    <FiChevronLeft size={24}/>
                    <p>Back</p>
                  </button>
        </div>
      );
  }
  return (
    <div>
      <Breadcrumb />
      <div className="flex flex-col md:flex-row gap-2 py-8">
        <div className="flex-2 border flex flex-col">
          <p className=" uppercase font-bold p-3">Cart Products</p>
        </div>
        <div className="flex-1 flex flex-col bg-gray-400 p-2 ">
          <button className="fixed md:static bottom-0 left-0 right-0  bg-gray-500 md:bg-transparent w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
