import React, { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import { deletar } from "../firebase/firestore";
import { listar } from "../firebase/firestore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/DashboardComponents/Title";
import Chart from "../components/DashboardComponents/Chart";
import Deposits from "../components/DashboardComponents/Deposits";
import Orders from "../components/DashboardComponents/Orders";
import DrawerComponent from "../components/Drawer";

const mdTheme = createTheme();

export default function Dashboard() {
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentosFiltrado, setLancamentosFiltrado] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState();
    const { currentUser, atualizar } = useAuth();

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
                await atualizar(
                    currentUser.email.slice(0, currentUser.email.indexOf("@"))
                );
            }
        }
    };

    const fetchData = async () => {
        try {
            setMensagem("Carregando...");
            setLoading(true);

            const data = await listar(currentUser.uid);

            await updateUserName();

            await setLancamentos(
                handleLancamentosFiltrado(
                    sortDatas(
                        data.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }))
                    )
                )
            );

            setMensagem("Você não possui lançamentos.");
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
        // <div>
        //     <DashboardTest
        //         data={lancamentos}
        //         data5={lancamentos.slice(0, 5)}
        //         loading={loading}
        //     />
        // </div>
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <DrawerComponent title={"Dashboard"} />
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
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                        <div className="mb-3">
                            <Title>Olá, {currentUser.displayName}.</Title>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                >
                                    <Chart data={lancamentos} />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                >
                                    <Deposits data={lancamentos} />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Orders
                                        data={lancamentos.slice(0, 5)}
                                        loading={loading}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
