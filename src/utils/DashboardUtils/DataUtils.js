export const fetchData = async () => {
    try {
        setMensagem("Carregando...");

        const data = await listar(currentUser.uid);

        await updateUserName();

        setLancamentos(
            handleLancamentosFiltrado(
                sortDatas(
                    contarEntradasSaidas(
                        data.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }))
                    )
                )
            )
        );

        setMensagem("- Você não possui lançamentos -");
    } catch (error) {
        console.log("erro: " + error);
        setMensagem("Algo deu errado :(");
    }
};
