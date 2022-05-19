import React from "react";
import { Route, Routes } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao";
import { useAuth } from "../firebase/authContext";
import PrivateRoute from "./PrivateRoute";
import InserirLancamento from "../pages/InserirLancamento";
import ListarLancamentos from "../pages/ListarLancamentos";
import LoggedInRoute from "./LoggedInRoute";
import Entrar from "../pages/Entrar";
import RecuperarSenha from "../pages/RecuperarSenha";
import Dashboard from "../pages/Dashboard";

export default function Rotas() {
    const { currentUser } = useAuth();
    return (
        <div>
            <div>{currentUser && <BarraNavegacao />}</div>
            <div>
                <Routes>
                    <Route element={<PrivateRoute redirectPath="/entrar" />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/inserir-lancamento"
                            element={<InserirLancamento />}
                        />
                        <Route
                            path="/listar-lancamentos"
                            element={<ListarLancamentos />}
                        />
                    </Route>
                    <Route element={<LoggedInRoute redirectPath="/" />}>
                        <Route path="/entrar" element={<Entrar />} />
                        <Route
                            path="/recuperar-senha"
                            element={<RecuperarSenha />}
                        />
                    </Route>
                    <Route
                        path="/*"
                        element={
                            <div>
                                <h1>Página não encontrada :/</h1>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}
