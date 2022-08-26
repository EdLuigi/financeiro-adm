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
import { createTheme, ThemeProvider, Toolbar } from "@mui/material";

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
            setLoading(true);
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
        }
        setLoading(false);
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
                <Toolbar />
                <Container
                    maxWidth="lg"
                    sx={{ mt: 4, mb: 4 }}
                    className=" align-items-center justify-content-center"
                >
                    <ListarLancamentos
                        lancamentos={lancamentos}
                        lancamentosFiltrado={lancamentosFiltrado}
                        mensagem={mensagem}
                        handleDelete={handleDelete}
                        loading={loading}
                        aplicarFiltro={aplicarFiltro}
                    />
                </Container>
            </DrawerCompleto>
        </ThemeProvider>
    );
}
