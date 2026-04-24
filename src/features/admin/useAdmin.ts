import { useEffect } from "react"
import { useAuth } from "../auth/hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addProduct, fetchMyProducts } from "./adminSlice"

import { updateProduct, deleteProduct } from "./adminSlice";

export const useAdmin = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()

    const { myProducts, loading, error, adding, updating, deleting } = useAppSelector(state => state.admin)

    const addProductFn = async (product: any) => {
        if (!user?.uid) return false;
        try {
            await dispatch(addProduct({ product, uid: user.uid })).unwrap();
            return true;
        } catch (err) {
            return false;
        }
    }

    const updateProductFn = async (product: any, productId: number) => {
        if (!user?.uid) return false;
        try {
            await dispatch(updateProduct({ product, productId, uid: user.uid })).unwrap();
            return true;
        } catch (err) {
            return false;
        }
    }

    const deleteProductFn = async (productId: number) => {
        if (!user?.uid) return
        const haa = confirm("Are you sure you want to delete this product?")
        if (haa) {
            dispatch(deleteProduct({ productId, uid: user.uid }))
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