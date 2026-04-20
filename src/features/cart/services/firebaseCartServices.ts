import { collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore"
import { fireStore } from "../../../config/firebaseConfigure"
import type { CartData } from "../types";


export const getCartProducts = async (userId: string) => {
    const cartRef = collection(fireStore, "users", userId, "cart");

    const snapshot = await getDocs(cartRef);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            cid: doc.id,
            product: data.product,
            sizes: data.sizes,
            quantity: data.quantity
        } as CartData


    });
};

export const addProductInCart = async (uid: string, slug: string, data: CartData) => {
    try {

        const cartRef = doc(fireStore, "users", uid, "cart", `${slug}_${data.sizes}`)

        const snapshot = await getDoc(cartRef);


        if (snapshot.exists()) {
            await updateDoc(cartRef, {
                ...data,
                quantity: increment(data.quantity ?? 1)
            });
        } else {

            await setDoc(cartRef, {
                ...data,
                quantity: data.quantity ?? 1,

            }, { merge: true })

        }
    } catch (error) {
        throw error
    }

}

export const removeProductFromCart = async () => { }

export const clearCart = async () => {

}