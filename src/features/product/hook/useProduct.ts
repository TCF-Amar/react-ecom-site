import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchCategories, fetchProducts } from "../slices/productSlice";
import type { Product } from "../types";
import { fetchProductByCategory } from "../services/productApiServices";


const LIMIT = 10
export const useProduct = () => {
    const dispatch = useAppDispatch()
    const { categories, error, loading, allProducts, hasMore } = useAppSelector(state => state.product);
    const [catProducts, setCatProducts] = useState<Product[] | []>([]);
    const [catLoading, setCatLoading] = useState<boolean>(true);

    const offset = useRef<number>(0);


    const lastStep = useRef(-1);

    useEffect(() => {
         
        dispatch(fetchCategories())
        dispatch(fetchProducts({ offset: 0, limit: LIMIT }))
    }, [])
    


    const fetchMore = () => {
        if (loading || !hasMore) return;

        const nextOffset = offset.current + LIMIT;
        offset.current = nextOffset;
        dispatch(fetchProducts({ offset: nextOffset, limit: LIMIT }))

    }

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

    useEffect(() => {
        const handelScroll = () => {
            const scrollUp = window.scrollY;
            const currentScroll = Math.floor(scrollUp / 200);
            if (currentScroll !== lastStep.current) {
                lastStep.current = currentScroll;
                console.log('scroll ', currentScroll);
                fetchMore()
                dispatch(fetchCategories())
            }
        }
        window.addEventListener("scroll", handelScroll)

        return () => {
            window.removeEventListener("scroll", handelScroll);
        }
    }, [])

    return {
        categories,
        error,
        loading,
        catProducts,
        catLoading,
        allProducts,
        fetchMore,
        fetchProductsByCat,

    }
}