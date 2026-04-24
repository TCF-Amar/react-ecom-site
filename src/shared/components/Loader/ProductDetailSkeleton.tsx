import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse w-full">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-slate-200 w-1/4 mb-4 mt-2" />

      <div className="py-8">
        {/* Back Button Skeleton */}
        <div className="h-6 bg-slate-200 w-20 mb-6" />

        {/* Mobile Image Skeleton */}
        <div className="h-100 w-full bg-slate-200 md:hidden mb-4" />

        {/* Title Skeleton */}
        <div className="p-5 px-0">
          <div className="h-8 bg-slate-200 w-3/4 md:w-1/2 mb-2" />
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          {/* Desktop Images Skeleton */}
          <div className="flex-2 hidden md:flex gap-2 h-[500px]">
             <div className="w-1/2 h-full bg-slate-200 border border-slate-100" />
             <div className="w-1/2 h-full bg-slate-200 border border-slate-100" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Category badge */}
            <div className="h-14 bg-slate-200 w-40 border border-slate-100" />

            {/* Sizes */}
            <div className="flex gap-3 py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square h-12 bg-slate-200" />
              ))}
            </div>

            {/* Price */}
            <div className="flex gap-4 items-baseline">
              <div className="h-8 bg-slate-200 w-24" />
              <div className="h-4 bg-slate-200 w-16" />
            </div>

            {/* Add to cart section */}
            <div className="flex flex-col gap-4 mt-2">
               <div className="flex gap-4">
                 <div className="h-12 w-14 bg-slate-200" />
                 <div className="h-12 w-25 bg-slate-200" />
                 <div className="h-12 w-14 bg-slate-200" />
               </div>
               <div className="flex gap-4">
                 <div className="h-12 flex-1 bg-slate-200" />
                 <div className="h-12 flex-1 bg-slate-200" />
               </div>
            </div>

            {/* Description */}
            <div className="py-2 space-y-3 mt-4">
              <div className="h-6 bg-slate-200 w-32 mb-4" />
              <div className="h-3 bg-slate-200 w-full" />
              <div className="h-3 bg-slate-200 w-full" />
              <div className="h-3 bg-slate-200 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-8">
        <div className="h-6 bg-slate-200 w-48 mb-6" />
        <div className="flex overflow-hidden gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-50 shrink-0 h-[300px]">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
