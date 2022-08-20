export const handleLancamentosFiltrado = (arr, setLancamentosFiltrado) => {
    setLancamentosFiltrado(arr);
    return arr;
};
export const sortDates = (arr) => {
    return [...arr].sort((a, b) => a.criado_em.toDate() < b.criado_em.toDate());
};
