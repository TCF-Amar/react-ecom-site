import type { Timestamp } from "firebase/firestore";

export interface AddProductData {
    title: string;
    price: number | null;
    description: string;
    categoryId: number | null;
    images: string[]
}
export interface FireStoreProductModel {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string
    categoryId: number;
    images: string[];
    createdAt: Timestamp
    updatedAt: Timestamp
}