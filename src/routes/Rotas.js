import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Adicionar from "../pages/Adicionar";
import LoggedInRoute from "./LoggedInRoute";
import Lancamentos from "../pages/Lancamentos";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn.js";
import SignUp from "../pages/SignUp";
import RecoverPassword from "../pages/RecoverPassword";
import Perfil from "../pages/Perfil";

export default function Rotas() {
    return (
        <div>
            <div>
                <Routes>
                    <Route element={<PrivateRoute redirectPath="/entrar" />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/listar" element={<Lancamentos />}>
                            <Route
                                path="/listar/:index"
                                element={<Lancamentos />}
                            />
                        </Route>
                        <Route
                            path="/inserir-lancamento"
                            element={<Adicionar />}
                        />
                        <Route path="/perfil" element={<Perfil />} />
                    </Route>
                    <Route element={<LoggedInRoute redirectPath="/" />}>
                        <Route path="/entrar" element={<SignIn />} />
                        <Route path="/cadastrar" element={<SignUp />} />
                        <Route
                            path="/recuperar-senha"
                            element={<RecoverPassword />}
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
