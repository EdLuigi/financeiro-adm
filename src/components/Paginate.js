import React, { useEffect, useState } from "react";
import ListagemCard from "./ListagemCard";
import PaginateNav from "./PaginateNav";

export default function Paginate(props) {
    const { data, handleDelete, loading } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 5;

    const paginate = (i) => {
        if (i == "<") {
            setCurrentPage(currentPage - 1);
            return;
        }
        if (i == ">") {
            setCurrentPage(currentPage + 1);
            return;
        }
        setCurrentPage(i);
    };

    const deletar = async (i) => {
        await handleDelete(i);
        if (currentItems.length == 1 && currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        let indexOfLastItem = currentPage * itemsPerPage;
        let indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems([...data.slice(indexOfFirstItem, indexOfLastItem)]);
    }, [data, currentPage]);

    return (
        <div>
            <div>
                {currentItems.map((i) => (
                    <div key={i.id}>
                        <ListagemCard
                            i={i}
                            handleDelete={() => deletar(i)}
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
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
