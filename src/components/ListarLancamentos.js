import {
    Collapse,
    FormControl,
    Grow,
    InputLabel,
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Paginate from "./Paginate/Paginate";

export default function ListarLancamentos(props) {
    const {
        lancamentos,
        lancamentosFiltrado,
        mensagem,
        loading,
        aplicarFiltro,
        handleDelete,
    } = props;
    const [filtro, setFiltro] = useState(0);
    const navigate = useNavigate();
    const [itensProntos, setItensProntos] = useState(false);

    const handleFiltro = (e) => {
        let item = e.target.value;
        setFiltro(item);
        if (item == 0) filtroTodos();
        if (item == 1) filtroEntradas();
        if (item == 2) filtroSaidas();
        if (item == 3) filtroTodosAntigas();
        if (item == 4) filtroEntradasAntigas();
        if (item == 5) filtroSaidasAntigas();
        navigate(`/listar`);
    };

    const filtroTodos = () => {
        aplicarFiltro(lancamentos);
    };

    const filtroEntradas = () => {
        const newArr = [...lancamentos].filter((i) => i.tipo == 0);
        aplicarFiltro(newArr);
    };

    const filtroSaidas = () => {
        const newArr = [...lancamentos].filter((i) => i.tipo == 1);
        aplicarFiltro(newArr);
    };

    const filtroTodosAntigas = () => {
        const newArr = [...lancamentos].sort(
            (a, b) => a.criado_em.toDate() > b.criado_em.toDate()
        );
        aplicarFiltro(newArr);
    };

    const filtroEntradasAntigas = () => {
        const newArr = [...lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 0);
        aplicarFiltro(newArr);
    };

    const filtroSaidasAntigas = () => {
        const newArr = [...lancamentos]
            .sort((a, b) => a.criado_em.toDate() > b.criado_em.toDate())
            .filter((i) => i.tipo == 1);
        aplicarFiltro(newArr);
    };

    useEffect(() => {
        if (loading == false) {
            const timer = setTimeout(() => {
                setItensProntos(true);
            }, 200);
            return () => clearTimeout(timer);
        }
        if (loading == true) {
            setItensProntos(false);
        }
    }, [loading]);

    return (
        <Grow in={true}>
            <Paper sx={{ pt: 6, pb: 5, pl: "7%", pr: "7%" }}>
                <FormControl sx={{ minWidth: 200, mb: 3 }} size="small">
                    <InputLabel>Filtro</InputLabel>
                    <Select value={filtro} onChange={(e) => handleFiltro(e)}>
                        <MenuItem value={0}>Todos</MenuItem>
                        <MenuItem value={1}>Entradas</MenuItem>
                        <MenuItem value={2}>Saídas</MenuItem>
                        <MenuItem value={3}>Todos (mais antigas)</MenuItem>
                        <MenuItem value={4}>Entradas (mais antigas)</MenuItem>
                        <MenuItem value={5}>Saídas (mais antigas)</MenuItem>
                    </Select>
                </FormControl>

                <Collapse in={loading}>
                    <div className="w-100 text-center mt-3 mb-3">
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                        ></Spinner>
                        <h6 className="mt-3">Carregando dados...</h6>
                    </div>
                </Collapse>

                <Collapse
                    in={
                        !loading &&
                        lancamentosFiltrado.length == 0 &&
                        itensProntos
                    }
                >
                    <div className="d-flex justify-content-center align-content-center mt-5 mb-5">
                        <h6 style={{ color: "grey" }}>{mensagem}</h6>
                    </div>
                </Collapse>

                <Collapse
                    in={
                        !loading &&
                        lancamentosFiltrado.length != 0 &&
                        itensProntos
                    }
                >
                    <Paginate
                        data={lancamentosFiltrado}
                        handleDelete={handleDelete}
                        loading={loading}
                        mensagem={mensagem}
                    />
                </Collapse>
            </Paper>
        </Grow>
    );
}
