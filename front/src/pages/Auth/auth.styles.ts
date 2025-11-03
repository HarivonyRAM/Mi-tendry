import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "15px",
    background: "linear-gradient(to bottom right, #01e59a, #017dfb, #017dfb)",
    "& .forms_container": {
        background: "#e8f9ff",
        padding: "30px",
        borderRadius: "10px",
        gap: "15px",
        alignItems: "center"
    },
    "& .logo_container": {
        "& h4": {
            fontWeight: "bold",
            color: theme.palette.secondary.main
        }
    },
    "& img": {
        width: "150px"
    }
}))