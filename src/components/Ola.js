import React from "react";
import { Card } from "react-bootstrap";

export default function Ola(props) {
    return (
        <>
            <div>
                <Card className="mb-4 p-3">
                    <Card.Body style={{ paddingInline: "50px" }}>
                        <h2 className="mb-4">Olá, {props.email}</h2>
                        <h5
                            style={{
                                color: "grey",
                                fontSize: "18px",
                                marginRight: "10px",
                            }}
                        >
                            Você possui {props.entradas}
                            {props.entradas == 1
                                ? " entrada"
                                : " entradas"} e {props.saidas}{" "}
                            {props.saidas == 1 ? "saída" : "saídas"}
                        </h5>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
