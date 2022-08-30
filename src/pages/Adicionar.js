import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { adicionar } from "../firebase/firestore";
import NumberFormat from "react-number-format";
import Container from "@mui/material/Container";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Alert,
    Collapse,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grow,
    InputAdornment,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Toolbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import {
    CONTAINER_MARGIN_BOTTOM,
    CONTAINER_MARGIN_TOP,
} from "../utils/GlobalVariables";
import Footer from "../components/Footer";

const mdTheme = createTheme();

function ComponenteRadioButton({ radioButtonValor, setRadioButtonValor }) {
    return (
        <FormControl sx={{ mb: 1 }}>
            <FormLabel focused={false} sx={{ color: "black" }}>
                Tipo de lançamento:
            </FormLabel>
            <RadioGroup row defaultValue={0}>
                <FormControlLabel
                    control={
                        <Radio
                            sx={{
                                // color: green[700],
                                "&.Mui-checked": {
                                    color: green[700],
                                },
                            }}
                        />
                    }
                    sx={{
                        color: radioButtonValor == 0 ? green[700] : "#444444",
                    }}
                    label="Entrada"
                    value={0}
                    onChange={(e) => {
                        setRadioButtonValor(e.target.value);
                    }}
                />
                <FormControlLabel
                    value={1}
                    control={
                        <Radio
                            sx={{
                                // color: red[700],
                                "&.Mui-checked": {
                                    color: red[700],
                                },
                            }}
                        />
                    }
                    sx={{
                        color: radioButtonValor == 1 ? red[700] : "#444444",
                    }}
                    label="Saída"
                    onChange={(e) => {
                        setRadioButtonValor(e.target.value);
                    }}
                />
            </RadioGroup>
        </FormControl>
    );
}

export default function Adicionar() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const { currentUser } = useAuth();
    const [valor, setValor] = useState("");
    const [valorEmpty, setValorEmpty] = useState(false);
    const [radioButtonValor, setRadioButtonValor] = useState(0);
    const MAX_VAL = ({ value }) => value <= 1000000000;

    const handleInput = (values) => {
        const { formattedValue, value } = values;
        // formattedValue = $2,223
        // value ie, 2223
        // setValor(values.currentTarget.value);
        // let value = values.currentTarget.value;
        // console.log("value: " + value);
        // setValor(value.replace(",", "."));
        setValor(value);
    };

    const validateValor = (valor) => {
        let valorFinal = valor;

        // if (valorFinal == "") {
        //     setValorEmpty(true);
        //     return false;
        // }
        if (valorFinal == 0) {
            setErro("Insira um valor maior que R$0,00.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setValorEmpty(false);
            setSucesso(false);
            setLoading(true);
            setErro("");

            const valorFinal = Number(
                valor.replace(/[.]/g, "").replace(/[,]/, ".")
            );

            if (validateValor(valorFinal)) {
                await adicionar(
                    currentUser.uid,
                    Number(radioButtonValor),
                    valorFinal
                );
                setSucesso(true);
            }
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível adicionar o lançamento.");
        }
        setLoading(false);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <DrawerCompleto title="Adicionar Lançamentos">
                <Container
                    maxWidth="sm"
                    sx={{
                        mt: CONTAINER_MARGIN_TOP,
                        mb: CONTAINER_MARGIN_BOTTOM,
                    }}
                    className=" align-items-center justify-content-center"
                >
                    <Grow in={true}>
                        <Paper sx={{ p: 6, paddingInline: "15%" }}>
                            <Collapse in={erro != ""}>
                                <Alert severity="error" sx={{ mb: 1 }}>
                                    {erro}
                                </Alert>
                            </Collapse>
                            <Collapse in={sucesso}>
                                <Alert severity="success" sx={{ mb: 1 }}>
                                    {"Lançamento adicionado com sucesso."}
                                </Alert>
                            </Collapse>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <ComponenteRadioButton
                                    radioButtonValor={radioButtonValor}
                                    setRadioButtonValor={setRadioButtonValor}
                                />

                                <NumberFormat
                                    margin="normal"
                                    sx={{ w: "75%", mb: 3 }}
                                    label="Valor do lançamento"
                                    helperText={
                                        "insira um valor até R$1.000.000.000,00"
                                    }
                                    value={valor}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                R$
                                            </InputAdornment>
                                        ),
                                    }}
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    allowNegative={false}
                                    decimalScale={2}
                                    isAllowed={MAX_VAL}
                                    customInput={TextField}
                                    placeholder="ex.: 50,00"
                                    required
                                    autoFocus
                                    error={valorEmpty}
                                    onChange={(e) => {
                                        setValor(e.currentTarget.value);
                                    }}
                                />

                                <LoadingButton
                                    type="submit"
                                    disabled={loading}
                                    fullWidth
                                    variant="contained"
                                    loading={loading}
                                >
                                    {"Adicionar"}
                                </LoadingButton>
                            </Box>
                        </Paper>
                    </Grow>
                    <Fade in={true}>
                        <div>
                            <Footer />
                        </div>
                    </Fade>
                </Container>
            </DrawerCompleto>
        </ThemeProvider>
    );
}
