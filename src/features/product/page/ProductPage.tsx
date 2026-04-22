import { useEffect, useState } from "react";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hook/useProduct";
import type { Product } from "../types";
import { FiFilter } from "react-icons/fi";

function ProductPage() {
  const {  allProducts, categories } = useProduct();
  const [sortOption, setSortOption] = useState<string | null>(null);

  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  const [showFilter, setShowFilter] = useState(false);

  const handelSelectCat = (e: HTMLInputElement) => {
    const { value, checked } = e;
    setCurrentCategories((prev) =>
      checked ? [...prev, value] : prev.filter((c) => c !== value),
    );
  };

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (currentCategories.length > 0) {
      filtered = filtered.filter((p) =>
        currentCategories.includes(p.category?.slug ?? ""),
      );
    }

    switch (sortOption) {
      case "lth":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "htl":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nf":
        filtered.sort(
          (a, b) =>
            new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime(),
        );
        break;
      case "rlt":
      default:
        break;
    }
    console.log(filtered.length);

    setListProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [sortOption, allProducts, currentCategories]);
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
              {currentCategories.length > 0 && (
                <button type="button" onClick={() => setCurrentCategories([])}>
                  <p className="text-red-500 font-semibold cursor-pointer">
                    Clear Filters
                  </p>
                </button>
              )}
            </div>
            <div className="border border-black/40 flex flex-col px-4 pt-4 relative pb-8">
              <p className="uppercase font-semibold pb-4">Categories</p>
              <div
                className={` max-h-125 overflow-hidden overflow-y-auto py-4 hide-scroll `}
              >
                {showMore
                  ? categories.map((cat, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input
                          type="checkbox"
                          value={cat.slug}
                          id={cat.slug}
                          checked={currentCategories.includes(cat.slug)}
                          onChange={(e) => handelSelectCat(e.target)}
                        />
                        <label
                          htmlFor={cat.slug}
                          className="cursor-pointer text-base font-semibold capitalize"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))
                  : [...categories.slice(0, 6)].map((cat, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input
                          type="checkbox"
                          value={cat.slug}
                          id={cat.slug}
                          checked={currentCategories.includes(cat.slug)}
                          onChange={(e) => handelSelectCat(e.target)}
                        />
                        <label
                          htmlFor={cat.slug}
                          className="cursor-pointer text-base font-semibold capitalize"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))}
              </div>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-sm font-bold absolute bottom-2 right-3 hover:scale-[1px]"
              >
                {!showMore ? "Show More" : "Show less"}
              </button>
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
                {/* {showFilter ? (
                  <FiX size={24} className=" md:hidden" />
                ) : ( */}
                <FiFilter size={24} className=" md:hidden" />
                {/* )} */}
                <p className="uppercase font-semibold ">Filter</p>
              </button>
            </div>

            <select
              name="sort"
              id=""
              className="border p-2 px-4  rounded-none active:border-none outline-0"
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
                {currentCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentCategories([])}
                  >
                    <p className="text-red-500 font-semibold cursor-pointer">
                      Clear Filters
                    </p>
                  </button>
                )}
              </div>
              <div className="border border-black/40 flex flex-col p-4 w-full max-h-100 overflow-hidden overflow-y-auto  ">
                <p className="uppercase font-semibold pb-4">Categories</p>
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="checkbox"
                      value={cat.slug}
                      id={cat.slug}
                      checked={currentCategories.includes(cat.slug)}
                      onChange={(e) => handelSelectCat(e.target)}
                    />
                    <label
                      htmlFor={cat.slug}
                      className="cursor-pointer text-base font-semibold capitalize line-clamp-1 "
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
            {listProducts!.length > 0 ? (
              listProducts?.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))
            ) : (
              <div className="flex justify-center items-center h-10 w-full  col-span-6">
                <p>Product not found</p>
              </div>
            )}
          </div>
        
        </div>
      </div>
    </>
  );
}

export default ProductPage;
