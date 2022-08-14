import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Toolbar,
} from "@mui/material";
import DrawerComponent from "../components/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    verifyEmail,
    verifyPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleErro,
} from "../utils/CrendenciaisUtils/FuncoesGerais";
import { useAuth } from "../firebase/authContext";

const mdTheme = createTheme();

function SpinnerCarregando() {
    return (
        <div className="w-100 text-center pt-3 pb-3">
            <Spinner
                animation="border"
                role="status"
                variant="primary"
            ></Spinner>
        </div>
    );
}
function BoxInfo() {
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
    const { currentUser } = useAuth();
    const [editar, setEditar] = useState(false);

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        setEditar(!editar);
    };

    const handleEditar = (e) => {
        e.preventDefault();
        console.log("handleEditar");
        setEditar(!editar);
    };

    useEffect(() => {
        setEmail(currentUser.email);
        setName(currentUser.displayName);
    }, []);
    return (
        <Box
            component="form"
            onSubmit={editar ? (e) => handleSubmit(e) : (e) => handleEditar(e)}
            noValidate
            sx={{ mt: 0 }}
        >
            {/* <Collapse in={erro !== ""}>
                <Alert severity="error" sx={{ mb: 1 }}>
                    {erro}
                </Alert>
            </Collapse> */}

            <TextField
                disabled={!editar}
                margin="normal"
                fullWidth
                label="Nome"
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
            {editar && (
                <>
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        label="Senha Atual"
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
                                        onMouseDown={handleMouseDownPassword}
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
                        label="Nova Senha"
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
                                        onMouseDown={handleMouseDownPassword}
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
                                        onClick={handleClickShowConfirmPassword}
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
    );
}
export default function Perfil() {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <DrawerComponent title={"Perfil"} />
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
                                <BoxInfo />
                            </Paper>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
