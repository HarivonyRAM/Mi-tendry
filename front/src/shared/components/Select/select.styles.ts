import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import type { ContainerProps, LabelPlacement } from "./select.types";

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
        gap: "8px",
    },
    "& .MuiFormControl-root": {
        gap: "5px",
        width: "100%",
        "& .MuiInputLabel-root": {
            // color: "initial",
            "&.Mui-focused": {},
            "& .MuiInputLabel-asterisk": { display: "none" },
            "&.Mui-required::after": {
                content: '" *"',
            }
        },
        "& .MuiSelect-root": {
            minWidth: "150px",
            "& .MuiSvgIcon-root": {},
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
        },
        "& .MuiAlert-root": {
            background: "none"
        },
        "& .MuiChip-root": {
            margin: "0 3px"
        }
    }
}))