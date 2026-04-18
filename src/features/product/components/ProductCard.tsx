import React from "react";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import type { Product } from "../types";
import { images } from "../../../constants/images";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // eslint-disable-next-line react-hooks/purity
  const rating = Math.floor(Math.random() * 5) + 1;
  // eslint-disable-next-line react-hooks/purity
  const ratingCount = Math.floor(Math.random() * 500) + 1;
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`product/${product.slug}`)} className="group cursor-pointer relative flex flex-col bg-white  overflow-hidden  transition-all duration-500 ease-out border border-slate-100 h-full">
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-slate-50">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            e.currentTarget.src = images.productDefault;
          }}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-spring">
          <button className="p-2.5 bg-white rounded-full shadow-lg text-slate-600 hover:text-red-500 hover:scale-110 active:scale-95 transition-all">
            <FiHeart size={18} />
          </button>
        </div>

        {/* Quick Add to Cart (Desktop overlay or always visible on bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-spring">
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all">
            <FiShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-semibold text-slate-800 line-clamp-1 mb-2 group-hover:text-slate-900 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                fill={i < rating ? "currentColor" : "none"}
                className={i < rating ? "" : "text-slate-200"}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            ({ratingCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toLocaleString()}
            </span>
            {product.price && (
              <span className="text-sm text-slate-400 line-through">
                ${(product.price + 10).toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile visible action (optional, or just use the hover one) */}
          <button className="md:hidden p-2 text-slate-900">
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
