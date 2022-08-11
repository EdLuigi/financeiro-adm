import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import NumberFormat from "react-number-format";
import { Spinner } from "react-bootstrap";

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits(props) {
    const { data } = props;
    let entradas = 0,
        contagemEntradas = 0,
        saidas = 0,
        contagemSaidas = 0;

    let total = "";

    data.map((i) => {
        // console.log("valor: " + i.valor + "\ntipo: " + i.tipo);
        if (i.tipo == 0) {
            entradas += i.valor;
            contagemEntradas++;
        } else {
            saidas += i.valor;
            contagemSaidas++;
        }
    });

    total = entradas - saidas;

    return (
        <React.Fragment>
            <Title>Balanço Atual</Title>
            {total == "" ? (
                <div className="w-100 text-center align-content pt-3 mt-5">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                    ></Spinner>
                </div>
            ) : (
                <>
                    <Typography component="p" variant="h4">
                        <NumberFormat
                            value={total}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"R$"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType={"text"}
                        />
                    </Typography>
                    <Typography color="text.secondary" sx={{ pt: 2 }}>
                        <NumberFormat
                            value={entradas}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"R$"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType={"text"}
                            style={{ color: "#1F9E45" }}
                        />{" "}
                        em {contagemEntradas}{" "}
                        {contagemEntradas == 1 ? "depósito" : "depósitos"}.
                    </Typography>

                    <Typography color="text.secondary" sx={{ pt: 2 }}>
                        <NumberFormat
                            value={-saidas}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"R$"}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType={"text"}
                            style={{ color: "#F43030" }}
                        />{" "}
                        em {contagemSaidas}{" "}
                        {contagemSaidas == 1 ? "retirada" : "retiradas"}.
                    </Typography>
                </>
            )}

            {/* <Link
                color="primary"
                href="#"
                onClick={preventDefault}
                sx={{ pt: 7 }}
            >
                Ver balanço total
            </Link> */}
        </React.Fragment>
    );
}
