import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListagemCard from "./ListagemCard";

export default function Paginate(props) {
    const { data, children } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 4;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div>
                {currentItems.map((i) => (
                    <div key={i.id}>
                        <ListagemCard
                            i={i}
                            handleDelete={props.handleDelete}
                            loading={props.loading}
                        />
                    </div>
                ))}
            </div>

            <br />
            <ReactPaginate
                nextLabel="próxima >"
                onPageChange={handlePageClick}
                previousLabel="< anterior"
                renderOnZeroPageCount={null}
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageRangeDisplayed={5}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </>
    );
}
