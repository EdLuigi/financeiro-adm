import React, { useEffect, useState } from "react";
import { listar } from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { deletar } from "../firebase/firestore";
import ListarLancamentos from "../components/ListarLancamentos";
import Container from "@mui/material/Container";
import {
    handleLancamentosFiltrado,
    sortDates,
} from "../utils/DashboardUtils/DataUtils";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { createTheme, Grow, Paper, ThemeProvider } from "@mui/material";
import {
    CONTAINER_MARGIN_BOTTOM,
    CONTAINER_MARGIN_TOP,
} from "../utils/GlobalVariables";

const mdTheme = createTheme();

export default function Lancamentos() {
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentosFiltrado, setLancamentosFiltrado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState();
    const { currentUser } = useAuth();
    const [entradas, setEntradas] = useState(-1);
    const [saidas, setSaidas] = useState(-1);

    const contarEntradasSaidas = (arr) => {
        let a = 0,
            b = 0;
        arr.map((i) => {
            i.tipo == 0 ? a++ : b++;
        });
        setEntradas(a);
        setSaidas(b);
        return arr;
    };

    const handleDelete = async (i) => {
        try {
            // setLoading(true);
            await deletar(i.id);

            //Editar arrays
            let arr = [...lancamentos];
            let arrf = [...lancamentosFiltrado];
            var index = arr.indexOf(i);
            arr.splice(index, 1);
            setLancamentos(arr);

            var indexf = arrf.indexOf(i);
            arrf.splice(indexf, 1);
            setLancamentosFiltrado(arrf);

            // Editar contador
            if (i.tipo == 0) {
                setEntradas(entradas - 1);
            } else {
                setSaidas(saidas - 1);
            }
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
            setLancamentosFiltrado([]);
        }
        // setLoading(false);
    };

    const aplicarFiltro = (filtro) => {
        handleLancamentosFiltrado(filtro, setLancamentosFiltrado);
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            const data = await listar(currentUser.uid);

            setLancamentos(
                handleLancamentosFiltrado(
                    sortDates(
                        contarEntradasSaidas(
                            data.docs.map((doc) => ({
                                ...doc.data(),
                                id: doc.id,
                            }))
                        )
                    ),
                    setLancamentosFiltrado
                )
            );

            setMensagem("Você não possui lançamentos");
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <DrawerCompleto title="Lista de Lançamentos">
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: CONTAINER_MARGIN_TOP,
                        mb: CONTAINER_MARGIN_BOTTOM,
                    }}
                    className=" align-items-center justify-content-center"
                >
                    <Grow in={true}>
                        <Paper sx={{ pt: 6, pb: 5, pl: "7%", pr: "7%" }}>
                            <ListarLancamentos
                                lancamentos={lancamentos}
                                lancamentosFiltrado={lancamentosFiltrado}
                                mensagem={mensagem}
                                handleDelete={handleDelete}
                                loading={loading}
                                aplicarFiltro={aplicarFiltro}
                            />
                        </Paper>
                    </Grow>
                </Container>
            </DrawerCompleto>
        </ThemeProvider>
    );
}
