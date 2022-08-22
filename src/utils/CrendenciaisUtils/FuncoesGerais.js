export const emailRegex = /^[-\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const verifyEmail = (email, setErrorEmail) => {
    if (email == "") {
        setErrorEmail("Insira um e-mail válido.");
        return 1;
    }
    if (!emailRegex.test(email)) {
        setErrorEmail("O e-mail inserido não está formatado corretamente.");
        return 1;
    }
    return 0;
};

export const verifyPassword = (password, setErrorPassword) => {
    if (password == "") {
        setErrorPassword("Insira sua senha.");
        return 1;
    }
    if (password.length < 6) {
        setErrorPassword("Insira uma senha com no mínimo 6 caracteres.");
        return 1;
    }
    return 0;
};

export const verifyConfirmPassword = (
    password,
    confirmPassword,
    setErrorConfirmPassword
) => {
    if (confirmPassword == "") {
        setErrorConfirmPassword("Insira sua senha.");
        return 1;
    }
    if (confirmPassword != password) {
        setErrorConfirmPassword("As senhas inseridas não são iguais.");
        return 1;
    }
    return 0;
};

export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
};

export const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

export const handleErro = (e, setErro) => {
    if (e.code == "auth/network-request-failed") {
        setErro("Verifique sua conexão com a internet.");
        return;
    }
    if (e.code == "auth/too-many-requests") {
        setErro("Muitas tentativas, tente novamente mais tarde.");
        return;
    }
    if (e.code == "auth/user-not-found") {
        setErro("O e-mail inserido não está registrado.");
        return;
    }
    if (e.code == "auth/email-already-in-use") {
        setErro("O e-mail inserido já está registrado.");
        return;
    }
    if (e.code == "auth/wrong-password") {
        setErro("Não foi possível fazer login, e-mail ou senha incorretos.");
        return;
    }
    if (e.code == "auth/invalid-email") {
        setErro("O formatado de e-mail inserido não é suportado.");
        return;
    }
    if (e.code == "auth/requires-recent-login") {
        setErro(
            "Essa operação necessita de uma autenticação recente. Por favor saia da sua conta e entre novamente."
        );
        return;
    }
    setErro("Algo deu errado, não foi possível concluir a operação.");
};
