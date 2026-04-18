import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col bg-white overflow-hidden border border-slate-100 h-full">
      <div className="aspect-4/5 bg-slate-200" />

      <div className="p-4 flex flex-col flex-1">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />

        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
          </div>
          <div className="h-3 bg-slate-200 rounded w-10" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-12" />
          </div>

          <div className="w-8 h-8 bg-slate-200 rounded-full md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
