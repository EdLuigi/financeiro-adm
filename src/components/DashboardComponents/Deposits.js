import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import NumberFormat from "react-number-format";
import { Spinner } from "react-bootstrap";

export default function Deposits(props) {
    const { data, loading, setLoading } = props;
    const [entradas, setEntradas] = useState(0);
    const [contagemEntradas, setContagemEntradas] = useState(0);
    const [saidas, setSaidas] = useState(0);
    const [contagemSaidas, setContagemSaidas] = useState(0);
    const [total, setTotal] = useState(null);

    const setValores = async () => {
        let Entradas = 0,
            ContagemEntradas = 0,
            Saidas = 0,
            ContagemSaidas = 0;
        data.map((i) => {
            if (i.tipo == 0) {
                Entradas += i.valor;
                ContagemEntradas++;
            } else {
                Saidas += i.valor;
                ContagemSaidas++;
            }
        });
        setEntradas(Entradas);
        setSaidas(Saidas);
        setContagemEntradas(ContagemEntradas);
        setContagemSaidas(ContagemSaidas);
        setTotal(Entradas - Saidas);
    };

    useEffect(() => {
        setValores();
        setLoading(false);
    }, [data]);

    return (
        <React.Fragment>
            <Title>Resumo</Title>
            {loading ? (
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
        </React.Fragment>
    );
}
