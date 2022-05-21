import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function RecuperarSenha() {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const { recuperarSenha } = useAuth();

    const submit = async (e) => {
        e.preventDefault();

        try {
            setSucesso(false);
            setLoading(true);
            setErro("");
            await recuperarSenha(emailRef.current.value);

            setSucesso(true);
        } catch (e) {
            console.log("erro: " + e);
            setErro("O email inserido não está registrado");
        }
        setLoading(false);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card
                style={{ width: "400px", padding: "20px", marginTop: "50px" }}
            >
                <Card.Body>
                    <Form onSubmit={submit}>
                        <h2 className="mb-4">Recuperar Senha</h2>
                        {erro && <Alert variant="danger">{erro}</Alert>}
                        {sucesso && (
                            <Alert variant="success">
                                Você receberá um email para reiniciar sua senha
                            </Alert>
                        )}
                        <Form.Group className="mb-4">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="mb-3 w-100"
                        >
                            {loading ? "Carregando..." : "Enviar"}
                        </Button>
                        <div style={{ textAlign: "center" }}>
                            <Link to="/entrar">Voltar</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
