import Breadcrumb from "../../../shared/components/Breadcrumb";
import {
  FiChevronLeft,
  FiMinus,
  FiPlus,
  FiStar,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { useProductDetails } from "../hook/useProductDetails";
import ProductDetailSkeleton from "../../../shared/components/Loader/ProductDetailSkeleton";
import { useCart } from "../../cart/useCart";
import ProductImages from "../components/ProductImages";
import { Link } from "react-router-dom";
import MobileImages from "../components/MobileImages";

function ProductDetail() {
  const {
    navigate,
    relatedProduct,
    loading,
    product,
    selectedStar,
    setSelectedStar,
    addReviews,
    comment,
    setComment,
    reviews,
    reviewsLoading,
    editingReviewId,
    startEditReview,
    cancelEditReview,
    deleteReview,
    userId,
    addingReview,
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
    <div className="relative">
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
        <MobileImages pImages={product?.images} />
        <div className="p-5">
          <p className="text-xl md:text-2xl capitalize font-semibold text-black/80 ">
            {product?.title}
          </p>
        </div>
        <div className=" flex gap-2 ">
          {/* desktop */}
          <ProductImages pImages={product?.images} />
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
              <div className="flex  gap-4 flex-wrap">
                {isTimeStart ? (
                  <Link
                    to={"/cart"}
                    className="w-full md:min-w-50 bg-indigo-600 text-white rounded-xl flex justify-center items-center py-4 font-semibold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Go To Cart
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => addCartFn(product)}
                    className="w-full md:min-w-50 bg-slate-900 text-white rounded-xl flex justify-center items-center py-4 font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Add To Cart
                  </button>
                )}
               
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
            <div className=" min-w-50 max-w-60" key={i}>
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
          <div className="w-full">
            {reviewsLoading ? (
              <div className="border border-slate-100 bg-white rounded-xl p-5 text-slate-500">
                Loading reviews...
              </div>
            ) : reviews.length > 0 ? (
              <div className="flex flex-col gap-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {review.userAvatar ? (
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold uppercase">
                            {review.userName?.charAt(0) || "U"}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">
                            {review.userName}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                size={14}
                                className={`text-yellow-500 ${i < review.rating ? "fill-current" : ""}`}
                              />
                            ))}
                            {review.isEdited && (
                              <span className="text-xs text-slate-400 ml-2">
                                Edited
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {review.userId === userId && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditReview(review)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit review"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteReview(review)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete review"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-3">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-slate-100 bg-white rounded-xl p-5 text-slate-500">
                No reviews yet.
              </div>
            )}
          </div>
          <div className="flex-1 bg-white border shadow-2xl w-full md:w-1/2 rounded-xl p-3 flex flex-col gap-4">
            {editingReviewId && (
              <div className="flex items-center justify-between bg-indigo-50 text-indigo-700 rounded-lg px-3 py-2 text-sm">
                <span>Editing your review</span>
                <button
                  type="button"
                  onClick={cancelEditReview}
                  className="p-1 hover:bg-indigo-100 rounded-md"
                  title="Cancel edit"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
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
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className={` w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-all`}
              onClick={addReviews}
              disabled={addingReview}
            >
              {addingReview
                ? "Submitting..."
                : editingReviewId
                  ? "Update Review"
                  : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
