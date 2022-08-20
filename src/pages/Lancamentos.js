import React, { useEffect, useState } from "react";
import { listar } from "../firebase/firestore";
import { useAuth } from "../firebase/authContext";
import { deletar } from "../firebase/firestore";
import { Spinner } from "react-bootstrap";
import ListarLancamentos from "../components/ListarLancamentos";
import DrawerComponent from "../components/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

export default function Lancamentos() {
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentosFiltrado, setLancamentosFiltrado] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState();
    const { currentUser, atualizar } = useAuth();
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

    const sortDatas = (arr) => {
        return [...arr].sort(
            (a, b) => a.criado_em.toDate() < b.criado_em.toDate()
        );
    };

    const handleLancamentosFiltrado = (arr) => {
        setLancamentosFiltrado(arr);
        return arr;
    };

    const updateUserName = async () => {
        if (currentUser.displayName == null) {
            if (sessionStorage.getItem("userNameSignUp") != null) {
                const nomeCompleto = sessionStorage.getItem("userNameSignUp");
                await atualizar(nomeCompleto);
                sessionStorage.removeItem("userNameSignUp");
            } else {
                await atualizar(currentUser.email);
            }
        }
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");

            const data = await listar(currentUser.uid);

            await updateUserName();

            setLancamentos(
                handleLancamentosFiltrado(
                    sortDatas(
                        contarEntradasSaidas(
                            data.docs.map((doc) => ({
                                ...doc.data(),
                                id: doc.id,
                            }))
                        )
                    )
                )
            );

            setMensagem("- Você não possui lançamentos -");
        } catch (error) {
            console.log("erro: " + error);
            setMensagem("Algo deu errado :(");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <DrawerComponent title={"Lista de Lançamentos"} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
                        {entradas === -1 ? (
                            <div className="w-100 text-center mt-5 pt-4">
                                <Spinner
                                    animation="border"
                                    role="status"
                                    variant="primary"
                                ></Spinner>
                                <h5 className="mt-3">Carregando dados...</h5>
                            </div>
                        ) : (
                            <Container className=" align-items-center justify-content-center p-4">
                                <ListarLancamentos
                                    lancamentos={lancamentos}
                                    lancamentosFiltrado={lancamentosFiltrado}
                                    mensagem={mensagem}
                                    handleDelete={handleDelete}
                                    loading={loading}
                                    handleLancamentosFiltrado={
                                        handleLancamentosFiltrado
                                    }
                                />
                            </Container>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    );
}