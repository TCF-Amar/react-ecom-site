import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import { useAdmin } from "../hooks/useAdmin";
import type { FireStoreProductModel } from "../types";
import AdminProductCard from "../components/AdminProductCard";

function AdminPage() {
  console.log();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<FireStoreProductModel | null>(null);
  const { myProducts, loading } = useAdmin();
  
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setEditingProduct(null);
    }
  };

  const handleEdit = (product: FireStoreProductModel) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  console.log(myProducts);

  return (
    <div className="relative">
      <AddProductForm showForm={showForm} toggleForm={toggleForm} editingProduct={editingProduct} />
      <div className="flex justify-end sticky top-16 bg-white p-2">
        {/* <p className="text-xl uppercase font-bold">Admin</p> */}
        <button onClick={toggleForm} className="p-3 bg-gray-400 font-semibold ">
          Add New Product
        </button>
      </div>
      <div className="flex flex-col gap-4">

       
        {loading ? <div className="h-25 w-full text-xl text-gray-500 font-semibold flex justify-center items-center">
          Wait 
         </div>: myProducts.map((item: FireStoreProductModel) => (
          <AdminProductCard key={item.id} item={item} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
