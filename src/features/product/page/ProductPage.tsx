import Breadcrumb from "../../../shared/components/Breadcrumb";
import ProductCardSkeleton from "../../../shared/components/Loader/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hook/useProduct";

function ProductPage() {
  const { loading, allProducts } = useProduct();
  

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
      <div className="py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {allProducts!.length > 0 ? (
            allProducts?.map((p, index) => <ProductCard key={index} product={p}  />)
          ) : (
            <div className="flex justify-center items-center h-10 w-full  col-span-6">
              <p>Product not found</p>
            </div>
          )}
        </div>
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}
      </div>

    </>
  );
}

export default ProductPage;
