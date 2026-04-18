import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductBySlug, fetchRelatedProduct } from "../services/productApiServices";
import type { Product } from "../types";

export const useProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProduct, setRelatedProduct] = useState<Product[] | []>([]);
    const [loading, setLoading] = useState(false);


    const [slug, setSlug] = useState<string | null>(
        location.pathname.split("/").findLast(Boolean) as string,
    );

    const fetProduct = async () => {

        setLoading(true);
        try {
            
            const data = await fetchProductBySlug(slug);
            const relatedData = await fetchRelatedProduct(slug);
            
            setRelatedProduct(relatedData);
            setProduct(data);
            setLoading(false);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSlug(location.pathname.split("/").findLast(Boolean) as string);
        fetProduct();
    }, [slug, location]);
    const pImages = product?.images || [];

    // form mobile
    const [currentIdx, setCurrentIdx] = useState(0);

    const nextImg = () => {
        setCurrentIdx(currentIdx + 1);
        if (currentIdx >= pImages.length - 1) {
            setCurrentIdx(0);
        }
    };
    const prevImg = () => {
        setCurrentIdx(currentIdx - 1);
        if (currentIdx <= 0) {
            setCurrentIdx(pImages.length - 1);
        }
    };





    return {
        navigate,
        relatedProduct,
        pImages,
        currentIdx,
        loading,
        nextImg,
        prevImg,
        product
    }
}