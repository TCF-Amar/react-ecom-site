import { useState } from "react";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hook/useProduct";
import { FiFilter } from "react-icons/fi";
import ProductCardSkeleton from "../../../shared/components/Loader/ProductCardSkeleton";

function ProductPage() {
  const { products, categories, loading, setCategoryId, categoryId } =
    useProduct();
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState(false);

  const handelSelectCat = (e: HTMLInputElement) => {
    const { value, checked } = e;

    setCategoryId(checked ? Number(value) : null);
  };

  const handleClearFilters = () => {
    setCategoryId(null);
  };

  const sortedProducts = [...products];

  switch (sortOption) {
    case "lth":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "htl":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "nf":
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
  }

  return (
    <>
      <Breadcrumb />
      <div className="py-4 flex flex-col">
        <p className="text-xl md:text-3xl font-bold ">
          Explore Our Collections
        </p>

        <p className="text-[12px] sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
          consequuntur officiis animi sunt, harum sequi ipsum enim quam
          quibusdam libero sint dolores? Quaerat, sint sed deleniti repellat
          dolor eum nihil?
        </p>
      </div>
      <div className="py-8 flex flex-col md:flex-row  gap-4 relative">
        <div className=" hidden md:flex flex-col gap-4 flex-1  relative top-0 ">
          <div className="sticky top-20">
            <div className="flex justify-between ">
              <p className="uppercase font-bold py-4 s">Filters</p>
              {categoryId !== null && (
                <button type="button" onClick={handleClearFilters}>
                  <p className="text-red-500 font-semibold cursor-pointer">
                    Clear Filters
                  </p>
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col px-5 pt-5 relative pb-8">
              <p className="uppercase font-semibold pb-4">Categories</p>
              <div
                className={` max-h-125 overflow-hidden overflow-y-auto py-4 hide-scroll `}
              >
                {showMore
                  ? categories.map((cat, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input
                          type="checkbox"
                          value={cat.id}
                          id={cat.slug}
                          checked={cat.id === categoryId}
                          onChange={(e) => handelSelectCat(e.target)}
                          className="accent-indigo-600 cursor-pointer w-4 h-4 mt-1"
                        />
                        <label
                          htmlFor={cat.slug}
                          className="cursor-pointer text-[15px] font-medium text-slate-700 hover:text-indigo-600 transition-colors capitalize"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))
                  : [...categories.slice(0, 6)].map((cat, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input
                          type="checkbox"
                          value={cat.id}
                          id={cat.slug}
                          checked={cat.id === categoryId}
                          onChange={(e) => handelSelectCat(e.target)}
                          className="accent-indigo-600 cursor-pointer w-4 h-4 mt-1"
                        />
                        <label
                          htmlFor={cat.slug}
                          className="cursor-pointer text-[15px] font-medium text-slate-700 hover:text-indigo-600 transition-colors capitalize"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))}
              </div>
              {categories.length > 6 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 absolute bottom-3 right-4 transition-colors"
                >
                  {!showMore ? "Show More" : "Show less"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex  flex-col gap-4 flex-3 relative w-full ">
          <div className="py-4 md:py-2 sticky top-16  z-10 bg-white px-4  flex  justify-between items-center md:justify-end">
            <div className="relative w-full md:hidden ">
              <button
                className="flex gap-2"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FiFilter size={24} className=" md:hidden" />
                <p className="uppercase font-semibold ">Filter</p>
              </button>
            </div>

            <select
              name="sort"
              id=""
              className="bg-white border border-slate-200 text-slate-700 p-2.5 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none shadow-sm cursor-pointer hover:border-slate-300 transition-all text-sm font-medium"
              onChange={(e) => {
                setSortOption(e.target.value);
              }}
            >
              <option value="rlt">Relative</option>
              <option value="lth">Low To High</option>
              <option value="htl">High To Low</option>
              <option value="nf">Newest first</option>
            </select>
            <div
              className={`absolute left-0 right-0 top-16 w-full p-4 bg-white  ${showFilter ? "block" : "hidden"} md:hidden`}
            >
              <div className="flex justify-between">
                <p
                  onClick={() => setShowFilter(false)}
                  className="font-semibold cursor-pointer
                "
                >
                  Close
                </p>
                {categoryId !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClearFilters();
                      setShowFilter(false);
                    }}
                  >
                    <p className="text-red-500 font-semibold cursor-pointer">
                      Clear Filters
                    </p>
                  </button>
                )}
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col p-5 w-full max-h-100 overflow-hidden overflow-y-auto mt-4">
                <p className="uppercase font-semibold pb-4">Categories</p>
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="checkbox"
                      value={cat.id}
                      id={`mobile-${cat.slug}`}
                      checked={cat.id === categoryId}
                      onChange={(e) => handelSelectCat(e.target)}
                      className="accent-indigo-600 cursor-pointer w-4 h-4 mt-1"
                    />
                    <label
                      htmlFor={`mobile-${cat.slug}`}
                      className="cursor-pointer text-[15px] font-medium text-slate-700 hover:text-indigo-600 transition-colors capitalize line-clamp-1"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4  ">
            {sortedProducts!.length > 0 ? (
              sortedProducts?.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {loading &&
              [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
          </div>
          {!loading && sortedProducts!.length === 0 && (
            <div className="flex justify-center items-center h-10 w-full  col-span-6">
              <p>Product not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
