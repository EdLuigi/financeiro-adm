import React from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import * as moment from "moment";
import NumberFormat from "react-number-format";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976D2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#F9F9F9",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function ListagemCard(props) {
    const { data, handleDelete, loading } = props;

    return (
        <div>
            <TableContainer component={Paper}>
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
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell>
                                    {moment(item.criado_em.toDate()).format(
                                        "DD/MM/YYYY"
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {item.tipo == "0" ? "Entrada" : "Saída"}
                                </StyledTableCell>
                                <StyledTableCell>
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
                                </StyledTableCell>
                                <StyledTableCell>
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
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
