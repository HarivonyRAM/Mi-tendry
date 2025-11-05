import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    "& .wrapper": {
        gap: "15px",
        "& .actions": {
            alignItems: "flex-end"
        }
    },
    "& .result": {
        gap: "20px",
        flexDirection: "row"
    },
    "& img": {
        height: "400px"
    },

    [theme.breakpoints.down('lg')]: {
        flexDirection: "column"
    },
}))