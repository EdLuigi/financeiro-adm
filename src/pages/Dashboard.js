import React, { useEffect, useState } from "react";
import {
    listarEntradas,
    listarSaidas,
    listarTodos,
} from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { deletar } from "../firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import Ola from "../components/Ola";
import ListarLancamentos from "../components/ListarLancamentos";

export default function Dashboard() {
    const [lancamentos, setLancamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [filtro, setFiltro] = useState(0);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [entradas, setEntradas] = useState(-1);
    const [saidas, setSaidas] = useState(-1);

    const contarEntradasSaidas = (arr) => {
        let a = 0,
            b = 0;
        arr.map((i) => {
            i.tipo == 0 ? a++ : b++;
        });
        setEntradas(a);
        setSaidas(b);
        return arr;
    };

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
                    contarEntradasSaidas(
                        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    )
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
            {entradas === -1 ? (
                <div className="w-100 text-center mt-5 pt-4">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                    ></Spinner>
                    <h5 className="mt-3">Carregando dados</h5>
                </div>
            ) : (
                <Container
                    // style={{ padding: "40px" }}
                    className=" align-items-center justify-content-center p-4"
                >
                    {/* <div> */}
                    <Ola
                        email={currentUser.email}
                        entradas={entradas}
                        saidas={saidas}
                    />
                    {/* </div> */}

                    {/* <div> */}
                    <ListarLancamentos
                        handleFiltro={handleFiltro}
                        lancamentos={lancamentos}
                        mensagem={mensagem}
                        handleDelete={handleDelete}
                        loading={loading}
                    />
                    {/* </div> */}
                </Container>
            )}
        </>
    );
}
