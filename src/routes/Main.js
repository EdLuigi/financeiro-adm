import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function Main() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (e) {
            console.log("erro: " + e);
        }
    };
    return (
        <div>
            Bem vindo, {currentUser.email}
            <br />
            <button onClick={handleLogout}>Logout</button>
            <br />
            <Link to="/inserir-lancamento">Inserir Lançamento</Link>
            <br />
            <Link to="/listar-lancamentos">Listar Lançamentos</Link>
        </div>
    );
}
