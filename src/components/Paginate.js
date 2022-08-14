import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListagemCard from "./ListagemCard";
import PaginateNav from "./PaginateNav";
import {
    Button,
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

const Novo = ({ data, handleDelete, loading }) => {
    return (
        <>
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
                            {/* <TableCell align="right">Sale Amount</TableCell> */}
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
                                {/* <TableCell align="right">{`$${item.amount}`}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default function Paginate(props) {
    const { data, handleDelete, loading } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 5;
    const { index } = useParams();
    const currentPage = !isNaN(index) ? index : 1;
    const navigate = useNavigate();

    const deletar = async (i) => {
        await handleDelete(i);
        if (currentItems.length == 1 && currentPage != 1) {
            navigate(`/listar/${+currentPage - 1}`);
        }
    };

    useEffect(() => {
        let indexOfLastItem = currentPage * itemsPerPage;
        let indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems([...data.slice(indexOfFirstItem, indexOfLastItem)]);
    }, [data, currentPage]);

    return (
        <div>
            <div>
                {/* {currentItems.map((i) => (
                    <div key={i.id}>
                        <ListagemCard
                            i={i}
                            handleDelete={() => deletar(i)}
                            loading={loading}
                        />
                    </div>
                ))} */}
                <Novo
                    data={currentItems}
                    handleDelete={(i) => deletar(i)}
                    loading={loading}
                />
                {currentItems.length == 0 ? "Nada pra ver aqui :^)" : <></>}
            </div>
            <div className="d-flex align-items-center justify-content-center p-4">
                <PaginateNav
                    data={data}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
