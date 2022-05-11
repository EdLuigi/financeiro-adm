import React, { useEffect, useState } from "react";
import { listar } from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { Link } from "react-router-dom";
import { deletar } from "../firebase/firestore";

export default function ListarLancamentos() {
    const { currentUser } = useAuth();
    const [lancamentos, setLancamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const handleDelete = async (i) => {
        try {
            setSucesso(false);
            setLoading(true);
            setErro("");

            await deletar(i.id);
            fetchData();
            setSucesso(true);
        } catch (error) {
            console.log("erro: " + error);
        }
        setLoading(false);
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");

            const data = await listar(currentUser.uid);
            setLancamentos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );

            setMensagem("Você não possui lançamentos");
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h2>Lista de Lançamentos</h2>
            </div>
            <Link to="/">Voltar</Link>.........
            <Link to="/inserir-lancamento">Inserir Lançamento</Link>
            <br />
            <br />
            <div>
                {lancamentos.length == 0 ? (
                    <div>
                        {/* <h4>Você não possui lançamentos</h4> */}
                        {/* <h4>Carregando...</h4> */}
                        <h4>{mensagem}</h4>
                    </div>
                ) : (
                    <div>
                        {lancamentos.map((i) => (
                            <div key={i.id}>
                                {/* id: {i.id}
                                <br /> */}
                                tipo: {i.tipo == 0 ? "Entrada" : "Saída"}
                                <br />
                                valor: {i.valor},00
                                <br />
                                {/* criado em: {i.criado_em}
                                <br /> */}
                                <button
                                    onClick={() => {
                                        handleDelete(i);
                                    }}
                                    disabled={loading}
                                >
                                    Deletar
                                </button>
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
