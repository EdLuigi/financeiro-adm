import React, { useEffect, useState } from "react";
import {
    listarEntradas,
    listarSaidas,
    listarTodos,
} from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { Link } from "react-router-dom";
import { deletar } from "../firebase/firestore";
import * as moment from "moment";

export default function ListarLancamentos() {
    const { currentUser } = useAuth();
    const [lancamentos, setLancamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [filtro, setFiltro] = useState(0);

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

    const handleFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const sortDatas = (arr) => {
        return [...arr].sort(
            (a, b) => a.criado_em.toDate() < b.criado_em.toDate()
        );
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");
            // faz o "loading..." toda vez que atualiza
            // setLancamentos([]);

            let data;
            if (filtro == 0) data = await listarTodos(currentUser.uid);
            if (filtro == 1) data = await listarEntradas(currentUser.uid);
            if (filtro == 2) data = await listarSaidas(currentUser.uid);

            setLancamentos(
                sortDatas(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                )
            );

            setMensagem("Você não possui lançamentos");
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
        }
    };

    useEffect(() => {
        fetchData();
    }, [filtro]);

    return (
        <>
            <div>
                <h2>Lista de Lançamentos</h2>
            </div>
            <Link to="/">Voltar</Link>.........
            <Link to="/inserir-lancamento">Inserir Lançamentos</Link>
            <br />
            <br />
            <label>Filtro: </label>
            <select value={filtro} onChange={(e) => handleFiltro(e)}>
                <option value={0}>Todos</option>
                <option value={1}>Entradas</option>
                <option value={2}>Saídas</option>
            </select>
            <br />
            <br />
            <div>
                {lancamentos.length == 0 ? (
                    <div>
                        <h4>{mensagem}</h4>
                    </div>
                ) : (
                    <div>
                        {lancamentos.map((i) => (
                            <div key={i.id}>
                                tipo: {i.tipo == 0 ? "Entrada" : "Saída"}
                                <br />
                                valor: {i.valor},00
                                <br />
                                data:{" "}
                                {moment(i.criado_em.toDate()).format(
                                    "DD/MM/YYYY"
                                )}
                                <br />
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
