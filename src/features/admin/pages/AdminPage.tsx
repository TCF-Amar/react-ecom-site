import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import { useAdmin } from "../hooks/useAdmin";

function AdminPage() {
  console.log();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { myProducts } = useAdmin();
  const toggleForm = () => {
    setShowForm(!showForm);
    };
    console.log(myProducts);
    

  return (
    <div className="relative">
      <AddProductForm showForm={showForm} toggleForm={toggleForm} />
      <div className="flex justify-between sticky top-16 bg-white p-2">
        <p className="text-xl uppercase font-bold">Admin</p>
        <button onClick={toggleForm} className="p-3 bg-gray-400 font-semibold ">
          Add New Product
        </button>
      </div>
          <div>
              {
                  myProducts.map((item: any) => (
                      <div>
                          {item.title}
                    </div>
                ))
              }
      </div>
    </div>
  );
}

export default AdminPage;
