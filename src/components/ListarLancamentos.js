import React from "react";
import { Card } from "react-bootstrap";
import ListagemCard from "./ListagemCard";

export default function ListarLancamentos(props) {
    const handleFiltro = (e) => {
        const filtro = e.target.value;
        if (filtro == 0) filtroTodos();
        if (filtro == 1) filtroEntradas();
        if (filtro == 2) filtroSaidas();
        if (filtro == 3) filtroTodosAntigas();
        if (filtro == 4) filtroEntradasAntigas();
        if (filtro == 5) filtroSaidasAntigas();
    };

    const filtroTodos = () => {
        props.handleLancamentosFiltrado(props.lancamentos);
    };

    const filtroEntradas = () => {
        const newArr = [...props.lancamentos].filter((i) => i.tipo == 0);
        props.handleLancamentosFiltrado(newArr);
    };

    const filtroSaidas = () => {
        const newArr = [...props.lancamentos].filter((i) => i.tipo == 1);
        props.handleLancamentosFiltrado(newArr);
    };

    const filtroTodosAntigas = () => {
        const newArr = [...props.lancamentos].sort(
            (a, b) => a.criado_em.toDate() > b.criado_em.toDate()
        );
        props.handleLancamentosFiltrado(newArr);
    };

    const filtroEntradasAntigas = () => {
        const newArr = [...props.lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 0);
        props.handleLancamentosFiltrado(newArr);
    };

    const filtroSaidasAntigas = () => {
        const newArr = [...props.lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 1);
        props.handleLancamentosFiltrado(newArr);
    };

    const handleDelete = () => {
        props.handleDelete();
    };

    return (
        <>
            <Card className="p-4">
                <Card.Body style={{ paddingInline: "50px" }}>
                    <div>
                        <h2 className="mb-4">Lista de Lançamentos</h2>
                    </div>

                    <div style={{}}>
                        <label style={{ marginRight: "10px" }}>
                            <h6>Filtro:</h6>
                        </label>
                        <select
                            // value={props.filtro}
                            onChange={(e) => handleFiltro(e)}
                        >
                            <option value={0}>Todos</option>
                            <option value={1}>Entradas</option>
                            <option value={2}>Saídas</option>
                            <option value={3}>Todos (mais antigas)</option>
                            <option value={4}>Entradas (mais antigas)</option>
                            <option value={5}>Saídas (mais antigas)</option>
                        </select>
                    </div>

                    <div>
                        {props.lancamentosFiltrado.length == 0 ? (
                            <div>
                                <h4>{props.mensagem}</h4>
                            </div>
                        ) : (
                            <div>
                                {props.lancamentosFiltrado.map((i) => (
                                    <div key={i.id}>
                                        <ListagemCard
                                            i={i}
                                            handleDelete={props.handleDelete}
                                            loading={props.loading}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
