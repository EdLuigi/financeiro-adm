import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./firebase/authContext";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import RecuperarSenha from "./routes/RecuperarSenha";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoute redirectPath="/login" />}>
                            <Route path="/" element={<Main />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route
                            path="/recuperar-senha"
                            element={<RecuperarSenha />}
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
