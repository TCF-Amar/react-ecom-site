import { addDoc, collection, getDocs, orderBy, query, updateDoc, deleteDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfigure";
import type { AddProductData, AddProductModel, FireStoreProductModel } from "./adminTypes";


const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but",
    "with", "without", "in", "on", "at", "by", "for", "to", "of",
    "is", "are", "was", "were",
    "this", "that", "these", "those"
]);

export function generateSearchKeywords(text: string): string[] {
    const cleaned = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "");

    const words = cleaned
        .split(/\s+/)
        .filter(word => word.length > 1 && !STOP_WORDS.has(word));

    const keywords = new Set<string>();

    words.forEach((word) => {
        let prefix = "";
        for (const char of word) {
            prefix += char;
            keywords.add(prefix);
        }
    });

    return Array.from(keywords);
}

export const createUniqueSlug = (text: string): string => {
    const baseSlug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");

    const uniqueId = Date.now().toString(36);

    return `${baseSlug}-${uniqueId}`;
};



export const addProduct = async (product: AddProductModel, uid: string) => {
    try {
        const id = Date.now();
        const slug = createUniqueSlug(product.title);
        const searchKeywords = generateSearchKeywords(product.title);
        const now = Timestamp.now();


        const firestoreProduct = {
            id,
            title: product.title,
            slug,
            price: Number(product.price),
            description: product.description,
            category: product.category,
            images: product.images || [],
            searchKeywords,
            createdAt: now,
            updatedAt: now
        };

        const globalProductsRef = collection(db, "products");
        await addDoc(globalProductsRef, firestoreProduct);

        const userProductsRef = collection(db, "users", uid, "products");
        await addDoc(userProductsRef, firestoreProduct);

        const nowISO = now.toDate().toISOString();

        return {
            data: firestoreProduct,
            firestoreProduct: {
                ...firestoreProduct,
                createdAt: nowISO,
                updatedAt: nowISO
            }
        };
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const getMyProducts = async (uid: string): Promise<FireStoreProductModel[]> => {
    try {
        const collRef = collection(db, "users", uid, "products");
        const q = query(collRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(docSnap => {
            const data = docSnap.data();
            return {
                ...data,
                createdAt: data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate().toISOString()
                    : data.createdAt ?? "",
                updatedAt: data.updatedAt instanceof Timestamp
                    ? data.updatedAt.toDate().toISOString()
                    : data.updatedAt ?? "",
            } as FireStoreProductModel;
        });
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateProduct = async (product: Partial<AddProductData>, productId: number, uid: string) => {
    try {
        const userProductsRef = collection(db, "users", uid, "products");
        const qUser = query(userProductsRef, where("id", "==", productId));
        const userSnapshot = await getDocs(qUser);

        if (userSnapshot.empty) {
            throw new Error(`Product with id ${productId} not found in user's Firestore`);
        }

        const userDoc = userSnapshot.docs[0];
        const existingProduct = userDoc.data();
        const now = Timestamp.now();

        const updateData: any = {
            updatedAt: now,
        };

        if (product.title !== undefined) {
            updateData.title = product.title;
            updateData.searchKeywords = generateSearchKeywords(product.title);
        }
        if (product.price !== undefined && product.price !== null) updateData.price = Number(product.price);
        if (product.description !== undefined) updateData.description = product.description;
        if (product.images !== undefined) updateData.images = product.images;

        // Update user's collection
        await updateDoc(userDoc.ref, updateData);

        // Update global collection
        const globalProductsRef = collection(db, "products");
        const qGlobal = query(globalProductsRef, where("id", "==", productId));
        const globalSnapshot = await getDocs(qGlobal);

        if (!globalSnapshot.empty) {
            await updateDoc(globalSnapshot.docs[0].ref, updateData);
        }

        const nowISO = now.toDate().toISOString();
        const finalProduct = { ...existingProduct, ...updateData };

        return {
            data: finalProduct,
            firestoreProduct: {
                ...finalProduct,
                createdAt: finalProduct.createdAt instanceof Timestamp ? finalProduct.createdAt.toDate().toISOString() : finalProduct.createdAt,
                updatedAt: nowISO
            }
        };
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const deleteProduct = async (productId: number, uid: string) => {
    try {
        // Delete from user's collection
        const userProductsRef = collection(db, "users", uid, "products");
        const qUser = query(userProductsRef, where("id", "==", productId));
        const userSnapshot = await getDocs(qUser);

        if (!userSnapshot.empty) {
            await deleteDoc(userSnapshot.docs[0].ref);
        }

        // Delete from global collection
        const globalProductsRef = collection(db, "products");
        const qGlobal = query(globalProductsRef, where("id", "==", productId));
        const globalSnapshot = await getDocs(qGlobal);

        if (!globalSnapshot.empty) {
            await deleteDoc(globalSnapshot.docs[0].ref);
        }

        return productId;
    } catch (error) {
        throw new Error(`${error}`);
    }
};