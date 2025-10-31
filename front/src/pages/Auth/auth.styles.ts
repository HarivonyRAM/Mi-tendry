import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    background: theme.custom.background,
    height: "100vh",
    gap: "15px",
}))