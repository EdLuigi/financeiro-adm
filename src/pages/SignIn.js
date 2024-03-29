import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import {
    verifyEmail,
    verifyPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleErro,
} from "../utils/CrendenciaisUtils/FuncoesGerais";
import Footer from "../components/Footer";

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setErrorEmail("");
        setErrorPassword("");

        if (
            +verifyEmail(email, setErrorEmail) +
                +verifyPassword(password, setErrorPassword) !=
            0
        )
            return;

        try {
            setLoading(true);

            await login(email, password);

            navigate("/");
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
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
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
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            label="Senha"
                            error={errorPassword == "" ? false : true}
                            helperText={errorPassword}
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(
                                                    showPassword,
                                                    setShowPassword
                                                )
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={loading}
                        >
                            Continuar
                        </LoadingButton>

                        <Grid container style={{ fontSize: "15px" }}>
                            <Grid item xs>
                                <Link href="/recuperar-senha" variant="body2">
                                    Esqueceu sua senha?
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
                <Footer />
            </Container>
        </ThemeProvider>
    );
}
