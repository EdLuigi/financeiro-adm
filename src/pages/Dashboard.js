import React, { useEffect, useState } from "react";
import { listar } from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { deletar } from "../firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import Ola from "../components/Ola";
import ListarLancamentos from "../components/ListarLancamentos";

export default function Dashboard() {
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentosFiltrado, setLancamentosFiltrado] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState();
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
            setLoading(true);
            await deletar(i.id);

            //Editar arrays
            let arr = [...lancamentos];
            let arrf = [...lancamentosFiltrado];
            var index = arr.indexOf(i);
            arr.splice(index, 1);
            setLancamentos(arr);

            var indexf = arrf.indexOf(i);
            arrf.splice(indexf, 1);
            setLancamentosFiltrado(arrf);

            // Editar contador
            if (i.tipo == 0) {
                setEntradas(entradas - 1);
            } else {
                setSaidas(saidas - 1);
            }
        } catch (error) {
            console.log("erro: " + error);
        }
        setLoading(false);
    };

    const sortDatas = (arr) => {
        return [...arr].sort(
            (a, b) => a.criado_em.toDate() < b.criado_em.toDate()
        );
    };

    const handleLancamentosFiltrado = (arr) => {
        setLancamentosFiltrado(arr);
        return arr;
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");

            const data = await listar(currentUser.uid);

            setLancamentos(
                handleLancamentosFiltrado(
                    sortDatas(
                        contarEntradasSaidas(
                            data.docs.map((doc) => ({
                                ...doc.data(),
                                id: doc.id,
                            }))
                        )
                    )
                )
            );

            setMensagem("- Você não possui lançamentos -");
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
            {entradas === -1 ? (
                <div className="w-100 text-center mt-5 pt-4">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                    ></Spinner>
                    <h5 className="mt-3">Carregando dados...</h5>
                </div>
            ) : (
                <Container className=" align-items-center justify-content-center p-4">
                    <Ola
                        email={currentUser.email}
                        entradas={entradas}
                        saidas={saidas}
                    />

                    <ListarLancamentos
                        lancamentos={lancamentos}
                        lancamentosFiltrado={lancamentosFiltrado}
                        mensagem={mensagem}
                        handleDelete={handleDelete}
                        loading={loading}
                        handleLancamentosFiltrado={handleLancamentosFiltrado}
                    />
                </Container>
            )}
        </>
    );
}
