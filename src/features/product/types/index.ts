export interface ProductState {
    // products: Product[];
    allProducts: Product[];
    categories: Category[];
    loading: boolean;
    error: Error | any | null;
    hasMore: boolean;
}

export interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    category: Category;
    images: string[];
    slug: string;
    creationAt: string;
    updatedAt: string;
}



