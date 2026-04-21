import { collection, deleteDoc, doc, getDoc, getDocs, increment, orderBy, query, setDoc, updateDoc } from "firebase/firestore"
import { fireStore } from "../../../config/firebaseConfigure"
import type { CartData, CartUpdateData, ItemRemoveData } from "../types";


export const getCartProducts = async (userId: string) => {

    const cartRef = collection(fireStore, "users", userId, "cart");

    const q = query(cartRef, orderBy("createdAt", "desc"))

    console.log(q);
    
    const snapshot = await getDocs(q);
    console.log(snapshot.docs);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            cid: doc.id,
            product: data.product,
            sizes: data.sizes,
            quantity: data.quantity,

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
                quantity: increment(data.quantity ?? 1),
                
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

export const updateQty = async (updData: CartUpdateData) => {
    try {
        const cartRef = doc(fireStore, "users", updData.uid, "cart", `${updData.slug}_${updData.sizes}`);

        const snap = await getDoc(cartRef)
        console.log(snap.data());

        if (!snap.exists()) return;

        const data = snap.data();
        const cartData = {
            product: data!.product,
            sizes: data.sizes,
            quantity: updData.qty
            
        }
        await updateDoc(cartRef, cartData)

    } catch (error) {
        throw error;
    }



}

export const removeProductFromCart = async (rmv: ItemRemoveData) => {
    try {

        const cartRef = doc(fireStore, "users", rmv.uid, "cart", `${rmv.slug}_${rmv.sizes}`)

        await deleteDoc(cartRef);

    } catch (error) {
        throw error;
    }
}

export const clearCartAllItems = async (items: CartData[], uid: string) => {

    try {
        for (let i in items) {

            const cartRef = doc(fireStore, "users", uid, "cart", `${items[i].product.slug}_${items[i].sizes}`)
            await deleteDoc(cartRef);

        }

    } catch (error) {
        throw error
    }

}