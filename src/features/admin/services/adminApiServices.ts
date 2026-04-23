import { addDoc, collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import axiosInstance from "../../../utils/axiosInstance";
import { db } from "../../../config/firebaseConfigure";
import type { AddProductData, FireStoreProductModel } from "../types";
import type { Product } from "../../product/types";


export const addProduct = async (product: AddProductData, uid: string) => {
    try {
        const response = await axiosInstance.post("/products", product);

        const data = response.data;
        console.log(data);


        const now = new Date();
        const firestoreProduct = {
            id: Number(data.id),
            title: String(data.title),
            slug: data.slug,
            price: data.price,
            description: data.description,

            categoryId: data.category?.id,
            categoryName: data.category?.name,

            images: data.images || [],

            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };

        const collRef = collection(db, "users", uid, "products")
        await addDoc(collRef, firestoreProduct);

        return { data, firestoreProduct: { ...firestoreProduct, createdAt: now.toISOString(), updatedAt: now.toISOString() } };

    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const getMyProducts = async (uid: string): Promise<FireStoreProductModel[]> => {
    try {
        const collRef = collection(db, "users", uid, "products");
        const q = query(collRef, orderBy("createdAt", "desc"))
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            console.log(data);

            return { ...data } as FireStoreProductModel;
        });
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateProduct = async (product: Partial<AddProductData>, productId: number, uid: string) => {
    try {
        const response = await axiosInstance.put(`/products/${productId}`, product);
        const data = response.data as Product;


        const collRef = collection(db, "users", uid, "products");
        const snapshot = await getDocs(query(collRef));

        let docId: string | null = null;
        let existingProduct: any = null;
        snapshot.docs.forEach(doc => {
            if (doc.data().id === productId) {
                docId = doc.id;
                existingProduct = doc.data();
            }
        });

        if (!docId) {
            throw new Error(`Product with id ${productId} not found in Firestore`);
        }

        const firestoreProduct = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            price: data.price,
            description: data.description,
            categoryId: data.category?.id,
            categoryName: data.category?.name,
            images: data.images || [],
            createdAt: existingProduct.createdAt.toString(),
            updatedAt: Timestamp.now(),
        };

        const docRef = doc(db, "users", uid, "products", docId);
        await updateDoc(docRef, firestoreProduct);

        return { data, firestoreProduct: { ...firestoreProduct } };
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const deleteProduct = async (productId: number, uid: string) => {
    try {
        await axiosInstance.delete(`/products/${productId}`);

        const collRef = collection(db, "users", uid, "products");
        const snapshot = await getDocs(query(collRef));

        let docId: string | null = null;
        snapshot.docs.forEach(doc => {
            if (doc.data().id === productId) {
                docId = doc.id;
            }
        });

        if (docId) {
            const docRef = doc(db, "users", uid, "products", docId);
            await deleteDoc(docRef);
        }

        return productId;
    } catch (error) {
        throw new Error(`${error}`);
    }
};