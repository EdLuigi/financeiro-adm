import React from "react";
import { Route, Routes } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao";
import { useAuth } from "../firebase/authContext";
import PrivateRoute from "./PrivateRoute";
import InserirLancamento from "../pages/InserirLancamento";
import LoggedInRoute from "./LoggedInRoute";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn.js";
import SignUp from "../pages/SignUp";
import RecoverPassword from "../pages/RecoverPassword";
import DashboardTest from "../DashboardNovo/DashboardTest";

export default function Rotas() {
    const { currentUser } = useAuth();
    return (
        <div>
            {/* <div>{currentUser && <BarraNavegacao />}</div> */}
            <div>
                <Routes>
                    <Route element={<PrivateRoute redirectPath="/entrar" />}>
                        <Route path="/" element={<DashboardTest />} />
                        <Route path="/listar" element={<Dashboard />}>
                            <Route
                                path="/listar/:index"
                                element={<Dashboard />}
                            />
                        </Route>
                        <Route
                            path="/inserir-lancamento"
                            element={<InserirLancamento />}
                        />
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
