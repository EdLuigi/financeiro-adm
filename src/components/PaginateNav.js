import React, { useEffect, useState } from "react";

export default function PaginateNav(props) {
    const { data, itemsPerPage, paginate } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item p-1">
                    <a onClick={() => paginate("<")} className="page-link">
                        {"<"}
                    </a>
                </li>
                {pageNumbers.map((n) => (
                    <li key={n} className="page-item p-1">
                        <a
                            onClick={(e) => {
                                // e.preventDefault();
                                paginate(n);
                            }}
                            href="#"
                            className="page-link"
                        >
                            {n}
                        </a>
                    </li>
                ))}
                <li className="page-item p-1">
                    <a onClick={() => paginate(">")} className="page-link">
                        {">"}
                    </a>
                </li>
            </ul>
        </nav>
    );
}
