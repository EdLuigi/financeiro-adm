import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../firebase/authContext";
import PrivateRoute from "./PrivateRoute";
import InserirLancamento from "./InserirLancamento";
import ListarLancamentos from "./ListarLancamentos";
import LoggedInRoute from "./LoggedInRoute";
import Entrar from "./Entrar";
import RecuperarSenha from "./RecuperarSenha";
import Dashboard from "./Dashboard";

export default function Rotas() {
    const { currentUser } = useAuth();
    return (
        <div>
            <div>{currentUser && <Sidebar />}</div>
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
