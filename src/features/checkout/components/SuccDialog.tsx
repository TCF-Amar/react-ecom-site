import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SuccDialog() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-400  z-100 flex justify-center items-center flex-col">
          <FiCheckCircle size={50} color="green" />
          <p>Payment success</p>
          
          <div className="flex gap-4 mt-8">
              <button className="flex p-3 bg-gray-700 flex-col text-white hover:bg-gray-600 duration-500 w-100" onClick={()=>navigate("/products")}>Continue Shopping</button>
              <button className="flex p-3 bg-gray-700 flex-col text-white hover:bg-gray-600 duration-500 w-100" onClick={()=>navigate("/")}>Show Orders</button>
          </div>
    </div>
  );
}

export default SuccDialog;
