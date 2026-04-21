import axiosInstance from "../../../utils/axiosInstance"

export const fetchProductByCategory = async (categorySlug: string) => {
    try {
        const params = new URLSearchParams({
            // offset: String(offset),
            // limit: String(limit),
            ...(categorySlug.trim() && { categorySlug: categorySlug }),
            
            
        })
        const res = await axiosInstance.get(`products?${params}`)
        return res.data;

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong fetch products")
    }
}

export const fetchProductBySlug = async (slug: string | null) => {
    try {

        const res = await axiosInstance.get(`products/slug/${slug}`);
        return res.data
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong fetch products")

    }
}
export const fetchRelatedProduct = async (slug: string | null) => {
    try {

        const res = await axiosInstance.get(`products/slug/${slug}/related`);
        return res.data
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong fetch products")

    }
}