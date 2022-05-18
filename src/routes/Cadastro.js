import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

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
            <h2>Criar uma conta</h2>
            {erro && <h4 style={{ color: "red" }}>{erro}</h4>}
            <form onSubmit={submit}>
                Email: <input type="email" ref={emailRef} required />
                <br />
                Senha: <input type="password" ref={passwordRef} required />
                <br />
                Confirmar senha:{" "}
                <input type="password" ref={passwordConfirmRef} required />
                <br />
                <button type="submit" disabled={loading}>
                    Continuar
                </button>
            </form>
            {/* <Link to="/login">Entrar</Link> */}
        </div>
    );
}
