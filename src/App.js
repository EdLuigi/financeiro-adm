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
                    <div
                        style={{
                            // height: "100vh",
                            minHeight: "100vh",
                            paddingTop: "56px",
                            backgroundColor: "#f7f7f7",
                        }}
                    >
                        <Rotas />
                        <div className="h-25"></div>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
