import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../components/CartProductCard";
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
        <p>Ruko jara </p>
      </div>
    );
  }
  if (cartData.length === 0) {
    return (
      <div className="h-100 w-full flex flex-col gap-4 justify-center items-center  text-3xl font-semibold text-black/50 ">
        <p>Cart Khali hai </p>
        <button
          onClick={() => navigate(-1)}
          className=" flex gap-3 justify-center items-center text-xl bg-slate-900 text-white p-2 pr-4"
        >
          <FiChevronLeft size={24} />
          <p>Back</p>
        </button>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row gap-2 py-8 relative">
        <div className="flex-2 ">
          <div className="flex items-center justify-between">
            <div className=" flex flex-col">
              <p className=" uppercase font-bold p-3">Cart Products</p>
            </div>
            <button
              onClick={() => cartClear()}
              className="flex gap-2  items-center justify-center text-red-500"
            >
              <FiTrash2 />
              <p>Clear</p>
            </button>
          </div>

          <div className="flex flex-col gap-2">
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
        <div className="flex-1 flex flex-col    relative">
          <div className="sticky top-20 w-full border pt-4">
            <div className="flex justify-between px-4 ">
              <p>Price: </p>
              <p>${totalPrice}</p>
            </div>

            <div className="flex justify-between px-4">
              <p>Shipping charge: </p>
              <p>${SHIPPING_CHARGE}</p>
            </div>

            <hr />
            <div className="flex justify-between px-4 text-xl font-bold py-4">
              <p>Total : </p>
              <p>${grandTotal}</p>
            </div>
            <button onClick={()=>navigate("/checkout")} className="fixed  bottom-0 left-0 right-0  p-4  bg-slate-900 text-white  w-full lg:static">
              Checkout (${grandTotal})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
