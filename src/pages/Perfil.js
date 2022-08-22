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
    verifyConfirmPassword,
} from "../utils/CrendenciaisUtils/FuncoesGerais";
import { useAuth } from "../firebase/authContext";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { PasswordComponent } from "../utils/CrendenciaisUtils/PasswordComponent";

const mdTheme = createTheme();

const BoxRender = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [password3, setPassword3] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");
    const [errorPassword3, setErrorPassword3] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [editar, setEditar] = useState(false);
    const [botaoFrase, setBotaoFrase] = useState("Editar");
    const { currentUser, atualizarPerfil, atualizarEmail, atualizarSenha } =
        useAuth();

    useEffect(() => {
        setEmail(currentUser.email);
        setName(currentUser.displayName);
    }, []);

    const handleEditar = (e) => {
        e.preventDefault();
        setEditar(true);
        setBotaoFrase("Confirmar");
    };

    const limparErros = () => {
        setErrorEmail("");
        setErrorName("");
        setErrorPassword1("");
        setErrorPassword2("");
        setErrorPassword3("");
    };

    const handleVoltar = () => {
        limparErros();
        setPassword1("");
        setPassword2("");
        setPassword3("");

        setBotaoFrase("Editar");
        setEditar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        limparErros();

        // if (
        //     +verifyName() +
        //         +verifyEmail(email, setErrorEmail) +
        //         +verificarSenha1(password1, setErrorPassword1) +
        //         +verifyPassword(password2, setErrorPassword2) +
        //         +verifyConfirmPassword(
        //             password2,
        //             password3,
        //             setErrorPassword3
        //         ) !=
        //     0
        // ) {
        //     return;
        // }

        try {
            setLoading(true);

            await atualizarPerfil(name);
            await atualizarEmail(email);
            await atualizarSenha(password2);

            //update displayName
            //update email
            //update password

            //mensagem de sucesso removível(?)
        } catch (e) {
            console.log(e);
            handleErro(e, setErro);
        }
        setLoading(false);
    };

    const verifyName = () => {
        if (name == "") {
            setErrorName("O nome de usuário não pode ser vazio.");
            return 1;
        }
        return 0;
    };

    const verificarSenha1 = () => {
        if (verifyPassword(password1, setErrorPassword1) != 0) {
            return 1;
        }

        return 0;
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
                    onSubmit={editar ? handleSubmit : handleEditar}
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
                        error={errorName == "" ? false : true}
                        helperText={errorName}
                        value={name ?? ""}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <TextField
                        disabled={!editar}
                        margin="normal"
                        fullWidth
                        label="E-mail"
                        error={errorEmail == "" ? false : true}
                        helperText={errorEmail}
                        value={email ?? ""}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    {editar && (
                        <>
                            <PasswordComponent
                                label={"Senha Atual"}
                                errorPassword={errorPassword1}
                                setPassword={setPassword1}
                                tipo={1}
                            />
                            <PasswordComponent
                                label={"Nova Senha"}
                                errorPassword={errorPassword2}
                                setPassword={setPassword2}
                                tipo={0}
                            />
                            <PasswordComponent
                                label={"Confirmar Nova Senha"}
                                errorPassword={errorPassword3}
                                setPassword={setPassword3}
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
                        {botaoFrase}
                    </LoadingButton>

                    {editar && (
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            color="error"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            onClick={handleVoltar}
                        >
                            {"Voltar"}
                        </LoadingButton>
                    )}
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
