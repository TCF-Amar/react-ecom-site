import type { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";


export interface AuthState {
    firebaseUser: User | null;
    userData: UserData | null;
    loading: boolean;
    error: FirebaseError | any | null;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    id: number;
    username: string;
    email: string;
    password: string;
}


export interface UserData {
    uid: string;
    email: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

