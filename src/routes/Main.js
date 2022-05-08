import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase";

export default function Main() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (e) {
            console.log("erro: " + e);
        }
    };
    return (
        <div>
            Main
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
