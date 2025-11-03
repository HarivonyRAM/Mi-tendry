import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import type { ContainerProps, LabelPlacement } from "./input.types";

const getFormDirection = (labelPlacement: LabelPlacement) => {
    switch(labelPlacement){
        case "left": return "row"
        case "bottom": return "column-reverse"
        case "right": return "row-reverse"
        default: return "column"
    }
}

export const StyledContainer = styled(Stack, {
    shouldForwardProp: (prop) => !["labelplacement"].includes(prop as string)
})<ContainerProps>(({ labelplacement }) => ({
    "& .field-container": {
        alignItems: ["top", "bottom"].includes(labelplacement) ? "start" : "center",
        flexDirection: getFormDirection(labelplacement),
        justifyContent: "center",
        gap: "8px",
    },
    "& .MuiFormControl-root": {
        gap: "5px",
        width: "100%"
    },
    "& .MuiTypography-root": {
        // fontFamily: font,
        whiteSpace: "nowrap",
    },
    "& .MuiAlert-root": {
        background: "none"
    },
    "&>.MuiStack-root": {
        width: "100%",
        gap: "5px",
    }
}))