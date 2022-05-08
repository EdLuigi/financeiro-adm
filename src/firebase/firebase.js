import React, { useEffect, useState } from "react";
import { auth } from "./config";

export function Auth() {
    return {};
}

export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};
export const cadastrar = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};
export const logout = () => {
    return auth.signOut();
};
export const recuperarSenha = (email) => {
    return auth.sendPasswordResetEmail(email);
};
export const useCurrentUser = () => {
    // const [currentUser, setCurrentUser] = useState();
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         setCurrentUser(user);
    //         // setLoading(false);
    //     });
    //     return unsubscribe;
    // }, []);
    // return currentUser;
};

export function DB() {
    return {};
}
