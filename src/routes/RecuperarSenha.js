import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function RecuperarSenha() {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();
    const { recuperarSenha } = useAuth();

    const submit = async (e) => {
        e.preventDefault();

        try {
            setSucesso(false);
            setLoading(true);
            setErro("");
            await recuperarSenha(emailRef.current.value);

            setSucesso(true);
            // navigate("/");
        } catch (e) {
            console.log("erro: " + e);
            setErro("O email inserido não está registrado");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Recuperar Senha</h2>
            {erro && <h4 style={{ color: "red" }}>{erro}</h4>}
            {sucesso && (
                <h4 style={{ color: "green" }}>
                    Você receberá um email para reiniciar sua senha
                </h4>
            )}
            <form onSubmit={submit}>
                Email: <input type="email" ref={emailRef} required />
                <br />
                <button type="submit" disabled={loading}>
                    Recuperar senha
                </button>
            </form>
            <Link to="/login">Entrar</Link>
            <br />
            Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
    );
}
