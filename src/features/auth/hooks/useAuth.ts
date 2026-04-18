import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { AuthState, LoginRequest, UserData } from "../types/authTypes";
import type { RegisterRequest } from "../types/authTypes";
import {
    fetchUserFromFireStore,

    signIn as signInService,
    signUp as signUpService,
    signOut as signOutService,
} from "../services/firebaseAuthServices";
import { auth } from "../../../config/firebaseConfigure";



export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
        firebaseUser: null,
        userData: null,
        loading: true,
        error: null,
    });



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = await fetchUserFromFireStore(firebaseUser.uid);
                setState(prev => ({
                    ...prev,
                    firebaseUser,
                    userData: userData as UserData | null,
                    loading: false,
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    firebaseUser: null,
                    userData: null,
                    loading: false,
                }));
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!state.error) return;

        const timer = setTimeout(() => {
            setState(prev => ({ ...prev, error: null }));
        }, 4000);

        return () => clearTimeout(timer);
    }, [state.error]);


    const myFun = useCallback(async (fn: () => Promise<void>) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            await fn();
        } catch (error: any) {
            setState(prev => ({ ...prev, error }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    }, []);

    const signInUser = (userData: LoginRequest) =>
        myFun(() => signInService(userData.email, userData.password))



    const signUpUser = (userData: RegisterRequest) =>
        myFun(() =>
            signUpService(userData.email, userData.password, userData.username)
        )


    const signOutUser = () => myFun(() => signOutService())





    return {
        user: state.userData,
        isAuthenticated: !!state.firebaseUser,
        loading: state.loading,
        error: state.error,
        signInUser,
        signUpUser,
        signOutUser,

    };
};