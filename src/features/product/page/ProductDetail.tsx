import Breadcrumb from "../../../shared/components/Breadcrumb";
import { images } from "../../../constants/images";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiStar,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { useProductDetails } from "../hook/useProductDetails";
import ProductDetailSkeleton from "../../../shared/components/Loader/ProductDetailSkeleton";
import { useCart } from "../../cart/useCart";

function ProductDetail() {
  const {
    navigate,
    relatedProduct,
    loading,
    nextImg,
    prevImg,
    pImages,
    currentIdx,
    product,
    selectedStar,
    setSelectedStar,
    addReviews,
    comment,
    setComment,
  } = useProductDetails();
  const {
    isTimeStart,
    addCartFn,
    incQty,
    decQty,
    quantity,
    sizes,
    setSizes,
    setQuantity,
    setTimeStart,
  } = useCart();

  const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];

  if (loading) {
    return <ProductDetailSkeleton />;
  }
  if (product == null) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-100">
        <p className="text-2xl text-black/50">Product Not Found</p>
        <button
          onClick={() => navigate(-1)}
          className=" flex gap-3 justify-center items-center text-xl bg-slate-900 text-white p-2 pr-4"
        >
          <FiChevronLeft size={24} />
          <p>Back</p>
        </button>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb />
      {/* desktop */}
      <div className="py-8">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2 "
        >
          <FiChevronLeft size={20} />
          <p className="uppercase ">Back</p>
        </button>
        <div className="h-100 overflow-hidden  relative  md:hidden ">
          {pImages.length !== 0 ? (
            <img
              src={pImages[currentIdx]}
              alt=""
              className="h-full w-full object-cover "
              onError={(e) => {
                e.currentTarget.src = images.productDefault;
              }}
            />
          ) : (
            <div className="h-100 overflow-hidden">
              <div className="w-full h-full border">
                <img
                  src={images.productDefault}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = images.productDefault;
                  }}
                />
              </div>
            </div>
          )}

          {pImages.length > 1 && (
            <div className="absolute flex justify-between items-center h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2">
              <FiChevronLeft
                className=" h-10 w-10 bg-gray-500/40 text-white"
                onClick={prevImg}
              />
              <FiChevronRight
                className=" h-10 w-10 bg-gray-500/40 text-white"
                onClick={nextImg}
              />
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-xl md:text-2xl capitalize font-semibold text-black/80 ">
            {product?.title}
          </p>
        </div>
        <div className=" flex gap-2 ">
          {/* desktop */}
          <div className="flex-2 hidden md:block h-fit sticky top-24">
            {pImages.length === 1 ? (
              <div className="h-100 overflow-hidden rounded-2xl shadow-sm bg-slate-50">
                <div className="w-full h-full transition-all duration-300 ease-in-out">
                  <img
                    src={pImages[0]}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            ) : pImages.length >= 1 ? (
              <div className="h-100 flex gap-4 relative">
                {[...Array(2)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-full w-full relative overflow-hidden rounded-2xl shadow-sm bg-slate-50"
                  >
                    <div
                      className={`flex justify-center items-center text-2xl cursor-pointer transition-all ${pImages.length > 2 && idx == 1 ? "absolute inset-0 bg-black/40 text-white font-medium z-10" : "hidden"}`}
                    >
                      <FiPlus /> {pImages.length - 1}
                    </div>
                    <img
                      src={product?.images[idx]}
                      alt={idx.toString()}
                      className={`object-cover h-full w-full cursor-pointer hover:scale-105 transition-transform duration-500`}
                      onError={(e) => {
                        e.currentTarget.src = images.productDefault;
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-100 overflow-hidden rounded-2xl shadow-sm bg-slate-50">
                <div className="w-full h-full">
                  <img
                    src={images.productDefault}
                    alt=""
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </div>
            )}
          </div>

          {/* mobile */}

          <div className={`flex-1 flex flex-col gap-6 md:pl-8`}>
            <div
              className={`flex h-fit gap-3 px-4 py-2 bg-slate-100 rounded-full items-center w-fit`}
            >
              <img
                src={product?.category.image}
                alt={product?.category.name}
                className="h-8 w-8 rounded-full object-cover shadow-sm"
              />
              <p className="font-medium text-sm text-slate-700 capitalize pr-2">
                {product?.category.name}
              </p>
            </div>
            {product.category.slug === "clothes" ? (
              <div className={`flex py-2 gap-3 flex-wrap`}>
                {sizeArray.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setTimeStart(false);
                      setSizes(s);
                    }}
                    className={`h-12 min-w-12 px-3 rounded-lg font-medium transition-all duration-200 text-center flex justify-center items-center ${sizes === s ? "bg-slate-900 text-white shadow-md scale-105" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  >
                    <p>{s}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            <div className="flex gap-4 items-baseline">
              <p className="text-2xl text-black/60 font-semibold ">
                ${product?.price}
              </p>
              <p className="text-sm text-black/60 font-semibold  line-through">
                ${product?.price}
              </p>
            </div>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center gap-4 bg-slate-100 w-fit rounded-xl p-1">
                <button
                  onClick={decQty}
                  className="w-12 h-12 rounded-lg bg-white text-xl text-slate-800 flex justify-center items-center hover:shadow-sm transition-all active:scale-95"
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={quantity ?? 1}
                  min={1}
                  max={100}
                  placeholder="0"
                  className="w-16 bg-transparent text-center font-medium text-lg outline-none"
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                />
                <button
                  onClick={incQty}
                  className="w-12 h-12 rounded-lg bg-white text-xl text-slate-800 flex justify-center items-center hover:shadow-sm transition-all active:scale-95"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {isTimeStart ? (
                  <button
                    type="button"
                    className="flex-1 bg-indigo-600 text-white rounded-xl flex justify-center items-center py-4 font-semibold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addCartFn(product)}
                    className="flex-1 bg-slate-900 text-white rounded-xl flex justify-center items-center py-4 font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Add To Cart
                  </button>
                )}
                <button
                  type="button"
                  // onClick={addToCartBtn}
                  className="flex-1 bg-slate-100 text-slate-900 rounded-xl flex justify-center items-center py-4 font-semibold hover:bg-slate-200 transition-all duration-300"
                >
                  Buy Now for ${product?.price}
                </button>
              </div>
            </div>
            <div className="py-2">
              <p className=" uppercase font-semibold">Description</p>
              <p className="text-sm text-gray-700 capitalize">
                {product?.description.length! <= 150
                  ? product?.description
                  : `${product?.description.slice(0, 150)}...`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className=" text-xl font-semibold uppercase text-black/80">
          Related Products
        </p>

        <div className=" flex  overflow-hidden gap-4  overflow-x-auto ">
          {relatedProduct.map((product, i) => (
            <div className=" min-w-50 " key={i}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className=" text-xl font-semibold uppercase text-black/80">
          customer reviews
        </p>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((s: number, i) => (
            <button key={s}>
              <FiStar
                size={20}
                className={` text-yellow-500 ${i < product?.rating || 0 ? "fill-current" : ""} `}
              />
            </button>
          ))}
          {product?.rating} ({product?.reviewCount} reviews)
        </div>
        <div className="flex items-center gap-4 flex-col">
          <div className="flex-1 border ">
            <div>
              <div className="flex justify-end p-4"></div>
            </div>
          </div>
          <div className="flex-1 bg-white border shadow-2xl w-full md:w-1/2 rounded-xl p-3 flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((s: number, i) => (
                <button
                  key={s}
                  onClick={() => setSelectedStar(i + 1)}
                  onDoubleClick={() => setSelectedStar(0)}
                >
                  <FiStar
                    size={20}
                    className={` text-yellow-500 ${i < selectedStar ? "fill-current" : ""} `}
                  />
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Write Your review here"
              value={comment}
              className="
              w-full h-24 border rounded-md p-2 outline-none  focus:border transition-all duration-300
            "
              onChange={(e)=>setComment(e.target.value)}
            />
            <button
              className="bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-all"
              onClick={addReviews}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
