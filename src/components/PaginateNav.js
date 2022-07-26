import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PaginateNumbers from "./PaginateNumbers";

export default function PaginateNav(props) {
    const { data, itemsPerPage, currentPage } = props;
    const pageNumbers = [];
    const navigate = useNavigate();
    const intervalo = 2;

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

                {pageNumbers.map((i) => {
                    return (
                        <div key={i}>
                            <PaginateNumbers
                                i={i}
                                buttonNavigate={buttonNavigate}
                                currentPage={currentPage}
                                pageNumbers={pageNumbers}
                                intervalo={intervalo}
                            />
                        </div>
                    );
                })}

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
