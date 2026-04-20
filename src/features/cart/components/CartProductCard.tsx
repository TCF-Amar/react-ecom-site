import type { CartData } from "../types";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function CartProductCard({ product }: { product: CartData }) {
  const {
    handleDecrement,
    handleIncrement,
    
  } = useCart({
    autoFetch: false,
  });
  const singleProductToTal = product.quantity * product.product.price;
  

  return (
    <div className="p-2 flex flex-col lg:flex-row gap-2 lg:items-center border border-transparent  hover:border transition-all duration-300  hover:border-gray-500 shadow">
      <div className="flex gap-3">
        <Link to={`/products/${product.product.slug}`} className="h-14 w-14">
          <img
            src={product.product.images[0]}
            alt=""
            className="object-cover h-full -w-full"
          />
        </Link>
        <div>
          <p className="capitalize text-xl">
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
      <div className="flex-1 flex flex-col items-end ">
        <div className="flex gap-4 py-4">
          <button
            type="button"
            onClick={()=>handleDecrement(product.product.slug, product.sizes)}
            className="bg-slate-900 w-14 text-3xl text-white flex justify-center items-center active:bg-gray-800"
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={product.quantity}
            min={1}
            max={100}
            placeholder="0"
            className="w-25 p-3 border text-center "
            onChange={() => {}}
          />
          <button
            type="button"
            onClick={()=>handleIncrement(product.product.slug, product.sizes)}
            className="bg-slate-900 w-14 text-3xl text-white flex justify-center items-center active:bg-gray-800"
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
