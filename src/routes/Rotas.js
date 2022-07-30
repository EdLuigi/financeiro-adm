import React from "react";
import { Route, Routes } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao";
import { useAuth } from "../firebase/authContext";
import PrivateRoute from "./PrivateRoute";
import InserirLancamento from "../pages/InserirLancamento";
import LoggedInRoute from "./LoggedInRoute";
import Entrar from "../pages/Entrar";
import RecuperarSenha from "../pages/RecuperarSenha";
import Dashboard from "../pages/Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RecoverPassword from "./RecoverPassword";

export default function Rotas() {
    const { currentUser } = useAuth();
    return (
        <div>
            <div>{currentUser && <BarraNavegacao />}</div>
            <div>
                <Routes>
                    <Route element={<PrivateRoute redirectPath="/entrar" />}>
                        <Route path="/" element={<Dashboard />}>
                            <Route path="/:index" element={<Dashboard />} />
                        </Route>
                        <Route
                            path="/inserir-lancamento"
                            element={<InserirLancamento />}
                        />
                    </Route>
                    <Route element={<LoggedInRoute redirectPath="/" />}>
                        {/* <Route path="/entrar" element={<Entrar />} /> */}
                        {/* <Route
                            path="/recuperar-senha"
                            element={<RecuperarSenha />}
                        /> */}
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
