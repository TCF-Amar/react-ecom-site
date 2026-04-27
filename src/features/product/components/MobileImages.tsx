import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { images } from "../../../constants/images";
import { useState } from "react";

function MobileImages({ pImages }: { pImages: string[] | undefined }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImg = () => {
    setCurrentIdx(currentIdx + 1);
    if (currentIdx >= (pImages?.length || 0) - 1) {
      setCurrentIdx(0);
    }
  };
  const prevImg = () => {
    setCurrentIdx(currentIdx - 1);
    if (currentIdx <= 0) {
      setCurrentIdx((pImages?.length || 0) - 1);
    }
  };
  return (
    <div className="h-100 overflow-hidden  relative  md:hidden ">
      {(pImages?.length || 0) !== 0 ? (
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
  );
}

export default MobileImages;
