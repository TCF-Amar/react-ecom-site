import axiosInstance from "../../../utils/axiosInstance"

export const fetchProductByCategory = async (categorySlug: string) => {
    try {
        const res = await axiosInstance.get(`products?categorySlug=${categorySlug}`)
        return res.data;

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong fetch products")
    }
}

export const fetchProductBySlug = async (slug: string) => {
    try {

        const res = await axiosInstance.get(`products/slug/${slug}`);
        return res.data
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong fetch products")

    }
}