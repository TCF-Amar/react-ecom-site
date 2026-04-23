import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import type { FireStoreProductModel } from "../types";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function AdminProductCard({ item, onEdit }: { item: FireStoreProductModel; onEdit?: (product: FireStoreProductModel) => void }) {
    const { deleteProductFn } = useAdmin({ autoFetch: false });
    const navigate = useNavigate()
  return (
    <div className=" flex justify-between  gap-4">
      <div className="flex gap-4" onClick={()=>navigate(`/products/${item.slug}`)}>
        <div className="w-10 h-10  ">
          <img
            src={item.images[0]}
            className="w-10 h-full object-cover"
            alt=""
          />
        </div>
        <div className="flex-1">
          <p className="line-clamp-1">{item.title}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => onEdit?.(item)} className="text-blue-500 ">
          <FiEdit />
        </button>
        <button
          onClick={() => deleteProductFn(item.id)}
          className="text-red-500"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

export default AdminProductCard;
