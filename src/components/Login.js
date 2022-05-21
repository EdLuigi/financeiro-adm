import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { Button, Alert, Form, Card } from "react-bootstrap";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setErro("");
            await login(emailRef.current.value, passwordRef.current.value);

            navigate("/");
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível fazer login, email ou senha incorretos");
        }
        setLoading(false);
    };

    return (
        <div>
            <Card style={{ width: "400px", padding: "20px" }}>
                <Card.Body>
                    <Form onSubmit={submit}>
                        <h2 className="mb-4">Entrar</h2>
                        {erro && <Alert variant="danger">{erro}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="mb-3 w-100"
                        >
                            {loading ? "Carregando..." : "Continuar"}
                        </Button>
                    </Form>
                    <div style={{ textAlign: "center" }}>
                        <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
