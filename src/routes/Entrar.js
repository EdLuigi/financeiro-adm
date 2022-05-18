import React from "react";
import Cadastro from "./Cadastro";
import Login from "./Login";

export default function Entrar() {
    return (
        <div>
            <div>
                <Login />
            </div>
            <br />
            <br />
            <div>
                <Cadastro />
            </div>
        </div>
    );
}
