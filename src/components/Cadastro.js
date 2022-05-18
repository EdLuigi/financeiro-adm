import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import {
    Button,
    Alert,
    Form,
    FormGroup,
    Container,
    Card,
} from "react-bootstrap";

export default function Cadastro() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { cadastrar } = useAuth();

    const submit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setErro("");
            setErro("As senhas são diferentes");
            return;
        }

        try {
            setLoading(true);
            setErro("");
            await cadastrar(emailRef.current.value, passwordRef.current.value);

            navigate("/");
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível fazer o cadastro");
        }
        setLoading(false);
    };

    return (
        <div>
            <Card style={{ width: "400px", padding: "20px" }}>
                <Card.Body>
                    <Form onSubmit={submit}>
                        <h3 className="mb-4">Criar uma conta</h3>
                        {erro && <Alert variant="danger">{erro}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Confirmar senha:</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                required
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="mb-3 w-100"
                        >
                            Continuar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
