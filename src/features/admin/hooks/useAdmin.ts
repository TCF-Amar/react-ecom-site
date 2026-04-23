import { useEffect } from "react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addProduct, fetchMyProducts } from "../slices"
import type { AddProductData } from "../types"

import { updateProduct, deleteProduct } from "../slices";
import toast from "react-hot-toast"

export const useAdmin = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()

    const { myProducts, loading, error, adding, updating, deleting } = useAppSelector(state => state.admin)

    const addProductFn = async (product: AddProductData) => {
        if (!user?.uid) return
        dispatch(addProduct({ product, uid: user.uid }))
    }

    const updateProductFn = async (product: Partial<AddProductData>, productId: number) => {
        if (!user?.uid) return
        dispatch(updateProduct({ product, productId, uid: user.uid }))
    }

    const deleteProductFn = async (productId: number) => {
        if (!user?.uid) return
        const haa = confirm("Kya admin ji sach me iss product ho delete karna hai ")
        if (haa) {
            dispatch(deleteProduct({ productId, uid: user.uid }))
        } else {


            toast("Lo fir nahi kar raha delete")

        }
    }

    useEffect(() => {
        if (!user?.uid) return
        if (!autoFetch) return;
        dispatch(fetchMyProducts(user.uid))

    }, [user?.uid]);


    return {
        addProductFn,
        updateProductFn,
        deleteProductFn,
        myProducts,
        loading,
        error,
        adding,
        updating,
        deleting
    }
}