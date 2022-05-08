import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

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
            <h2>Login</h2>
            {erro && <h4 style={{ color: "red" }}>{erro}</h4>}
            <form onSubmit={submit}>
                Email: <input type="email" ref={emailRef} required />
                <br />
                Senha: <input type="password" ref={passwordRef} required />
                <br />
                <button type="submit" disabled={loading}>
                    Login
                </button>
            </form>
            <Link to="/recuperar-senha">Esqueci minha senha</Link>
            <br />
            Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>
    );
}
