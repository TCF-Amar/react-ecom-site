import { useState } from "react";
import AddProductForm from "./components/AddProductForm";
import { useAdmin } from "./useAdmin";
import type { FireStoreProductModel } from "./adminTypes";
import AdminProductCard from "./components/AdminProductCard";

function AdminPage() {
  console.log();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] =
    useState<FireStoreProductModel | null>(null);
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
    <div className="relative py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <AddProductForm
        showForm={showForm}
        toggleForm={toggleForm}
        editingProduct={editingProduct}
        setShowForm={setShowForm}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-slate-900">Admin</h1>
          <p className="text-slate-500 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Architecto, numquam.
          </p>
        </div>
        <button
          onClick={toggleForm}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          + Add New Product
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="h-40 w-full text-lg text-slate-500 flex justify-center items-center gap-3">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
            Loading products...
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {myProducts.map((item: FireStoreProductModel) => (
              <AdminProductCard key={item.id} item={item} onEdit={handleEdit} />
            ))}
            {myProducts.length === 0 && (
              <div className="h-40 flex justify-center items-center text-slate-500">
                No products found. Add product!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
