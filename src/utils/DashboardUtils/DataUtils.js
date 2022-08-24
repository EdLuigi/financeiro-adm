export const handleLancamentosFiltrado = (arr, setLancamentosFiltrado) => {
    setLancamentosFiltrado(arr);
    return arr;
};
export const sortDates = (arr) => {
    return arr.sort((a, b) => b.criado_em - a.criado_em);
};
