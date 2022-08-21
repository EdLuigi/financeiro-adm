import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Collapse,
    Container,
    Grid,
    Paper,
    TextField,
    Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
    verifyEmail,
    verifyPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleErro,
} from "../utils/CrendenciaisUtils/FuncoesGerais";
import { useAuth } from "../firebase/authContext";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { PasswordComponent } from "../utils/CrendenciaisUtils/PasswordComponent";

const mdTheme = createTheme();

const BoxRender = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");
    const [errorPassword3, setErrorPassword3] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const { currentUser } = useAuth();
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        setEmail(currentUser.email);
        setName(currentUser.displayName);
    }, []);

    const handleEditar = (e) => {
        e.preventDefault();
        setEditar(!editar);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditar(!editar);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    onSubmit={
                        editar ? (e) => handleSubmit(e) : (e) => handleEditar(e)
                    }
                    noValidate
                    sx={{ mt: 0 }}
                >
                    <Collapse in={erro !== ""}>
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {erro}
                        </Alert>
                    </Collapse>
                    <TextField
                        disabled={!editar}
                        margin="normal"
                        fullWidth
                        label="Nome Completo"
                        value={name ?? ""}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <TextField
                        disabled={!editar}
                        required
                        margin="normal"
                        fullWidth
                        label="E-mail"
                        error={errorEmail == "" ? false : true}
                        helperText={errorEmail}
                        value={email ?? ""}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    {!editar ? (
                        <></>
                    ) : (
                        <>
                            <PasswordComponent
                                errorPassword={errorPassword1}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setPassword={setPassword}
                                label={"Senha Atual"}
                                tipo={1}
                            />
                            <PasswordComponent
                                errorPassword={errorPassword2}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setPassword={setPassword}
                                label={"Nova Senha"}
                                tipo={0}
                            />
                            <PasswordComponent
                                errorPassword={errorPassword3}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setPassword={setPassword}
                                label={"Confirmar Nova Senha"}
                                tipo={1}
                            />
                        </>
                    )}

                    {/* <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton> */}

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={loading}
                    >
                        Editar
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};
export default function Perfil() {
    return (
        <ThemeProvider theme={mdTheme}>
            <DrawerCompleto title="Perfil">
                <Toolbar />
                <Container
                    maxWidth="lg"
                    sx={{ mt: 3, mb: 4 }}
                    className="d-flex align-items-center justify-content-center "
                >
                    <Grid item>
                        <Paper
                            sx={{
                                p: 5,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <BoxRender />
                        </Paper>
                    </Grid>
                </Container>
            </DrawerCompleto>
        </ThemeProvider>
    );
}
