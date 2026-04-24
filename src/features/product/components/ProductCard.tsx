import React from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import type { Product } from "../productTypes";
import { images } from "../../../constants/images";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group cursor-pointer w-full relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out border border-slate-50 h-full overflow-hidden"
    >
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

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-0 opacity-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-spring">
          <button className="p-1 bg-white rounded-full shadow-lg text-slate-600 hover:text-red-500 hover:scale-110 active:scale-95 transition-all">
            <FiHeart size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-semibold capitalize text-slate-800 line-clamp-1 mb-2 group-hover:text-slate-900 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                fill={i < product.rating ? "currentColor" : "none"}
                className={i < product.rating ? "" : "text-slate-200"}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            ({product.reviewCount})
          </span>
        </div>

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
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
