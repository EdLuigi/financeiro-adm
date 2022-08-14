import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/listar")}>
                <ListItemIcon>
                    <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Lançamentos" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/inserir-lancamento")}>
                <ListItemIcon>
                    <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="Adicionar" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const SecondaryListItems = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (e) {
            console.log("erro: " + e);
        }
    };

    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                {/* Usuário */}
            </ListSubheader>
            <ListItemButton onClick={() => navigate("/perfil")}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
            </ListItemButton>
            <ListItemButton onClick={(e) => handleLogout(e)}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItemButton>
        </React.Fragment>
    );
};
