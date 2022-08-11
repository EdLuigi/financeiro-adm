import React, { useEffect, useState } from "react";
import DashboardTest from "../../DashboardNovo/DashboardTest";
import { useAuth } from "../../firebase/authContext";
import { deletar } from "../../firebase/firestore";
import { listar } from "../../firebase/firestore";

export default function Dashboard() {
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentosFiltrado, setLancamentosFiltrado] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState();
    const { currentUser, atualizar } = useAuth();

    const sortDatas = (arr) => {
        return [...arr].sort(
            (a, b) => a.criado_em.toDate() < b.criado_em.toDate()
        );
    };

    const handleLancamentosFiltrado = (arr) => {
        setLancamentosFiltrado(arr);
        return arr;
    };

    const updateUserName = async () => {
        if (currentUser.displayName == null) {
            if (sessionStorage.getItem("userNameSignUp") != null) {
                const nomeCompleto = sessionStorage.getItem("userNameSignUp");
                await atualizar(nomeCompleto);
                sessionStorage.removeItem("userNameSignUp");
            } else {
                await atualizar(currentUser.email);
            }
        }
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");
            setLoading(true);

            const data = await listar(currentUser.uid);

            await updateUserName();

            await setLancamentos(
                handleLancamentosFiltrado(
                    sortDatas(
                        data.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }))
                    )
                )
            );

            setMensagem("- Você não possui lançamentos -");
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <DashboardTest
                data={lancamentos}
                data5={lancamentos.slice(0, 5)}
                loading={loading}
            />
        </div>
    );
}
