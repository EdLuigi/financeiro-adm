import React from "react";
import { Button } from "react-bootstrap";

export default function PaginateNumbers(props) {
    const { i, buttonNavigate, currentPage, pageNumbers, intervalo } = props;
    const botaoNumero = (
        <li key={i} className="page-item p-1">
            <Button
                onClick={(e) => {
                    buttonNavigate(/*e,*/ i);
                }}
                className={currentPage == i ? "" : "page-link"}
            >
                {i}
            </Button>
        </li>
    );
    const botaoRet = (
        <li key={i} className="page-item p-1">
            <Button disabled={true} variant="outline-primary">
                {"..."}
            </Button>
        </li>
    );

    //primeiro ou último
    if (i == 1 || i == pageNumbers.length) {
        return botaoNumero;
    }

    //reticências 1
    // if (i < currentPage - intervalo) {
    if (i == currentPage - intervalo - 1) {
        return botaoRet;
    }

    //reticências 2
    if (i == +currentPage + intervalo + 1) {
        return botaoRet;
    }

    //botão atual e os intervalo
    if (i >= currentPage - intervalo && i <= +currentPage + intervalo) {
        return botaoNumero;
    }
}
