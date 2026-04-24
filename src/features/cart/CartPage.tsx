import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../../shared/components/Breadcrumb";
import { useCart } from "./useCart";
import { useNavigate } from "react-router-dom";
import CartProductCard from "./components/CartProductCard";
import { useMemo } from "react";

const SHIPPING_CHARGE = 100;
function CartPage() {
  const navigate = useNavigate();
  const { cartData, loading, cartClear } = useCart();

  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cartData],
  );

  const grandTotal = totalPrice + SHIPPING_CHARGE;

  // console.log(grand  Total);

  if (loading) {
    return (
      <div className="h-100 w-full flex flex-col gap-4 justify-center items-center  text-3xl font-semibold text-black/50 ">
        <p>
          Loading your cart...
        </p>
      </div>
    );
  }
  if (cartData.length === 0) {
    return (
      <div className="h-[60vh] w-full flex flex-col gap-6 justify-center items-center">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <FiTrash2 size={40} className="text-slate-300" />
        </div>
        <p className="text-2xl font-serif text-slate-600">Your cart is empty</p>
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 justify-center items-center text-base bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all text-white px-6 py-3 rounded-xl font-medium"
        >
          <FiChevronLeft size={20} />
          <p>Continue Shopping</p>
        </button>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row gap-2 py-8 relative">
        <div className="flex-[2]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-serif text-slate-900">
              Cart Products
            </h1>
            <button
              onClick={() => cartClear()}
              className="flex gap-2 items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <FiTrash2 size={16} />
              <p>Clear All</p>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {cartData.map((p) => {
              return (
                <CartProductCard
                  key={`${p.product.slug}-${p.sizes ?? "default"}`}
                  product={p}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-1 relative mt-8 lg:mt-0 lg:pl-8">
          <div className="sticky top-24 w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-serif text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-slate-600">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-medium text-slate-900">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-medium text-slate-900">
                  ${SHIPPING_CHARGE.toLocaleString()}
                </p>
              </div>
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="flex justify-between text-lg font-bold text-slate-900 mb-8">
              <p>Total</p>
              <p>${grandTotal.toLocaleString()}</p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white rounded-xl font-semibold flex justify-center items-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
