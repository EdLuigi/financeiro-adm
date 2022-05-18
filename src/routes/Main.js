import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { listarTodos } from "../firebase/firestore";

export default function Main() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [lancamentos, setLancamentos] = useState([]);
    const [entradas, setEntradas] = useState(-1);
    const [saidas, setSaidas] = useState(-1);

    const handleLogout = async () => {
        try {
            await logout();
            // navigate("/login");
            navigate("/entrar");
        } catch (e) {
            console.log("erro: " + e);
        }
    };

    const contarEntradasSaidas = (arr) => {
        let a = 0,
            b = 0;
        arr.map((i) => {
            i.tipo == 0 ? a++ : b++;
        });
        setEntradas(a);
        setSaidas(b);
    };

    const fetchData = async () => {
        try {
            const data = await listarTodos(currentUser.uid);

            contarEntradasSaidas(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        } catch (error) {
            console.log("erro: " + error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {entradas === -1 ? (
                <h4>Carregando...</h4>
            ) : (
                <div>
                    Bem vindo, {currentUser.email}
                    <br />
                    Você possui {entradas}{" "}
                    {entradas == 1 ? "entrada" : "entradas"} e {saidas}{" "}
                    {saidas == 1 ? "saída" : "saídas"}
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                    <br />
                    <Link to="/inserir-lancamento">Inserir Lançamento</Link>
                    <br />
                    <Link to="/listar-lancamentos">Listar Lançamentos</Link>
                </div>
            )}
        </>
    );
}
