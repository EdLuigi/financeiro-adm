import React from "react";
import { Button, Card } from "react-bootstrap";
import * as moment from "moment";

export default function ListagemCard(props) {
    const deletar = () => {
        props.handleDelete(props.i);
    };

    return (
        <>
            <Card border="primary" className="w-25 mt-3 text-center ">
                <Card.Body>
                    <h6>
                        Tipo:
                        {props.i.tipo == 0 ? " Entrada" : " Saída"}
                    </h6>
                    <h6>Valor: {props.i.valor},00</h6>
                    <h6>
                        Data:
                        {" " +
                            moment(props.i.criado_em.toDate()).format(
                                "DD/MM/YYYY"
                            )}
                    </h6>
                </Card.Body>
                <Card.Body
                    style={{
                        backgroundColor: "#dedededd",
                        textAlign: "center",
                    }}
                >
                    <Button
                        variant="danger"
                        onClick={deletar}
                        disabled={props.loading}
                    >
                        Deletar
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}
