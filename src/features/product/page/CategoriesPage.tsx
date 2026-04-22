import Breadcrumb from "../../../shared/components/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../../../constants/images";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../../../shared/components/Loader/ProductCardSkeleton";
import { useCategory } from "../hook/useCategory";

const CategoriesPage: React.FC = () => {
  const { categories, fetchProductsByCat, catProducts, catLoading } =
    useCategory();
  const location = useLocation();

  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState<string | any>(null);

  useEffect(() => {
    fetchProductsByCat(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    const slug = location.pathname.split("/").findLast(Boolean) || "";
    setCurrentCategory(slug === "categories" ? "" : slug);
  }, [location.pathname]);

  const handelSelectCurrenCat = (value: string) => {
    setCurrentCategory(value);
    navigate(`/categories/${value}`);
  };

  return (
    <>
      <Breadcrumb />

      <div className="py-4 flex flex-col">
        <p className="text-xl md:text-3xl font-bold ">Explore All Categories</p>

        <p className="text-[12px] sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
          consequuntur officiis animi sunt, harum sequi ipsum enim quam
          quibusdam libero sint dolores? Quaerat, sint sed deleniti repellat
          dolor eum nihil?
        </p>
      </div>

      <div className="flex ">
        <div className="relative flex-1 ">
          <div className=" sticky top-16 bg-white z-10 flex-1  max-h-150 overflow-hidden  overflow-y-auto ">
            <div className="hidden md:flex flex-col items-center gap-3 overflow-y-auto overflow-hidden">
              <button
                onClick={() => handelSelectCurrenCat("")}
                className={`px-4 md:px-6 h-10  text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3  w-37 line-clamp-1 overflow-hidden hover:scale-105 ${
                  !currentCategory
                    ? "bg-indigo-600 text-white shadow shadow-indigo-200 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-[#48484864]"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => {
                const isActive =
                  currentCategory?.toLocaleLowerCase() ===
                  category.name.toLowerCase();
                return (
                  <button
                    key={category.id}
                    onClick={() => handelSelectCurrenCat(category.slug)}
                    className={`px-4 md:px-0 h-10  text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3   w-37 line-clamp-1 overflow-hidden hover:scale-105  ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-[#48484864]"
                    }`}
                  >
                    <span className="h-10 w-10  overflow-hidden hidden sm:block">
                      <img
                        src={category.image}
                        alt=""
                        className="w-10 h-10 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = images.productDefault;
                        }}
                      />
                    </span>
                    <div className="line-clamp-1 capitalize md:pr-2">
                      {category.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-8 flex-4">
          {catLoading ? (
            <div className="grid w- grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {catProducts.length > 0 ? (
                catProducts.map((p, i) => {
                  return <ProductCard key={i} product={p} />;
                })
              ) : (
                <div className="flex justify-center items-center h-10 w-full  col-span-6">
                  <p>Product not found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
