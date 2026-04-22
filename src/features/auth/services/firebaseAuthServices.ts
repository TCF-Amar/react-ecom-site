import { db } from './../../../config/firebaseConfigure';
import { auth, } from "../../../config/firebaseConfigure";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"
import type { UserData } from '../types/authTypes';



export const signIn = async (email: string, password: string) => {
    try {
       
        await signInWithEmailAndPassword(auth, email, password);
        return;
    } catch (error) {
        throw error;
    }
}


export const signUp = async (email: string, password: string, username: string) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData: UserData = {
            uid: user.uid,
            email: user.email,
            displayName: username,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        await storeUserInFireStore(user.uid, userData);
        return;

    } catch (error) {
        throw error;
    }

}
export const storeUserInFireStore = async (uid: string, user: object) => {
    try {
        await setDoc(doc(db, "users", uid), user)
    } catch (error) {
        throw error;
    }
}

export const fetchUserFromFireStore = async (uid: string) => {
    try {
        const docSnap = await getDoc(doc(db, "users", uid));
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


export const signOut = async () => {
    try {
        await auth.signOut();
        return;
    } catch (error) {
        throw error;
    }
}




// export const signInGoogle = async () => {
//     try {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;


//         const docSnap = await getDoc(doc(db, "users", user.uid));
//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             const userData: UserData = {
//                 uid: data.uid || user.uid,
//                 email: data.email || user.email,
//                 displayName: data.displayName || user.displayName,
//                 photoURL: data.photoURL || user.photoURL,
//                 createdAt: data.createdAt || new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             }
//             await storeUserInFireStore(user.uid, userData);
//             return true;
//         } else {
//             const userData: UserData = {
//                 uid: user.uid,
//                 email: user.email,
//                 displayName: user.displayName,
//                 photoURL: user.photoURL,
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             };
//             await storeUserInFireStore(user.uid, userData);
//             return false;
//         }

//     } catch (error:any) {
//         console.log(error.code);
//         throw error;
//     }
// }

