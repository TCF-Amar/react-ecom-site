import { FiImage, FiX } from "react-icons/fi";
import { useCategory } from "../../product/hook/useCategory";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAdmin } from "../hooks/useAdmin";
import type { AddProductData, FireStoreProductModel } from "../types";

function AddProductForm({
  showForm,
  toggleForm,
  editingProduct = null,
}: {
  showForm: boolean;
  toggleForm: () => void;
  editingProduct?: FireStoreProductModel | null;
}) {
  const { categories } = useCategory();

  const { register, handleSubmit, reset } = useForm<AddProductData>({});
  const { addProductFn, updateProductFn, adding, updating } = useAdmin();

  useEffect(() => {
    if (editingProduct) {
      reset({
        title: editingProduct.title,
        price: editingProduct.price,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId,
      });
      setImages(editingProduct.images);
    } else {
      reset({
        title: "",
        price: null,
        description: "",
        categoryId: 1,
      });
      setImages(["https://placehold.co/600x400"]);
    }
  }, [editingProduct, reset]);

  const [images, setImages] = useState<string[]>([
    "https://placehold.co/600x400",
  ]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const read = new FileReader();
        read.onload = (event) => {
          const img = event.target?.result as string;
          setImages((prev) => [...prev, img]);
        };
        read.readAsDataURL(file);
      });
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (!data.title || !data.categoryId || !data.price) {
      toast.error("Are sare filed toh add karo ");
      return;
    }

    if (editingProduct) {
      updateProductFn({ ...data, images }, editingProduct.id);
    } else {
      addProductFn({ ...data, images });
    }

    console.log("Form Data:", { ...data, images });
    // setImages([]);

    setTimeout(() => {
      toggleForm();
      reset({
        title: "",
        price: null,
        description: "",
        categoryId: 1,
      });
    }, 500);
  });

  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 flex z-100  justify-end transition-opacity duration-200 ${showForm ? "" : "bg-transparent pointer-events-none"}`}
    >
      <div
        className={`bg-white shadow transition-transform duration-500 w-full md:w-1/2 ${showForm ? "translate-x-0" : "translate-x-full"}`}
      >
        <div
          className=" flex font-semibold justify-start items-center cursor-pointer p-2 hover:font-bold  duration-300"
          onClick={toggleForm}
        >
          <FiX size={20} />
          <p>Close</p>
        </div>
        <form
          action=""
          className="w-full p-4 overflow-y-auto h-full"
          onSubmit={onSubmit}
        >
          <div className="mb-6">
            <label>
              <p className="text-xl font-semibold ">Title</p>
              <input
                type="text"
                placeholder="Product title"
                className="border  w-full p-2"
                // required
                {...register("title")}
              />
            </label>
          </div>
          <div className="mb-6">
            <label>
              <p className="text-xl font-semibold ">Price</p>
              <input
                type="number"
                placeholder="Product price"
                className="border  w-full p-2"
                // required
                {...register("price")}
              />
            </label>
          </div>
          <div className="mb-6">
            <label>
              <p className="text-xl font-semibold ">Description</p>
              <input
                type="text"
                placeholder="Product Description"
                className="border  w-full p-2"
                {...register("description")}
              />
            </label>
          </div>
          <div className="mb-6">
            <label htmlFor="title">
              <p className="text-xl font-semibold ">Category</p>
              <select
                id=""
                className="border  w-full p-2"
                {...register("categoryId")}
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-6">
            <p className="text-xl font-semibold mb-3">Product Images</p>
            <div className="flex flex-wrap gap-4">
              <label className="w-24 h-24 border-2 border-dashed border-gray-400 rounded flex justify-center items-center flex-col cursor-pointer hover:border-gray-600 transition">
                <FiImage size={24} />
                <p className="text-xs text-center">Upload</p>
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== idx))
                    }
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 my-4 mb-10 py-2 text-white font-semibold  hover:bg-blue-600 duration-300 active:bg-blue-700"
          >
            {adding || updating
              ? editingProduct
                ? "Update ho raha hai wait...."
                : "Add ho raha hai wait...."
              : editingProduct
                ? "Update Product"
                : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
