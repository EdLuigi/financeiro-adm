import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import RecuperarSenha from "./routes/RecuperarSenha";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* <Route element={<PrivateRoute redirectPath="/login" />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="update-profile"
                            element={<UpdateProfile />}
                        />
                    </Route> */}
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route
                        path="/recuperar-senha"
                        element={<RecuperarSenha />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
