import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { adicionar } from "../firebase/firestore";

export default function InserirLancamento() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [tipo, setTipo] = useState(0);
    const [valor, setValor] = useState();
    const { currentUser } = useAuth();

    const handleRadio = (e) => setTipo(e.target.value);

    const submit = async (e) => {
        e.preventDefault();

        try {
            setSucesso(false);
            setLoading(true);
            setErro("");

            await adicionar(currentUser.uid, tipo, valor);

            setSucesso(true);
        } catch (e) {
            console.log("erro: " + e);
            setErro("Não foi possível adicionar lançamento");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Inserir Lançamento</h2>
            {erro && <h4 style={{ color: "red" }}>{erro}</h4>}
            {sucesso && (
                <h4 style={{ color: "green" }}>
                    Lançamento adicionado com sucesso
                </h4>
            )}
            <form onSubmit={submit}>
                Tipo de lançamento:
                <label>
                    <input
                        type="radio"
                        value="0"
                        checked={tipo == 0}
                        onChange={(e) => handleRadio(e)}
                    />
                    Entrada
                </label>
                <label>
                    <input
                        type="radio"
                        value="1"
                        checked={tipo == 1}
                        onChange={(e) => handleRadio(e)}
                    />
                    Saída
                </label>
                <br />
                <br />
                Valor do lançamento:{" "}
                <input
                    type="number"
                    onChange={(e) => setValor(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Adicionar
                </button>
                <br />
                <Link to="/">Voltar</Link>
                <br />
                <Link to="/listar-lancamentos">Listar Lançamentos</Link>
            </form>
        </div>
    );
}
