import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchCategories } from "../slices/productSlice";
import type { Product } from "../types";
import { fetchProductByCategory } from "../services/productFirebaseServices";

export const useCategory = () => {

    const dispatch = useAppDispatch()

    const { categories, error, loading } = useAppSelector(state => state.product);

    const [catProducts, setCatProducts] = useState<Product[] | []>([]);
    const [catLoading, setCatLoading] = useState<boolean>(true);

    useEffect(() => {

        dispatch(fetchCategories())
    }, [])
    const fetchProductsByCat = async (cat: string) => {
        setCatLoading(true);
        try {
            const data = await fetchProductByCategory(cat);
            console.log(data);

            setCatProducts(data);
        } catch (error) {
            throw new Error("Not Found")
        } finally {
            setCatLoading(false);

        }


    }
    return {
        error,
        loading,
        categories,
        catProducts,
        catLoading,
        fetchProductsByCat,
}
}