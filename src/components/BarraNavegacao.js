import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BarraNavegacao() {
    return (
        <Navbar bg="dark" variant={"dark"} expand="lg">
            <Navbar.Brand href="#">Dashboard Financeiro</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                >
                    <Nav.Link as={Link} to="/">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/inserir-lancamento">
                        Inserir Lançamento
                    </Nav.Link>
                    <Nav.Link as={Link} to="/listar-lancamentos">
                        Listar Lançamentos
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
