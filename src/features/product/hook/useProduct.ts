import { useCallback, useEffect, useRef } from "react";
import {
    addProducts,
    fetchCategories,
    resetProduct,
    setCategoryId,
    setProductsError,
    setProductsLoading,
    setSearchQuery,
    setPriceRange,
    setSortBy,
    setSortOrder,
} from "../productSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { fetchProductsFromFirestore } from "../productFirebaseServices";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const LIMIT_COUNT = 20;
export const useProduct = () => {
    const dispatch = useAppDispatch();

    const {
        categories,
        error,
        loading,
        products,
        hasMore,
        searchQuery,
        categoryId,
        priceRange,
        sortBy,
        sortOrder,
    } = useAppSelector((state) => state.product);

    const query = useDebounce(searchQuery, 500);
    const categoryQuery = useDebounce(categoryId?.join(","), 500);
    const priceQuery = useDebounce(priceRange?.join(","), 500);
    const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | undefined>(
        undefined
    );

    const isFetchingRef = useRef(false);
    const requestIdRef = useRef(0);
    const prevQueryRef = useRef<string | undefined>(undefined);
    const prevCategoryRef = useRef<number[] | null | undefined>(undefined);
    const prevPriceRef = useRef<string | null | undefined>(undefined);
    const prevSortByRef = useRef<string | undefined>(undefined);
    const prevSortOrderRef = useRef<string | undefined>(undefined);



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
                categoryId: categoryId?.map((id) => Number(id)),
                minPrize: priceRange ? priceRange[0] : undefined,
                maxPrize: priceRange ? priceRange[1] : undefined,
                limitCount: LIMIT_COUNT,
                sortBy,
                sortOrder,
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
    }, [query, categoryQuery, priceQuery, sortBy, sortOrder, hasMore]);


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
        dispatch(resetProduct());
        lastDocRef.current = undefined;
        loadProducts(true);
    }, []);


    useEffect(() => {
        if (
            prevQueryRef.current === undefined &&
            prevCategoryRef.current?.join(",") === categoryId?.join(",") &&
            prevPriceRef.current === priceQuery &&
            prevSortByRef.current === sortBy &&
            prevSortOrderRef.current === sortOrder
        ) {
            prevQueryRef.current = query;
            prevCategoryRef.current = categoryId;
            prevPriceRef.current = priceQuery;
            prevSortByRef.current = sortBy;
            prevSortOrderRef.current = sortOrder;
            return;
        }

        if (
            prevQueryRef.current === query &&
            prevCategoryRef.current?.join(",") === categoryId?.join(",") &&
            prevPriceRef.current === priceQuery &&
            prevSortByRef.current === sortBy &&
            prevSortOrderRef.current === sortOrder
        ) return;

        prevQueryRef.current = query;
        prevCategoryRef.current = categoryId;
        prevPriceRef.current = priceQuery;
        prevSortByRef.current = sortBy;
        prevSortOrderRef.current = sortOrder;

        requestIdRef.current++;
        isFetchingRef.current = false;
        lastDocRef.current = undefined;

        dispatch(resetProduct());
        loadProducts(true);
    }, [query, categoryId, priceQuery, sortBy, sortOrder]);


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
        setCategoryId: (id: number[] | null) => dispatch(setCategoryId(id)),

        priceRange,
        setPriceRange: (range: [number, number] | null) => dispatch(setPriceRange(range)),

        sortBy,
        setSortBy: (sort: "title" | "price" | "rating" | "createdAt") => dispatch(setSortBy(sort)),

        sortOrder,
        setSortOrder: (order: "asc" | "desc") => dispatch(setSortOrder(order)),

        fetchMore,
    };
};