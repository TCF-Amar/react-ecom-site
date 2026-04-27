import type { Timestamp } from "firebase/firestore";
import type { Category } from "../product/productTypes";

export interface AddProductData {
    title: string;
    price: number | null;
    description: string;
    categoryId: number | null;
    images: string[];
}

export interface ProductPayload {
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export interface FireStoreProductModel {
    id: number;
    title: string;
    slug: string;
    price: number | null;
    description: string;
    category: Category | null;
    images: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}


