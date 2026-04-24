import type { CartData } from "../cartTypes";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../useCart";

function CartProductCard({ product }: { product: CartData }) {
  const { handleDecrement, handleIncrement, removeItemFromCartFn } = useCart({
    autoFetch: false,
  });
  const singleProductToTal = product.quantity * product.product.price;

  return (
    <div className="group p-4 flex flex-col lg:flex-row gap-4 lg:items-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="flex gap-3">
        <Link
          to={`/products/${product.product.slug}`}
          className="h-20 w-20 rounded-xl overflow-hidden bg-slate-50 shrink-0"
        >
          <img
            src={product.product.images[0]}
            alt=""
            className="object-cover h-full w-full"
          />
        </Link>
        <div>
          <p className="capitalize text-xl  line-clamp-1">
            {product.product?.title ?? "Title"}
          </p>
          <p className="capitalize">{product.sizes ?? "N/A"}</p>
          <div className="flex gap-4">
            <div className="flex items-center">
              ${product.product.price}
              <FiX /> {product.quantity}
            </div>
            <p className="text-xl flex-1  ">= ${singleProductToTal}</p>
          </div>
        </div>
      </div>
      <div className=" flex-1 flex  flex-col items-end  justify-end  transition-all duration-300   ">
        <div className="flex gap-2 py-4">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() =>
                handleDecrement(product.product.slug, product.sizes)
              }
              className="w-8 h-8 rounded-md bg-white text-slate-800 flex justify-center items-center hover:shadow-sm transition-all active:scale-95"
            >
              <FiMinus size={14} />
            </button>
            <input
              type="number"
              value={product.quantity}
              className="w-12 bg-transparent text-center font-medium outline-none"
              readOnly
            />
            <button
              type="button"
              onClick={() =>
                handleIncrement(product.product.slug, product.sizes)
              }
              className="w-8 h-8 rounded-md bg-white text-slate-800 flex justify-center items-center hover:shadow-sm transition-all active:scale-95"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>
        <button
          onClick={() =>
            removeItemFromCartFn(product.product.slug, product.sizes)
          }
          className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartProductCard;
