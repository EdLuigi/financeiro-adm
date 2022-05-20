import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import * as moment from "moment";

export default function ListagemCard(props) {
    const deletar = () => {
        props.handleDelete(props.i);
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Card className="w-75 mt-3 text-center">
                <Container
                    style={
                        props.i.tipo == 0
                            ? { backgroundColor: "#d5f2d5" }
                            : { backgroundColor: "#f9cccc" }
                    }
                    className="d-flex align-items-center justify-content-center p-0"
                >
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Tipo:</strong>
                        {props.i.tipo == 0 ? " Entrada" : " Saída"}
                    </Card.Body>
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Valor:</strong> {props.i.valor.toFixed(2)}
                    </Card.Body>
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Data:</strong>
                        {" " +
                            moment(props.i.criado_em.toDate()).format(
                                "DD/MM/YYYY"
                            )}
                    </Card.Body>
                </Container>
            </Card>
            <Card style={{ marginInline: "20px" }} className="mt-3">
                <Button
                    variant="danger"
                    onClick={deletar}
                    disabled={props.loading}
                >
                    X
                </Button>
            </Card>
        </div>
    );
}
