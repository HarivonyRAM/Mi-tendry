import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import type { ContainerProps } from "./uploadForm.types";

export const StyledContainer = styled(Stack)<ContainerProps>(({ dragactive, theme }) => ({
    border: '2px dashed',
    width: "50vw",
    padding: "50px",
    boxSizing: "border-box",
    borderColor: (dragactive === "true") ? theme.palette.primary.main : "#cacaca",
    borderRadius: "5px",
    p: "4",
    gap: "20px",
    textAlign: 'center',
    transition: '0.2s',
    "& .options_container": {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        "& .MuiIconButton-root": {
            padding: "15px",
            transition: "0.2s",
            color: theme.palette.primary.main,
            "& *": { fontSize: "50px" },
            "&:hover": {
                background: theme.palette.primary.main + "33",
            }
        }
    },

    [theme.breakpoints.down('md')]: {
        width: "70vw"
    },
    [theme.breakpoints.down('sm')]: {
        width: "85vw"
    },
}))