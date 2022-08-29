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
import { Spinner } from "react-bootstrap";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976D2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: "0px 16px",
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

const ItemRender = ({ item, handleDelete, loading }) => {
    const [spinnerState, setSpinnerState] = React.useState(false);

    const deletar = async (item) => {
        try {
            setSpinnerState(true);
            await handleDelete(item);
        } catch (e) {
            console.log(e);
        }
        setSpinnerState(false);
    };

    return (
        <>
            <StyledTableCell>
                {moment(item.criado_em.toDate()).format("DD/MM/YYYY")}
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
                        item.tipo == 0 ? { color: "green" } : { color: "red" }
                    }
                />
            </StyledTableCell>
            <StyledTableCell>
                <div style={{ paddingInline: 0 }}>
                    {!spinnerState ? (
                        <IconButton
                            sx={{ p: 0 }}
                            aria-label="deletar"
                            component="label"
                            disabled={loading}
                            onClick={() => {
                                deletar(item);
                            }}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    ) : (
                        <Spinner
                            animation="border"
                            variant="secondary"
                            size="sm"
                            className="p-2"
                        />
                    )}
                </div>
            </StyledTableCell>
        </>
    );
};

export default function ListagemCard(props) {
    const { data, handleDelete, loading } = props;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <strong>Data</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Tipo</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Valor</strong>
                            </StyledTableCell>
                            <StyledTableCell>{""}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <StyledTableRow
                                key={item.id}
                                style={{ height: 50 }}
                            >
                                <ItemRender
                                    item={item}
                                    loading={loading}
                                    handleDelete={handleDelete}
                                />
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
