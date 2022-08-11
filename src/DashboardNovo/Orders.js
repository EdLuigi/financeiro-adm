import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import NumberFormat from "react-number-format";
import * as moment from "moment";
import { Spinner } from "react-bootstrap";

export default function Orders(props) {
    const { data, loading } = props;
    let dataMod = data.splice(0, 5);
    return (
        <React.Fragment>
            <Title>Últimos Lançamentos</Title>
            {loading ? (
                <div className="w-100 text-center pt-4">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                    ></Spinner>
                </div>
            ) : (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Data</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Tipo</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Valor</strong>
                                </TableCell>
                                {/* <TableCell align="right">Sale Amount</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataMod.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {moment(item.criado_em.toDate()).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.tipo == "0" ? "Entrada" : "Saída"}
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat
                                            value={item.valor}
                                            thousandSeparator={"."}
                                            decimalSeparator={","}
                                            prefix={"R$"}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType={"text"}
                                            style={
                                                item.tipo == 0
                                                    ? { color: "green" }
                                                    : { color: "red" }
                                            }
                                        />
                                    </TableCell>
                                    {/* <TableCell align="right">{`$${item.amount}`}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
            <Link color="primary" href="/listar" sx={{ mt: 3 }}>
                Ver todos os lançamentos
            </Link>
        </React.Fragment>
    );
}
