import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    height: "100vh",
    overflow: "hidden",
    justifyContent: "space-between",
    paddingBottom: "50px",
    boxSizing: "border-box",

    [theme.breakpoints.down('md')]: {
        overflow: "overlay"
    },
}))