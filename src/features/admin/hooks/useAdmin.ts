import { useState } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { addProduct, type AddProductData, type FireStoreProductModel } from "../services/adminApiServices"
import toast from "react-hot-toast"

export const useAdmin = () => {
    const { user } = useAuth()

    const [myProducts, setMyProducts] = useState<FireStoreProductModel[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addProductFn = async (product: AddProductData) => {
        try {

            const res = await addProduct(product, user!.uid)
            console.log(res.firestoreProduct);

            setMyProducts((prev) => [...prev, res.firestoreProduct])
            console.log(myProducts);
            
        } catch (error: any) {
            setError(error.message)
            toast.error(error.message)
        }

    }

    return {
        addProductFn,
        myProducts,
        loading,
        error
    }
}