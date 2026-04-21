import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts, resetProduct } from "../slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDebounce } from "../../../shared/hooks/useDebounce";


const LIMIT = 10
export const useProduct = () => {
    const dispatch = useAppDispatch();

    const { categories, error, loading, allProducts, hasMore } =
        useAppSelector(state => state.product);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const debouncedQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(resetProduct());

        dispatch(fetchProducts({
            offset: 0,
            limit: LIMIT,
            query: debouncedQuery
        }));
    }, [debouncedQuery, dispatch]);

    const fetchMore = () => {
        if (loading || !hasMore) return;

        dispatch(fetchProducts({
            offset: allProducts.length,
            limit: LIMIT,
            query: debouncedQuery
        }));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;

            const { scrollY, innerHeight } = window;
            const { scrollHeight } = document.documentElement;

            if (scrollY + innerHeight >= scrollHeight - 300) {
                fetchMore();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, allProducts.length, debouncedQuery]);

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