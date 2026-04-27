import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";
import { images } from "../../../constants/images";

function ProductImages({ pImages }: { pImages: string[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    if (currentImageIndex === pImages.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(pImages.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <div className="flex-2 hidden md:block h-fit top-24 ">
      {isModalOpen && (
        <div className=" fixed top-0 left-0 right-0 bottom-0   p-4 text-xl backdrop-blur-3xl  z-50 flex justify-center items-center">
          <FiX
            className="absolute top-10 right-10 text-white cursor-pointer bg-gray-500/40 p-1 rounded"
            onClick={() => setIsModalOpen(false)}
            size={40}
          />

          <div className="w-[60%] relative">
            <div
              className={`absolute top-1/2 flex justify-between left-10 right-10  ${pImages.length > 1 ? "" : "hidden"}`}
            >
              <button
                className=" text-white cursor-pointer p-3 rounded bg-gray-500/40 shadow-lg"
                onClick={prevImage}
              >
                <FiChevronLeft className="text-2xl" />
              </button>
              <button
                className=" text-white cursor-pointer p-3 rounded bg-gray-500/40 shadow-lg"
                onClick={nextImage}
              >
                <FiChevronRight className="text-2xl" />
              </button>
            </div>
            <div
              className={`absolute bottom-30 right-10 text-white cursor-pointer p-3 rounded bg-gray-500/40 shadow-lg ${pImages.length > 1 ? "" : "hidden"}`}
            >
              {currentImageIndex + 1}/{pImages.length}
            </div>
            <img
              src={pImages[currentImageIndex]}
              alt=""
              className=" h-full  w-full object-cover object-center"
            />
          </div>
        </div>
      )}
      {pImages.length === 1 ? (
        <div
          className="h-100 overflow-hidden rounded-2xl shadow-sm bg-slate-50"
          onClick={() => setIsModalOpen(true)}
        >
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
              onClick={() => setIsModalOpen(true)}
            >
              <div
                className={`flex justify-center items-center text-2xl cursor-pointer transition-all ${pImages.length > 2 && idx == 1 ? "absolute inset-0 bg-black/40 text-white font-medium z-10" : "hidden"}`}
              >
                <FiPlus /> {pImages.length - 1}
              </div>
              <img
                src={pImages[idx]}
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
        <div
          className="h-100 overflow-hidden rounded-2xl shadow-sm bg-slate-50"
          onClick={() => setIsModalOpen(true)}
        >
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
  );
}

export default ProductImages;
