import React from "react";
import { Container } from "react-bootstrap";
import Cadastro from "../components/Cadastro";
import Login from "../components/Login";

export default function Entrar() {
    return (
        <div style={{ paddingTop: "50px" }}>
            <h1 className="w-100 text-center mb-5">Bem-vindo</h1>
            <Container className="d-flex align-items-center justify-content-center">
                <Login />
                <div style={{ marginInline: "50px" }} />
                <Cadastro />
            </Container>
        </div>
    );
}
