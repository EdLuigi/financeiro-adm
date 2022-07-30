import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
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
                        <Grid container style={{ fontSize: "15px" }}>
                            <Grid item xs sx={{ mr: 2 }}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    // autoComplete="email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="surname"
                                    label="Sobrenome"
                                    name="sur-name"
                                    // autoComplete="email"
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            // autoComplete="email"
                        />
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Continuar
                        </Button>
                        <Grid container style={{ fontSize: "15px" }}>
                            <Grid item>
                                Já possui uma conta?
                                <Link href="/entrar" variant="body2">
                                    {" Faça login"}
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
