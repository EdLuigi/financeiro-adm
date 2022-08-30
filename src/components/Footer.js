import { Typography } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

const LinkGitHub = () => {
    const marginLeftStyle = 5;
    return (
        <Typography
            sx={{ m: "38%", mt: 8 }}
            component={"div"}
            variant="body2"
            color="text.secondary"
            align="center"
        >
            <Link
                color="inherit"
                href="https://github.com/EdLuigi/financeiro-adm"
                underline="none"
                target="_blank"
                // className="w-0 d-flex align-items-center justify-content-center "
            >
                <div>
                    <GitHubIcon style={{ marginLeft: marginLeftStyle }} />
                </div>
                <div className="pt-1">{"@EdLuigi"}</div>
            </Link>
            <div style={{ marginLeft: marginLeftStyle }}>
                {new Date().getFullYear()}
            </div>
        </Typography>
    );
};

export default function Footer() {
    return <LinkGitHub />;
}
