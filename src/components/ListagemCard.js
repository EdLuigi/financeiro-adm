import React from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListagemCard(props) {
    const { data, handleDelete, loading } = props;

    return (
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <Table size="medium">
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
                        <TableCell>{""}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
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
                            <TableCell>
                                <IconButton
                                    color="error"
                                    aria-label="deletar"
                                    component="label"
                                    disabled={loading}
                                    onClick={() => {
                                        handleDelete(item);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
