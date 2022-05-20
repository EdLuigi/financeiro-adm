import React from "react";
import { Card } from "react-bootstrap";
import ListagemCard from "./ListagemCard";

export default function ListarLancamentos(props) {
    const handleFiltro = (e) => {
        props.handleFiltro(e);
    };

    const handleDelete = () => {
        props.handleDelete();
    };

    return (
        <>
            <Card className="w-100 p-4">
                <Card.Body>
                    <div>
                        <h2 className="mb-4">Lista de Lançamentos</h2>
                    </div>

                    <label style={{ marginRight: "10px" }}>
                        <h6>Filtro:</h6>
                    </label>
                    <select
                        value={props.filtro}
                        onChange={(e) => handleFiltro(e)}
                    >
                        <option value={0}>Todos</option>
                        <option value={1}>Entradas</option>
                        <option value={2}>Saídas</option>
                    </select>

                    <div>
                        {props.lancamentos.length == 0 ? (
                            <div>
                                <h4>{props.mensagem}</h4>
                            </div>
                        ) : (
                            <div style={{ alignContent: "center" }}>
                                {props.lancamentos.map((i) => (
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
