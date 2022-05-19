import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./firebase/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Rotas from "./routes/Rotas";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Rotas />
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
