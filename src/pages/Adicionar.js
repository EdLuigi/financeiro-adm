import React, { useState } from "react";
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    Form,
    ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { adicionar } from "../firebase/firestore";
import NumberFormat from "react-number-format";
import Container from "@mui/material/Container";
import { DrawerCompleto } from "../components/DrawerCompleto";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Collapse,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grow,
    Paper,
    Radio,
    RadioGroup,
    Toolbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const mdTheme = createTheme();

const Antigo = () => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [tipo, setTipo] = useState(0);
    const { currentUser } = useAuth();
    const [valor, setValor] = useState("");
    const navigate = useNavigate();
    const MAX_VAL = ({ value }) => value <= 1000000000;

    const handleRadio = (e) => setTipo(e.currentTarget.value);

    const handleInput = (values) => {
        const { formattedValue, value } = values;
        // formattedValue = $2,223
        // value ie, 2223
        setValor(value);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (valor == 0) {
            setErro("Insira um valor maior que R$0,00");
            return;
        }

        try {
            setSucesso(false);
            setLoading(true);
            setErro("");

            await adicionar(currentUser.uid, Number(tipo), Number(valor));
            setSucesso(true);
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível adicionar lançamento");
        }
        setLoading(false);
    };

    return (
        <>
            {/* <Card className="mb-4 w-75 p-3 "> */}
            {/* <Card.Body style={{ paddingInline: "50px" }}> */}
            <Collapse in={erro != ""}>
                <Alert variant="danger">{erro}</Alert>
            </Collapse>
            <Collapse in={sucesso}>
                <Alert variant="success">
                    Lançamento adicionado com sucesso
                </Alert>
            </Collapse>

            <div>
                <Form onSubmit={submit}>
                    <div className="mb-3">
                        <label
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            Tipo de lançamento:
                        </label>
                        <ButtonGroup>
                            <ToggleButton
                                id={0}
                                type="radio"
                                variant={"outline-primary"}
                                value={0}
                                checked={tipo == 0}
                                onChange={(e) => handleRadio(e)}
                            >
                                Entrada
                            </ToggleButton>
                            <ToggleButton
                                id={1}
                                type="radio"
                                variant={"outline-primary"}
                                value={1}
                                checked={tipo == 1}
                                onChange={(e) => handleRadio(e)}
                            >
                                Saída
                            </ToggleButton>
                        </ButtonGroup>
                    </div>

                    <div>
                        <Form.Group className="mb-4 ">
                            <Form.Label>Valor do lançamento:</Form.Label>
                            <NumberFormat
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                allowNegative={false}
                                prefix={"R$"}
                                decimalScale={2}
                                isAllowed={MAX_VAL}
                                customInput={Form.Control}
                                className="w-100"
                                placeholder="ex.: R$50,00"
                                required
                                autoFocus
                                onValueChange={(values) => {
                                    handleInput(values);
                                }}
                            />
                            <Form.Text className="text-muted p-2">
                                insira um valor até R$1.000.000.000,00
                            </Form.Text>
                        </Form.Group>
                        <LoadingButton
                            type="submit"
                            disabled={loading}
                            fullWidth
                            variant="contained"
                        >
                            {loading ? "Carregando..." : "Adicionar"}
                        </LoadingButton>
                    </div>
                </Form>
            </div>
            {/* </Card.Body> */}
            {/* </Card> */}
        </>
    );
};

function RadioTeste() {
    const [radioButtonValor, setRadioButtonValor] = useState(0);
    return (
        <FormControl>
            <FormLabel>Tipo de lançamento</FormLabel>
            <RadioGroup row defaultValue={0}>
                <FormControlLabel
                    control={<Radio />}
                    label="Entrada"
                    value={radioButtonValor}
                    onChange={(e) => {
                        setRadioButtonValor(e.target.value);
                    }}
                />
                <FormControlLabel value={1} control={<Radio />} label="Saída" />
            </RadioGroup>
        </FormControl>
    );
}

export default function Adicionar() {
    return (
        <ThemeProvider theme={mdTheme}>
            <DrawerCompleto title="Adicionar Lançamentos">
                <Toolbar />
                <Container
                    maxWidth="sm"
                    sx={{ mt: 4, mb: 4 }}
                    className=" align-items-center justify-content-center"
                >
                    <Grow in={true}>
                        <Paper
                            // sx={{ pt: 6, pb: 5, pl: "7%", pr: "7%" }}
                            sx={{ p: 6, paddingInline: "15%" }}
                        >
                            <Antigo />
                            {/* <RadioTeste /> */}
                        </Paper>
                    </Grow>
                </Container>
            </DrawerCompleto>
        </ThemeProvider>
    );
}
