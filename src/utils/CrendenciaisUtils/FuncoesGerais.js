export const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const verifyEmail = (email, setErrorEmail) => {
    if (email == "") {
        setErrorEmail("Insira um email válido.");
        return 1;
    }
    if (!emailRegex.test(email)) {
        setErrorEmail("O email inserido não está formatado corretamente.");
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

export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
};

export const handleMouseDownPassword = (event) => {
    event.preventDefault();
};
