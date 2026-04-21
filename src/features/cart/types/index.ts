import type { Timestamp } from "firebase/firestore";
import type { Product } from "../../product/types";

export interface CartData {
    product: Product;
    sizes: string ;
    quantity: number;
    createdAt?: Timestamp
    updatedAt?: Timestamp
}
export interface CartState {
    items: CartData[];
    loading: boolean;
    error: string | null;
}

export interface CartDecData {
    uid: string;
    slug: string;
    sizes: string;
    qty: number;
}

export interface CartUpdateData {
    uid: string;
    slug: string;
    sizes: string;
    qty: number;
}


export interface AddToCartData {
    uid: string;
    product: Product;
    quantity: number;
    sizes: string;
}

export interface ItemRemoveData{
    uid: string;
    slug: string;
    sizes: string;
}