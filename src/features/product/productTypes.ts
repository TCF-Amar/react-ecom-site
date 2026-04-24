export interface ProductState {
    products: Product[];
    categories: Category[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    lastFetchedAt: number | null;
    searchQuery: string;
    categoryId: number | null;
}

export interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    createdAt: string;
    updatedAt: string;
    rating: number;
    reviewCount: number;
    
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    createdAt: any;
    updatedAt: any;
    isEdited: boolean;
    isDeleted: boolean;
    type?: "new" | "edited" | "deleted";

}

