import React from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import * as moment from "moment";
import NumberFormat from "react-number-format";

export default function ListagemCard(props) {
    const { i, handleDelete, loading } = props;
    const deletar = () => {
        handleDelete(i);
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Card className="w-100 mt-3 text-center">
                <Container
                    style={
                        i.tipo == 0
                            ? { backgroundColor: "#d5f2d5" }
                            : { backgroundColor: "#f9cccc" }
                    }
                    className="d-flex align-items-center justify-content-center p-0"
                >
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Tipo:</strong>
                        {i.tipo == 0 ? " Entrada" : " Saída"}
                    </Card.Body>
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Valor: </strong>
                        <NumberFormat
                            value={i.valor}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"R$"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType={"text"}
                        />
                    </Card.Body>
                    <Card.Body style={{ width: "100%" }}>
                        <strong>Data:</strong>
                        {" " +
                            moment(i.criado_em.toDate()).format("DD/MM/YYYY")}
                    </Card.Body>
                </Container>
            </Card>
            <Card style={{ marginInline: "20px" }} className="mt-3">
                <Button variant="danger" onClick={deletar} disabled={loading}>
                    {loading ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        "X"
                    )}
                </Button>
            </Card>
        </div>
    );
}
