import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function PaginateNav(props) {
    const { data, itemsPerPage, currentPage } = props;
    const pageNumbers = [];
    const navigate = useNavigate();

    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const buttonNavigate = (/*e,*/ i) => {
        // e.preventDefault();

        if (i == "<") navigate(`/${+currentPage - 1}`);
        else if (i == ">") navigate(`/${+currentPage + 1}`);
        else navigate(`/${i}`);
    };

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item p-1">
                    <Button
                        onClick={(e) => buttonNavigate(/*e,*/ "<")}
                        disabled={currentPage == 1 ? true : false}
                    >
                        {"<"}
                    </Button>
                </li>
                {pageNumbers.map((n) => (
                    <li key={n} className="page-item p-1">
                        <Button
                            onClick={(e) => {
                                buttonNavigate(/*e,*/ n);
                            }}
                            className={currentPage == n ? "" : "page-link"}
                        >
                            {n}
                        </Button>
                    </li>
                ))}
                <li className="page-item p-1">
                    <Button
                        onClick={(e) => buttonNavigate(/*e,*/ ">")}
                        disabled={
                            currentPage == pageNumbers.length ? true : false
                        }
                    >
                        {">"}
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
