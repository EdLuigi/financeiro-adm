import React, { useContext, useEffect, useState } from "react";
import { auth } from "./config";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function cadastrar(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function atualizarPerfil(name, photo) {
        return currentUser.updateProfile({
            displayName: name,
            photoURL: photo,
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function recuperarSenha(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function atualizarEmail(newEmail) {
        return currentUser.updateEmail(newEmail);
    }

    function atualizarSenha(newPassword) {
        return currentUser.updatePassword(newPassword);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        cadastrar,
        atualizarPerfil,
        login,
        logout,
        recuperarSenha,
        atualizarEmail,
        atualizarSenha,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
