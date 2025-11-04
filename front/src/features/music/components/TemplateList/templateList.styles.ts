import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledItem = styled(Stack)(({ theme }) => ({
    padding: "0px 15px",
    "& .main": {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        gap: "15px"
    },
    "& img": {
        width: "50px"
    },
    "& .MuiIconButton-root": {
        background: theme.palette.primary.main,
        color: "#eeeeee",
        aspectRatio: "1/1"
    }
}))