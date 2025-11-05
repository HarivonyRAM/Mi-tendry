import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    height: "100vh",
    justifyContent: "space-between",
    paddingBottom: "50px",
    boxSizing: "border-box",
    
    "& .upload__container": {
        alignItems: "center"
    },

    [theme.breakpoints.down('md')]: {
        overflow: "overlay"
    },
}))