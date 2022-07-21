import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListagemCard from "./ListagemCard";
import PaginateNav from "./PaginateNav";

export default function Paginate(props) {
    const { data, handleDelete, loading } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 5;
    const { index } = useParams();
    const currentPage = !isNaN(index) ? index : 1;
    const navigate = useNavigate();

    const deletar = async (i) => {
        await handleDelete(i);
        if (currentItems.length == 1 && currentPage != 1) {
            navigate(`/${+currentPage - 1}`);
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
                {currentItems.length == 0 ? "Nada pra ver aqui :^)" : <></>}
            </div>
            <div className="d-flex align-items-center justify-content-center p-4">
                <PaginateNav
                    data={data}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
