import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../firebase/authContext";
import { Alert, Collapse } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import {
    verifyEmail,
    handleErro,
} from "../utils/CrendenciaisUtils/FuncoesGerais";

const theme = createTheme();

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const { recuperarSenha } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (+verifyEmail(email, setErrorEmail) != 0) return;

        try {
            setSucesso("");
            setLoading(true);
            setErro("");
            setErrorEmail("");

            await recuperarSenha(email);

            setSucesso("Você receberá um email para reiniciar sua senha.");
        } catch (e) {
            console.log("erro: " + e);
            handleErro(e, setErro);
        }
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockResetOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recuperar Senha
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Collapse in={erro !== ""}>
                            <Alert severity="error" sx={{ mb: 1 }}>
                                {erro}
                            </Alert>
                        </Collapse>
                        <Collapse in={sucesso !== ""}>
                            <Alert severity="success" sx={{ mb: 1 }}>
                                {sucesso}
                            </Alert>
                        </Collapse>

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            label="E-mail"
                            autoFocus
                            error={errorEmail == "" ? false : true}
                            helperText={errorEmail}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            endIcon={<SendIcon />}
                            loading={loading}
                        >
                            Enviar
                        </LoadingButton>
                        <Grid container style={{ fontSize: "15px" }}>
                            <Grid item xs>
                                <Link href="/entrar" variant="body2">
                                    Voltar
                                </Link>
                            </Grid>
                            <Grid item>
                                {"Não possui conta? "}
                                <Link href="/cadastrar" variant="body2">
                                    {"Cadastre-se"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}
