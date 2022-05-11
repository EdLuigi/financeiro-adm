import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const adicionar = (id, tipo, valor) => {
    return addDoc(collection(db, "lancamentos"), {
        uid: id,
        tipo: Number(tipo),
        valor: Number(valor),
        criado_em: serverTimestamp(),
    });
};
