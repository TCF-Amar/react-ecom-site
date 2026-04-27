import { FiImage, FiX } from "react-icons/fi";
// import { useCategory } from "../../product/hook/useCategory";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAdmin } from "../useAdmin";
import type { AddProductData, FireStoreProductModel } from "../adminTypes";
import { useProduct } from "../../product/hook/useProduct";

function AddProductForm({
  showForm,
  toggleForm,
  editingProduct = null,
}: {
  showForm: boolean;
  toggleForm: () => void;
  setShowForm: (value: boolean) => void;
  editingProduct?: FireStoreProductModel | null;
}) {
  // const { categories } = useCategory();
  const { register, handleSubmit, reset } = useForm<AddProductData>({});
  const { addProductFn, updateProductFn, adding, updating } = useAdmin();
  const { categories } = useProduct();
  const submitLockRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saving = adding || updating || isSubmitting;

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

  const onSubmit = handleSubmit(async (data) => {
    if (submitLockRef.current || adding || updating) return;

    if (!data.title || !data.categoryId || !data.price) {
      toast.error("All fields are required");
      return;
    }

    let success = false;
    submitLockRef.current = true;
    setIsSubmitting(true);

    try {
      if (editingProduct) {
        success = await updateProductFn(
          { ...data, images } as any,
          editingProduct.id,
        );
      } else {
        success = await addProductFn({ ...data, images } as any);
      }

      console.log("Form Data:", { ...data, images });

      if (success) {
        setTimeout(() => {
          toggleForm();
          reset({
            title: "",
            price: null,
            description: "",
            categoryId: 1,
          });
          submitLockRef.current = false;
          setIsSubmitting(false);
        }, 500);
        return;
      }
    } finally {
      if (!success) {
        submitLockRef.current = false;
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div
      className={`fixed inset-0 flex z-50 justify-end transition-all duration-300 ${showForm ? "bg-slate-900/40 backdrop-blur-sm" : "bg-transparent pointer-events-none"}`}
    >
      <div
        className={`bg-white shadow-2xl h-full transition-transform duration-300 w-full md:w-[500px] flex flex-col ${showForm ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
            onClick={toggleForm}
          >
            <FiX size={24} />
          </button>
        </div>
        <form
          className="w-full flex-1 overflow-y-auto p-6 space-y-6"
          onSubmit={onSubmit}
        >
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Product Title
            </label>
            <input
              type="text"
              placeholder="e.g. Classic White Sneakers"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              {...register("title")}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Price ($)
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              {...register("price")}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              placeholder="Describe the product..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[100px] resize-y"
              {...register("description")}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all bg-white"
              {...register("categoryId")}
              required
            >
              <option disabled selected>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="block mb-3 text-sm font-semibold text-slate-700">
              Product Images
            </p>
            <div className="flex flex-wrap gap-4">
              <label className="w-24 h-24 border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 rounded-xl flex justify-center items-center flex-col cursor-pointer hover:bg-slate-100 hover:border-indigo-400 hover:text-indigo-600 transition-all">
                <FiImage size={24} className="mb-1" />
                <p className="text-[10px] font-medium uppercase tracking-wide">
                  Upload
                </p>
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
                  className="relative w-24 h-24 rounded-xl overflow-hidden group shadow-sm border border-slate-200"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm hover:bg-red-50 hover:text-red-600 transition-all backdrop-blur-sm"
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
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button
              type="submit"
              disabled={saving}
              className={`w-full py-3.5 rounded-xl text-white font-semibold flex justify-center items-center transition-all duration-300 ${
                saving
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              }`}
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{editingProduct ? "Updating..." : "Saving..."}</span>
                </div>
              ) : editingProduct ? (
                "Save Changes"
              ) : (
                "Publish Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
