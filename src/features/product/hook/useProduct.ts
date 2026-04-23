import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts, resetProduct } from "../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDebounce } from "../../../shared/hooks/useDebounce";


const LIMIT = 20
export const useProduct = () => {
    const dispatch = useAppDispatch();

    const { categories, error, loading, allProducts, hasMore } =
        useAppSelector(state => state.product);

    const [searchQuery, setSearchQuery] = useState<string>("");


    const query = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchCategories());
            dispatch(fetchProducts({
                offset: 0,
                limit: LIMIT,
            }));
        }
    }, []);

    useEffect(() => {
        dispatch(resetProduct());

        dispatch(fetchProducts({
            offset: 0,
            limit: LIMIT,
            query:  query
        }));
    }, [query]);

    const fetchMore = () => {
        if (loading || !hasMore) return;

        dispatch(fetchProducts({
            offset: allProducts.length,
            limit: LIMIT,
            query: query
        }));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;

            const { scrollY, innerHeight } = window;
            const { scrollHeight } = document.documentElement;
            console.log(innerHeight);
            

            if (scrollY + innerHeight >= scrollHeight - 10) {
                fetchMore();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, query]);

    return {
        allProducts,
        fetchMore,
        categories, 
        error,
        loading,
        setSearchQuery,
        searchQuery
    };
};