import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "./config";

export const adicionar = (id, tipo, valor) => {
    return addDoc(collection(db, "lancamentos"), {
        uid: id,
        tipo: Number(tipo),
        valor: Number(valor),
        criado_em: serverTimestamp(),
    });
};

export const listarTodos = (id) => {
    return getDocs(
        query(collection(db, "lancamentos"), where("uid", "==", id))
    );
};

export const listarEntradas = (id) => {
    return getDocs(
        query(
            collection(db, "lancamentos"),
            where("uid", "==", id),
            where("tipo", "==", 0)
        )
    );
};

export const listarSaidas = (id) => {
    return getDocs(
        query(
            collection(db, "lancamentos"),
            where("uid", "==", id),
            where("tipo", "==", 1)
        )
    );
};

export const deletar = (id) => {
    return deleteDoc(doc(db, "lancamentos", id));
};
