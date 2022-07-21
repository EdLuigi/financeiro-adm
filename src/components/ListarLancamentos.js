import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Paginate from "./Paginate";

export default function ListarLancamentos(props) {
    const {
        lancamentos,
        lancamentosFiltrado,
        mensagem,
        loading,
        handleLancamentosFiltrado,
        handleDelete,
    } = props;

    const navigate = useNavigate();
    const handleFiltro = (e) => {
        const filtro = e.target.value;
        if (filtro == 0) filtroTodos();
        if (filtro == 1) filtroEntradas();
        if (filtro == 2) filtroSaidas();
        if (filtro == 3) filtroTodosAntigas();
        if (filtro == 4) filtroEntradasAntigas();
        if (filtro == 5) filtroSaidasAntigas();
        navigate(`/`);
    };

    const filtroTodos = () => {
        handleLancamentosFiltrado(lancamentos);
    };

    const filtroEntradas = () => {
        const newArr = [...lancamentos].filter((i) => i.tipo == 0);
        handleLancamentosFiltrado(newArr);
    };

    const filtroSaidas = () => {
        const newArr = [...lancamentos].filter((i) => i.tipo == 1);
        handleLancamentosFiltrado(newArr);
    };

    const filtroTodosAntigas = () => {
        const newArr = [...lancamentos].sort(
            (a, b) => a.criado_em.toDate() > b.criado_em.toDate()
        );
        handleLancamentosFiltrado(newArr);
    };

    const filtroEntradasAntigas = () => {
        const newArr = [...lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 0);
        handleLancamentosFiltrado(newArr);
    };

    const filtroSaidasAntigas = () => {
        const newArr = [...lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 1);
        handleLancamentosFiltrado(newArr);
    };

    return (
        <>
            <Card className="p-4">
                <Card.Body style={{ paddingInline: "50px" }}>
                    <div>
                        <h2 className="mb-4">Lista de Lançamentos</h2>
                    </div>

                    <div>
                        <label style={{ marginRight: "10px" }}>
                            <h6>Filtro:</h6>
                        </label>
                        <select onChange={(e) => handleFiltro(e)}>
                            <option value={0}>Todos</option>
                            <option value={1}>Entradas</option>
                            <option value={2}>Saídas</option>
                            <option value={3}>Todos (mais antigas)</option>
                            <option value={4}>Entradas (mais antigas)</option>
                            <option value={5}>Saídas (mais antigas)</option>
                        </select>
                        <Button
                            onClick={() => navigate("/inserir-lancamento")}
                            style={{ marginLeft: "15px" }}
                        >
                            Adicionar
                        </Button>
                    </div>

                    <div>
                        {lancamentosFiltrado.length == 0 ? (
                            <div className="d-flex justify-content-center align-content-center mt-5">
                                <h5 style={{ color: "grey" }}>{mensagem}</h5>
                            </div>
                        ) : (
                            <div>
                                <Paginate
                                    data={lancamentosFiltrado}
                                    handleDelete={handleDelete}
                                    loading={loading}
                                ></Paginate>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
