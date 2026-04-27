import { useState } from "react";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hook/useProduct";
import { FiFilter } from "react-icons/fi";
import ProductCardSkeleton from "../../../shared/components/Loader/ProductCardSkeleton";
import { useEffect } from "react";

function ProductPage() {
  const {
    products,
    categories,
    loading,
    setCategoryId,
    categoryId,
    setPriceRange,
    priceRange,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  } = useProduct();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState(false);
  const [values, setValues] = useState<number[]>(priceRange || [0, 500000]);

  useEffect(() => {
    setValues(priceRange || [0, 500000]);
  }, [priceRange]);

  const hasFilters =
    (categoryId && categoryId.length > 0) ||
    (priceRange && (priceRange[0] !== 0 || priceRange[1] !== 500000));

  const handelSelectCat = (e: HTMLInputElement) => {
    const { value, checked } = e;
    const numValue = Number(value);

    let newCategories = categoryId ? [...categoryId] : [];

    if (checked) {
      if (!newCategories.includes(numValue)) {
        newCategories.push(numValue);
      }
    } else {
      newCategories = newCategories.filter((id) => id !== numValue);
    }

    setCategoryId(newCategories);
  };

  const handelSelectSort = (e: HTMLSelectElement) => {
    const val = e.value;
    if (val === "lowToHigh") {
      setSortBy("price");
      setSortOrder("asc");
    } else if (val === "highToLow") {
      setSortBy("price");
      setSortOrder("desc");
    } else if (val === "newestFirst") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (val === "a-to-z") {
      setSortBy("title");
      setSortOrder("asc");
    } else if (val === "z-to-a") {
      setSortBy("title");
      setSortOrder("desc");
    } else {
      setSortBy("createdAt");
      setSortOrder("desc");
    }
  };

  const handleClearFilters = () => {
    setCategoryId([]);
    setPriceRange([0, 500000]);
  };

  let sortOption = "newestFirst";
  if (sortBy === "price" && sortOrder === "asc") sortOption = "lowToHigh";
  else if (sortBy === "price" && sortOrder === "desc") sortOption = "highToLow";
  else if (sortBy === "createdAt" && sortOrder === "desc")
    sortOption = "newestFirst";
  else if (sortBy === "title" && sortOrder === "asc") sortOption = "a-to-z";
  else if (sortBy === "title" && sortOrder === "desc") sortOption = "z-to-a";

  return (
    <>
      <div className=" ">
        <Breadcrumb />
      </div>
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
        <div className=" hidden md:flex flex-col  flex-1  relative top-0 ">
          <div
            className={`sticky top-20 flex  flex-col gap-4   overflow-y-auto ${products.length > 6 ? "max-h-150" : "h-fit"} `}
          >
            <div className="flex justify-between ">
              <p className="uppercase font-bold py-4 s">Filters</p>
              {hasFilters && (
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
                className={`  overflow-hidden overflow-y-auto p hide-scroll `}
              >
                {[...categories.slice(0, 6)].map((cat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="checkbox"
                      value={cat.id}
                      id={cat.slug}
                      checked={categoryId?.includes(cat.id)}
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
                  onClick={() => setShowMore(true)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 absolute bottom-3 right-4 transition-colors"
                >
                  Show More
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col px-5 pt-5 relative pb-8">
              <p className="uppercase font-semibold pb-4">Price</p>
              <div
                className={` max-h-125 overflow-hidden overflow-y-auto py-4 hide-scroll `}
              >
                <div>
                  Min Price
                  <input
                    type="number"
                    name="min"
                    min={1}
                    className="w-full outline-none border border-slate-200 rounded-md p-1"
                    value={priceRange?.[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number(e.target.value),
                        priceRange?.[1] || 0,
                      ])
                    }
                  />
                </div>

                <div>
                  Max Price
                  <input
                    type="number"
                    name="max"
                    min={10}
                    value={priceRange?.[1]}
                    className="w-full outline-none border border-slate-200 rounded-md p-1"
                    onChange={(e) =>
                      setPriceRange([
                        priceRange?.[0] || 0,
                        Number(e.target.value),
                      ])
                    }
                  />
                </div>
              </div>
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
              id="sort"
              value={sortOption}
              className="bg-white border border-slate-200 text-slate-700 p-2.5 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none shadow-sm cursor-pointer hover:border-slate-300 transition-all text-sm font-medium"
              onChange={(e) => handelSelectSort(e.target)}
            >
              <option value="newestFirst">Newest first</option>
              <option value="lowToHigh">Low To High</option>
              <option value="highToLow">High To Low</option>
              <option value="a-to-z">A-Z</option>
              <option value="z-to-a">Z-A</option>
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
                {hasFilters && (
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
                      checked={categoryId?.includes(cat.id)}
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4  ">
            {products!.length > 0 ? (
              products?.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-4">
            {loading &&
              [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
          </div>
          {!loading && products!.length === 0 && (
            <div className="flex justify-center items-center h-10 w-full  col-span-6">
              <p>Product not found</p>
            </div>
          )}
        </div>
      </div>

      {showMore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowMore(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-semibold text-lg uppercase">
                All Categories
              </h3>
              <button
                onClick={() => setShowMore(false)}
                className="text-slate-400 hover:text-slate-600 font-medium"
              >
                Close
              </button>
            </div>
            <div className="p-5 overflow-y-auto hide-scroll flex-1">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    value={cat.id}
                    id={`modal-${cat.slug}`}
                    checked={categoryId?.includes(cat.id)}
                    onChange={(e) => handelSelectCat(e.target)}
                    className="accent-indigo-600 cursor-pointer w-5 h-5"
                  />
                  <label
                    htmlFor={`modal-${cat.slug}`}
                    className="cursor-pointer text-[16px] font-medium text-slate-700 hover:text-indigo-600 transition-colors capitalize flex-1"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
