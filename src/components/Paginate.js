import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListagemCard from "./ListagemCard";

export default function Paginate(props) {
    const { data, handleDelete, loading } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [forcepage, setForcepage] = useState(0);

    const itemsPerPage = 2;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

        // console.log(
        //     "atualizou: " +
        //         itemsPerPage +
        //         ", " +
        //         data.length +
        //         ", " +
        //         itemOffset / itemsPerPage
        // );

        // if (itemOffset == data.length) {
        //     setForcepage(forcepage - 1);
        //     console.log("entrou");
        //     //     handleEmpty();
        // }
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            "event.selected: " +
                event.selected +
                "\nitemsPerPage: " +
                itemsPerPage +
                "\ndata.length: " +
                data.length +
                "\nitemOffset: " +
                itemOffset +
                "\nforcepage: " +
                forcepage
        );
        setItemOffset(newOffset);
        setForcepage(event.selected);
    };

    const handleEmpty = (i) => {
        // if (forcepage > 0) {

        // }

        handleDelete(i);
        if (itemOffset == data.length) {
            setForcepage(forcepage - 1);
            console.log("entrou");
            //     handleEmpty();
        }
        return;

        // if (itemOffset == data.length) {
        if (false) {
            // setItemOffset(itemOffset / itemsPerPage - 1);
            const x = itemOffset - itemsPerPage;
            setItemOffset(itemOffset - itemsPerPage);
            // console.log("valor do x: " + x);
        }
        console.log();
        handleDelete();
    };

    return (
        <>
            <div>
                {currentItems.map((i) => (
                    <div key={i.id}>
                        <ListagemCard
                            i={i}
                            handleDelete={(i) => handleEmpty(i)}
                            loading={loading}
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
                pageRangeDisplayed={5}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                forcePage={forcepage}
            />
        </>
    );
}
