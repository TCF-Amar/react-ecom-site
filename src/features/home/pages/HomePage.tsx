import { Link } from "react-router-dom";
import { useProduct } from "../../product/hook/useProduct";
import ProductCard from "../../product/components/ProductCard";
import ProductCardSkeleton from "../../../shared/components/Loader/ProductCardSkeleton";
import { FiArrowRight } from "react-icons/fi";

function HomePage() {
  const { products, loading } = useProduct();
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="flex flex-col gap-12 pb-12">
      <div className="relative w-full h-[60vh] min-h-[400px] rounded-3xl overflow-hidden mt-4">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 to-slate-900/40" />

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4 animate-fade-in">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mb-8 animate-slide-up">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            voluptatibus placeat consequatur, accusantium nesciunt nostrum.
          </p>
          <Link
            to="/products"
            className="w-fit flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <span>Shop Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif text-slate-900">
              Featured Products
            </h2>
            <p className="text-slate-500 mt-2">Lorem ipsum dolor sit amet.</p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center gap-1 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading
            ? [...Array(5)].map((_, idx) => <ProductCardSkeleton key={idx} />)
            : featuredProducts.map((p, index) => (
                <ProductCard key={index} product={p} />
              ))}
        </div>

        <Link
          to="/products"
          className="md:hidden w-full flex justify-center items-center gap-2 bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-medium mt-2"
        >
          View All Products <FiArrowRight />
        </Link>
      </div>

     
    </div>
  );
}

export default HomePage;
