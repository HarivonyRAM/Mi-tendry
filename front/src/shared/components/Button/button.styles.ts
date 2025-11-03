import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import type { ContainerProps, FeedbackPlacement } from "./button.types";

const getFormDirection = (feedbackPlacement: FeedbackPlacement) => {
    switch(feedbackPlacement){
        case "left": return "row-reverse"
        case "top": return "column-reverse"
        case "right": return "row"
        default: return "column"
    }
}

export const StyledContainer = styled(Stack, {
    shouldForwardProp: (prop) => !["feedbackplacement"].includes(prop as string)
})<ContainerProps>(({feedbackplacement, theme}) => ({
    alignItems: ["top", "bottom"].includes(feedbackplacement) ? "start" : "center",
    flexDirection: getFormDirection(feedbackplacement),
    width: "fit-content",
    "& .MuiAlert-root": {
        background: "none"
    },
    "& .MuiButton-root": {
        width: "100%",
        fontWeight: "bold",
        textTransform: "none",
        whiteSpace: "nowrap",
        padding: "8px 35px",
        transition: 'transform .3s',
        '& .MuiTouchRipple-root *': { display: 'none' },
        height: 'fit-content',
        '&:active': { transform: "scale(0.9)" },
        borderRadius: "4px",

        color: theme.custom.text,

        "& .MuiCircularProgress-root": {
            height: "24.5px",
            width: "24.5px"
        },

        "&.MuiButton-outlined": {
            overflow: 'hidden',
            borderColor: "#cccccc",
            '& p': { zIndex: '2' },
            
            '&:hover': { },
            "& .MuiButton-icon": {
            },
        },

        "&.MuiButton-contained": {
            border: "1px solid transparent",
            color: "#eeeeee",
            "&:hover": {
            }
        }
    },
}))