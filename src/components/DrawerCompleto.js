import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import DrawerComponent from "./Drawer";

export const DrawerCompleto = ({ title, children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <DrawerComponent title={title} />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
