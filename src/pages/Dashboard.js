import React, { useEffect, useState } from "react";
import {
    listarEntradas,
    listarSaidas,
    listarTodos,
} from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { Link, useNavigate } from "react-router-dom";
import { deletar } from "../firebase/firestore";
import * as moment from "moment";
import { Button, Card, Spinner } from "react-bootstrap";

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
                <div style={{ padding: "40px" }}>
                    <div>
                        <Card className="mb-4 w-100 p-3">
                            <Card.Body>
                                <h2 className="mb-3">
                                    Olá, {currentUser.email}
                                </h2>
                                <h5
                                    style={{
                                        color: "grey",
                                        fontSize: "18px",
                                    }}
                                >
                                    Você possui {entradas}
                                    {entradas == 1
                                        ? " entrada"
                                        : " entradas"} e {saidas}{" "}
                                    {saidas == 1 ? "saída" : "saídas"}
                                </h5>
                            </Card.Body>
                        </Card>
                    </div>

                    <div>
                        <Card className="w-100 p-4">
                            <Card.Body>
                                <div>
                                    <h2>Lista de Lançamentos</h2>
                                </div>

                                <label style={{ marginRight: "10px" }}>
                                    <h6>Filtro:</h6>
                                </label>
                                <select
                                    value={filtro}
                                    onChange={(e) => handleFiltro(e)}
                                >
                                    <option value={0}>Todos</option>
                                    <option value={1}>Entradas</option>
                                    <option value={2}>Saídas</option>
                                </select>

                                <div>
                                    {lancamentos.length == 0 ? (
                                        <div>
                                            <h4>{mensagem}</h4>
                                        </div>
                                    ) : (
                                        <div style={{ alignContent: "center" }}>
                                            {lancamentos.map((i) => (
                                                <Card
                                                    border="primary"
                                                    className="w-25 mt-3 text-center "
                                                    key={i.id}
                                                >
                                                    <Card.Body>
                                                        <h6>
                                                            Tipo:
                                                            {i.tipo == 0
                                                                ? " Entrada"
                                                                : " Saída"}
                                                        </h6>
                                                        <h6>
                                                            Valor: {i.valor},00
                                                        </h6>
                                                        <h6>
                                                            Data:
                                                            {" " +
                                                                moment(
                                                                    i.criado_em.toDate()
                                                                ).format(
                                                                    "DD/MM/YYYY"
                                                                )}
                                                        </h6>
                                                    </Card.Body>
                                                    <Card.Body
                                                        style={{
                                                            backgroundColor:
                                                                "#dedededd",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => {
                                                                handleDelete(i);
                                                            }}
                                                            disabled={loading}
                                                        >
                                                            Deletar
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}
