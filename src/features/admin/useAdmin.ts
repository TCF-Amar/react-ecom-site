import { useEffect } from "react"
import { useAuth } from "../auth/hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addProduct, fetchMyProducts } from "./adminSlice"

import { updateProduct, deleteProduct } from "./adminSlice";
import type { AddProductData, ProductPayload } from "./adminTypes";
import type { Category } from "../product/productTypes";
import { useProduct } from "../product/hook/useProduct";

export const useAdmin = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const { categories } = useProduct()
    const { myProducts, loading, error, adding, updating, deleting } = useAppSelector(state => state.admin)

    const addProductFn = async (product: AddProductData) => {
        if (!user?.uid) return false;
        if (product.categoryId == null || product.price == null) return false;

        const categoryId = Number(product.categoryId);
        const price = Number(product.price);

        if (!Number.isFinite(categoryId) || !Number.isFinite(price)) return false;

        const cat: Category | undefined = categories.find(
            (category) => category.id === categoryId
        );
        if (!cat) return false;

        try {
            const productData: ProductPayload = {
                title: product.title,
                price,
                description: product.description,
                images: product.images,
                category: cat,
            }
            await dispatch(addProduct({ product: productData, uid: user.uid })).unwrap();
            return true;
        } catch (err) {
            return false;
        }
    }

    const updateProductFn = async (product: AddProductData, productId: number) => {
        if (!user?.uid) return false;
        if (product.categoryId == null || product.price == null) return false;
        console.log(product.categoryId);
        
        const categoryId = Number(product.categoryId);
        const price = Number(product.price);

        if (!Number.isFinite(categoryId) || !Number.isFinite(price)) return false;

        const cat: Category | undefined = categories.find(
            (category) => category.id === categoryId
        );
        if (!cat) return false;

        try {
            const productData: ProductPayload = {
                title: product.title,
                price,
                description: product.description,
                images: product.images,
                category: cat,
            }
            console.log("Updated Product Data:", productData);
            await dispatch(updateProduct({ product: productData, productId, uid: user.uid })).unwrap();
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
