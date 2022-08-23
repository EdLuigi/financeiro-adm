import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const PasswordComponent = ({
    label,
    errorPassword,
    setPassword,
    tipo,
    required,
    value,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (showPassword, setShowPassword) => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            required={required ?? false}
            margin="normal"
            fullWidth
            label={label}
            error={errorPassword == "" ? false : true}
            helperText={
                errorPassword != ""
                    ? errorPassword
                    : tipo == 0
                    ? "Sua senha deve ter no mínimo 6 caracteres."
                    : ""
            }
            type={showPassword ? "text" : "password"}
            value={value ?? ""}
            onChange={(e) => setPassword(e.currentTarget.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                                handleClickShowPassword(
                                    showPassword,
                                    setShowPassword
                                )
                            }
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};
