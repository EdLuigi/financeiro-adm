import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./firebase/authContext";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import RecuperarSenha from "./routes/RecuperarSenha";
import PrivateRoute from "./routes/PrivateRoute";
import LoggedInRoute from "./routes/LoggedInRoute";
import InserirLancamento from "./routes/InserirLancamento";
import ListarLancamentos from "./routes/ListarLancamentos";
import Entrar from "./routes/Entrar";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        {/* <Route element={<PrivateRoute redirectPath="/login" />}> */}
                        <Route
                            element={<PrivateRoute redirectPath="/entrar" />}
                        >
                            <Route path="/" element={<Main />} />
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
                            {/* <Route path="/login" element={<Login />} /> */}
                            {/* <Route path="/cadastro" element={<Cadastro />} /> */}
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
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
