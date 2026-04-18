import Breadcrumb from "../../../shared/components/Breadcrumb";

import { images } from "../../../constants/images";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { useProductDetails } from "../hook/useProductDetails";
import { useCart } from "../../cart/hooks/useCart";

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
  } = useProductDetails();
  const { isTimeStart,
    addToCartBtn,
    incQty,
    decQty,
    quantity,
    setQuantity, } = useCart()
  console.log(product);
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-100">
        <p className="text-2xl text-black/50">Ruko jara sabar karo</p>
      </div>
    );
  }
  if (product == null) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-100">
        <p className="text-2xl text-black/50">Product Nahi mila</p>
        <button
        onClick={()=>navigate(-1)}
          className=" flex gap-3 justify-center items-center text-xl bg-slate-900 text-white p-2 pr-4">
          <FiChevronLeft size={24}/>
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
          onClick={
            () => {
              navigate(-1)
            }
          }
        
          className="flex items-center gap-2 ">
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
          <div className="flex-2 hidden md:block h-">
            {pImages.length === 1 ? (
              <div className="h-100 overflow-hidden">
                <div className="w-full h-full border transition-all duration-300 ease-in-out">
                  <img
                    src={pImages[0]}
                    alt=""
                    className="w-full h-full object-cover object-center "
                  />
                </div>
              </div>
            ) : pImages.length >= 1 ? (
              <div className="h-100 overflow-hidden flex gap-2 relative">
                {[...Array(2)].map((_, idx) => (
                  <div className="h-full w-full relative overflow-hidden">
                    <div
                      className={`flex justify-center items-center text-2xl cursor-pointer ${pImages.length > 2 && idx == 1 ? "absolute top-0 left-0 right-0 bottom-0 bg-gray-500/20 z-10 h-100" : "hidden"}`}
                    >
                      <FiPlus /> {pImages.length - 1}
                    </div>
                    <img
                      src={product?.images[idx]}
                      alt={idx.toString()}
                      className={`object-cover h-full w-full cursor-pointer border border-black/20`}
                      onError={(e) => {
                        e.currentTarget.src = images.productDefault;
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-100 overflow-hidden">
                <div className="w-full h-full border">
                  <img
                    src={images.productDefault}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* mobile */}

          <div className="flex-1 flex flex-col">
            <div className="flex h-fit gap-2 p-2 border border-black/40 items-center">
              <img
                src={product?.category.image}
                alt={product?.category.name}
                className="h-10  w-10 object-cover"
              />
              <p className="font-semibold capitalize">
                {product?.category.name}
              </p>
            </div>
            <div className="flex gap-4 items-baseline">
              <p className="text-2xl text-black/60 font-semibold py-8">
                ${product?.price}
              </p>
              <p className="text-sm text-black/60 font-semibold py-8 line-through">
                ${product?.price}
              </p>
            </div>
            <div className="">
              <div className="flex gap-4 py-4">
                <button
                  onClick={decQty}
                  className="bg-slate-900 w-14 text-3xl text-white flex justify-center items-center active:bg-gray-800"
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  placeholder="0"
                  className="w-25 p-3 border text-center "
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                />
                <button
                  onClick={incQty}
                  className="bg-slate-900 w-14 text-3xl text-white flex justify-center items-center active:bg-gray-800"
                >
                  <FiPlus />
                </button>
              </div>
              <div className=" flex gap-4">
                {isTimeStart ? (
                  <button
                    type="button"
                    className="bg-slate-900  text-white flex text-center p-3 font-semibold hover:bg-gray-700 transition-all duration-300"
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={addToCartBtn}
                    className="bg-slate-900  text-white flex text-center p-3 font-semibold hover:bg-gray-700 transition-all duration-300"
                  >
                    Add To Cart
                  </button>
                )}
                <button
                  type="button"
                  // onClick={addToCartBtn}
                  className="bg-slate-900  text-white flex text-center p-3 font-semibold hover:bg-gray-700 transition-all duration-300"
                >
                  Shop at ${product?.price}
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

        <div className=" flex  overflow-hidden gap-4  overflow-x-auto">
          {relatedProduct.map((p) => (
            <div className=" w-50 ">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
