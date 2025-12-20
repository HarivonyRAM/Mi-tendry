import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const StyledContainer = styled(Stack)(({ theme }) => ({
    padding: "5px 20px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "& .logo_ispm": {
        height: "60px",
    },
    "& .logo": {
        flexDirection: "row",
        alignItems: "center",
        "& img": {
            height: "80px"
        }
    },

    [theme.breakpoints.down('md')]: {
        "& .logo img": {
            height: "60px"
        }
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: "10px"
    },
}))