import { useCallback, useEffect, useRef } from "react";
import {
    addProducts,
    fetchCategories,
    resetProduct,
    setCategoryId,
    setProductsError,
    setProductsLoading,
    setSearchQuery,
} from "../productSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { fetchProductsFromFirestore } from "../productFirebaseServices";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const CACHE_TTL = 5 * 60 * 1000;
const LIMIT_COUNT = 20;
export const useProduct = () => {
    const dispatch = useAppDispatch();

    const {
        categories,
        error,
        loading,
        products,
        hasMore,
        lastFetchedAt,
        searchQuery,
        categoryId,
    } = useAppSelector((state) => state.product);

    const query = useDebounce(searchQuery, 500);

    const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | undefined>(
        undefined
    );

    const isFetchingRef = useRef(false);
    const requestIdRef = useRef(0);
    const prevQueryRef = useRef<string | undefined>(undefined);
    const prevCategoryRef = useRef<number | null | undefined>(undefined);


    const loadProducts = useCallback(async (reset = false) => {
        if (isFetchingRef.current) return;
        if (!reset && !hasMore) return;

        const currentRequestId = ++requestIdRef.current;
        isFetchingRef.current = true;
        dispatch(setProductsLoading(true));

        try {
            const { products: fetched, lastDoc } = await fetchProductsFromFirestore({
                last: reset ? undefined : lastDocRef.current,
                search: query,
                categoryId,
                limitCount: LIMIT_COUNT,
            });

            if (currentRequestId !== requestIdRef.current) return;

            lastDocRef.current = lastDoc ?? undefined;
            dispatch(addProducts({ products: fetched, hasMore: !!lastDoc }));
        } catch (e) {
            console.error("Firestore Error:", e);
            if (currentRequestId !== requestIdRef.current) return;
            dispatch(setProductsError(e instanceof Error ? e.message : "Something went wrong"));
        } finally {
            if (currentRequestId === requestIdRef.current) {
                dispatch(setProductsLoading(false));
                isFetchingRef.current = false;
            }
        }
    }, [query, categoryId, hasMore]);


    const loadProductsRef = useRef(loadProducts);
    useEffect(() => {
        loadProductsRef.current = loadProducts;
    }, [loadProducts]);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories.length]);


    useEffect(() => {
        const now = Date.now();

        const isCacheValid =
            products.length > 0 &&
            lastFetchedAt &&
            now - lastFetchedAt < CACHE_TTL;

        if (!isCacheValid) {
            lastDocRef.current = undefined;
            loadProducts(true);
        }
    }, []);


    useEffect(() => {
        if (prevQueryRef.current === undefined && prevCategoryRef.current === undefined) {
            prevQueryRef.current = query;
            prevCategoryRef.current = categoryId;
            return;
        }

        if (prevQueryRef.current === query && prevCategoryRef.current === categoryId) return;

        prevQueryRef.current = query;
        prevCategoryRef.current = categoryId;

        requestIdRef.current++;
        isFetchingRef.current = false;
        lastDocRef.current = undefined;

        dispatch(resetProduct());
        loadProducts(true);
    }, [query, categoryId]);


    useEffect(() => {
        const handleScroll = () => {
            if (isFetchingRef.current || !hasMore) return;

            const { scrollY, innerHeight } = window;
            const { scrollHeight } = document.documentElement;

            if (scrollY + innerHeight >= scrollHeight - 200) {
                loadProductsRef.current();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore]);


    const fetchMore = () => {
        if (isFetchingRef.current || !hasMore) return;
        loadProductsRef.current();
    };

    return {
        products,
        categories,
        error,
        loading,
        hasMore,
        searchQuery,
        setSearchQuery: (q: string) => dispatch(setSearchQuery(q)),

        categoryId,
        setCategoryId: (id: number | null) => dispatch(setCategoryId(id)),

        fetchMore,
    };
};