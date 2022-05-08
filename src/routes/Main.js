import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function Main() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (e) {
            console.log("erro: " + e);
        }
    };
    return (
        <>
            {}
            <div>
                Main
                <br />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
