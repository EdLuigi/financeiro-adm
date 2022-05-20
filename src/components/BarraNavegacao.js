import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function BarraNavegacao() {
    const { logout } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (e) {
            console.log("erro: " + e);
        }
    };
    return (
        <Navbar
            bg="primary"
            variant="dark"
            expand="lg"
            style={{ paddingInline: "20px" }}
            fixed="top"
        >
            <Navbar.Brand>Dashboard Financeiro</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">
                        Início
                    </Nav.Link>
                    <Nav.Link as={Link} to="/inserir-lancamento">
                        Inserir Lançamento
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/" onClick={(e) => handleLogout(e)}>
                        Sair
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
