import { addDoc, collection, } from "firebase/firestore";
import axiosInstance from "../../../utils/axiosInstance";
import { db } from "../../../config/firebaseConfigure";



export interface AddProductData{
    title: string;
    price: number;
    description: string;
    categoryId: number | null;
    images: string[] 
}
export interface FireStoreProductModel{
    id?: string;
    productId: number;
    title: string;
    slug: string;
    description:string
    categoryId: number;
    images: string[];
    createdAt: Date
    updatedAt: Date
}

export const addProduct = async (product: AddProductData, uid:string) => {
    try {
        const response = await axiosInstance.post("/products", product);

        const data = response.data;
        console.log(data);
        

        const firestoreProduct = {
            productId: data.id,
            title: data.title,
            slug: data.slug,
            price: data.price,
            description: data.description,

            categoryId: data.category?.id,
            categoryName: data.category?.name,

            images: data.images || [],

            createdAt: new Date(data.creationAt),
            updatedAt: new Date(data.updatedAt),
        } as FireStoreProductModel ;

        const collRef = collection(db,"users",uid, "products")
        const docRef = await addDoc(collRef, firestoreProduct);

        return {data, firestoreProduct: { ...firestoreProduct, id: docRef.id }};

    } catch (error:any) {
        console.error("Product create failed", error);
        throw new Error(error.message);
    }
};