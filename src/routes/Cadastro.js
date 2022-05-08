import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrar } from "../firebase/firebase";

export default function Cadastro() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

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
            <h2>Cadastro</h2>
            {erro && <h4 style={{ color: "red" }}>{erro}</h4>}
            <form onSubmit={submit}>
                Email: <input type="email" ref={emailRef} required />
                <br />
                Senha: <input type="password" ref={passwordRef} required />
                <br />
                <button type="submit" disabled={loading}>
                    Cadastrar
                </button>
            </form>
            <Link to="/login">Entrar</Link>
        </div>
    );
}
