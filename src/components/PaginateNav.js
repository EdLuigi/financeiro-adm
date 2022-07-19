import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function PaginateNav(props) {
    const { data, itemsPerPage, paginate, currentPage } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item p-1">
                    <Button
                        onClick={() => paginate("<")}
                        disabled={currentPage == 1 ? true : false}
                    >
                        {"<"}
                    </Button>
                </li>
                {pageNumbers.map((n) => (
                    <li key={n} className="page-item p-1">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                paginate(n);
                            }}
                            href="#"
                            className={currentPage == n ? "" : "page-link"}
                        >
                            {n}
                        </Button>
                    </li>
                ))}
                <li className="page-item p-1">
                    <Button
                        onClick={() => paginate(">")}
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
