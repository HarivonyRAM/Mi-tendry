import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    width: "min(200px, 80%)",
    boxShadow: "0px 0px 15px 0px #dddddd",
    padding: "25px",
    borderRadius: "5px",
    gap: "15px",
    "& .head": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "& p": {
            fontWeight: "bold"
        }
    },
    "& img": {
        width: "125px",
        alignSelf: "center",
        borderRadius: "15px",
    },
    "& .body": {
        alignItems: "center",
        gap: "20px",
        "& .MuiIconButton-root": {
            background: theme.palette.primary.main,
            color: "#eeeeee",
            aspectRatio: "1/1"
        }
    },
}))