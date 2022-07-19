import React, { useEffect, useState } from "react";
import ListagemCard from "./ListagemCard";
import PaginateNav from "./PaginateNav";

export default function Paginate(props) {
    const { data, handleDelete, loading } = props;
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Get current posts
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setItems([...data]);
    }, []);

    return (
        <div>
            <div>
                {currentItems.map((i) => (
                    <div key={i.id}>
                        <ListagemCard
                            i={i}
                            handleDelete={handleDelete}
                            loading={loading}
                        />
                    </div>
                ))}
            </div>
            <div className="d-flex align-items-center justify-content-center p-4">
                <PaginateNav
                    data={data}
                    itemsPerPage={itemsPerPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
}
