import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import {
    verifyEmail,
    verifyPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleErro,
    verifyConfirmPassword,
} from "../utils/CrendenciaisUtils/FuncoesGerais";
import Footer from "../components/Footer";

const theme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { cadastrar } = useAuth();

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const registerName = () => {
        const nomeCompleto = name.trim() + " " + surName.trim();
        if (nomeCompleto.trim() != "") {
            sessionStorage.setItem("userNameSignUp", nomeCompleto.trim());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorConfirmPassword("");

        if (
            +verifyEmail(email, setErrorEmail) +
                +verifyPassword(password, setErrorPassword) +
                +verifyConfirmPassword(
                    password,
                    confirmPassword,
                    setErrorConfirmPassword
                ) !=
            0
        ) {
            return;
        }

        try {
            setLoading(true);

            registerName();

            await cadastrar(email, password);

            navigate("/");
        } catch (e) {
            console.log(e);
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
                        <PersonAddAltOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro
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

                        <Grid container style={{ fontSize: "15px" }}>
                            <Grid item xs sx={{ mr: 2 }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Nome"
                                    autoFocus
                                    onChange={(e) =>
                                        setName(e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Sobrenome"
                                    onChange={(e) =>
                                        setSurName(e.currentTarget.value)
                                    }
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            label="E-mail"
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
                            helperText={
                                errorPassword == ""
                                    ? "Sua senha deve ter no mínimo 6 caracteres."
                                    : errorPassword
                            }
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

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            label="Confirmar Senha"
                            error={errorConfirmPassword == "" ? false : true}
                            helperText={errorConfirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            onChange={(e) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            onMouseDown={
                                                handleMouseDownConfirmPassword
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
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
                            <Grid item>
                                {"Já possui uma conta? "}
                                <Link href="/entrar" variant="body2">
                                    {"Faça login"}
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
