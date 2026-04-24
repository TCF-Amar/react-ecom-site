import { useNavigate } from "react-router-dom";
import { useAdmin } from "../useAdmin";
import type { FireStoreProductModel } from "../adminTypes";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function AdminProductCard({
  item,
  onEdit,
}: {
  item: FireStoreProductModel;
  onEdit?: (product: FireStoreProductModel) => void;
}) {
  const { deleteProductFn } = useAdmin({ autoFetch: false });
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center gap-4 p-4 hover:bg-slate-50 transition-colors group">
      <div
        className="flex gap-4 items-center cursor-pointer flex-1"
        onClick={() => navigate(`/products/${item.slug}`)}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-100 bg-white shrink-0">
          <img
            src={item.images[0]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt=""
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 line-clamp-1">
            {item.title}
          </p>
          <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit?.(item)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit Product"
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={() => deleteProductFn(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Product"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default AdminProductCard;
