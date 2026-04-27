import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { images } from "../../../constants/images";
import { useState } from "react";

function MobileImages({ pImages }: { pImages: string[] | undefined }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const productImages = pImages ?? [];

  const nextImg = () => {
    if (productImages.length === 0) return;
    setCurrentIdx((idx) => (idx >= productImages.length - 1 ? 0 : idx + 1));
  };
  const prevImg = () => {
    if (productImages.length === 0) return;
    setCurrentIdx((idx) => (idx <= 0 ? productImages.length - 1 : idx - 1));
  };
  return (
    <div className="h-100 overflow-hidden  relative  md:hidden ">
      {productImages.length !== 0 ? (
        <img
          src={productImages[currentIdx] ?? images.productDefault}
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

      {productImages.length > 1 && (
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
  );
}

export default MobileImages;
