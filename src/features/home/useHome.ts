import { useEffect, useRef, useState } from "react";
import { fetchProductsFromFirestore } from "../product/productFirebaseServices";
import type { Product } from "../product/productTypes";

export const useHome = () => {
    const [homeProducts, setHomeProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const hasFetched = useRef(false); 

    const fetchHomeProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchProductsFromFirestore({ limitCount: 10 });
            setHomeProducts(data.products);
        } catch (error) {
            console.error("Failed to fetch home products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return; 
        console.log(hasFetched.current);
        
        hasFetched.current = true;
        console.log(hasFetched.current);

        fetchHomeProducts();
    }, []);

    return {
        homeProducts,
        loading,
    };
};