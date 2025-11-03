import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(() => ({
    "& h6": { textAlign: "center" },
    "& .button_container": {
        width: "100%",
    },
    gap: "15px"
}))