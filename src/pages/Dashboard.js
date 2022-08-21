import React, { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import { listar } from "../firebase/firestore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/DashboardComponents/Title";
import Chart from "../components/DashboardComponents/Chart";
import Deposits from "../components/DashboardComponents/Deposits";
import Orders from "../components/DashboardComponents/Orders";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { sortDates } from "../utils/DashboardUtils/DataUtils";

const mdTheme = createTheme();

export default function Dashboard() {
    const [lancamentos, setLancamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, atualizar } = useAuth();

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
            setLoading(true);

            const data = await listar(currentUser.uid);

            await updateUserName();

            setLancamentos(
                sortDates(
                    data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                )
            );
        } catch (error) {
            console.log("erro: " + error);
        }
        // setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <DrawerCompleto title="Dashboard">
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
                                <Chart data={lancamentos} loading={loading} />
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
                                <Deposits
                                    data={lancamentos}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
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
            </DrawerCompleto>
        </ThemeProvider>
    );
}
