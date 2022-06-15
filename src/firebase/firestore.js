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
        tipo: tipo,
        valor: valor,
        criado_em: serverTimestamp(),
    });
};

export const listar = (id) => {
    return getDocs(
        query(collection(db, "lancamentos"), where("uid", "==", id))
    );
};

export const deletar = (id) => {
    return deleteDoc(doc(db, "lancamentos", id));
};
