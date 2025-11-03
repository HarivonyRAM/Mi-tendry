import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    "& h5": {
        textAlign: "center",
        color: theme.palette.secondary.main
    },
    "& .button_container": {
        width: "100%",
    },
    gap: "15px"
}))