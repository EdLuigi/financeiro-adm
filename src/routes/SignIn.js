import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

// function Copyright(props) {
//     return (
//         <Typography
//             variant="body2"
//             color="text.secondary"
//             align="center"
//             {...props}
//         >
//             {"Copyright © "}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{" "}
//             {new Date().getFullYear()}
//             {"."}
//         </Typography>
//     );
// }

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const verifyEmail = () => {
        if (email == "") {
            setErrorEmail("Insira um email válido");
            return 1;
        }
        if (!emailRegex.test(email)) {
            setErrorEmail("O email inserido não está formatado corretamente");
            return 1;
        }
        return 0;
    };

    const verifyPassword = () => {
        if (password == "") {
            setErrorPassword("Insira sua senha");
            return 1;
        }
        return 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setErrorEmail("");
        setErrorPassword("");

        if (+verifyEmail() + +verifyPassword() != 0) return;

        try {
            setLoading(true);

            await login(email, password);

            navigate("/");
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível fazer login, email ou senha incorretos.");
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
                        <LockOutlinedIcon />
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
                            label="Email"
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
                                            onClick={handleClickShowPassword}
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
                                Não possui conta?
                                <Link href="/cadastrar" variant="body2">
                                    {" Cadastre-se"}
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
