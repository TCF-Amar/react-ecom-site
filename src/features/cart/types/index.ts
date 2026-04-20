import type { Product } from "../../product/types";

export interface CartData {
    cid?: string;
    product: Product;
    sizes: string ;
    quantity: number;
}