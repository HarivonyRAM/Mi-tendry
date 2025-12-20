import { Box, Stack, Typography, Menu } from "@mui/material"
import Button from "../../shared/components/Button/Button"
import { StyledContainer } from "./header.styles"
import useAuth from "../../features/auth/hooks/useAuth"
import { useEffect, useState } from "react"
import TemplateList from "../../features/music/components/TemplateList/TemplateList"
import useMusic from "../../features/music/hooks/useMusic"

const Header = () => {
    const { logout } = useAuth()
    const [ anchorEl, setAnchorEl ] = useState<any>(null)
    const { getList } = useMusic()
    useEffect(() => {
        getList()
    }, [])

    return(
        <StyledContainer>
{/*            <Button
                variant="outlined"
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                Choisir un template
            </Button>*/}
            <Box component="img" src="/ispm.jpeg" className="logo_ispm"/>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <TemplateList/>
            </Menu>
            <Stack className="logo">
                <Box component="img" src="/logo.png"/>
                <Typography variant="h4" fontWeight="bold">Mi-tendry</Typography>
            </Stack>
            <Button onClick={logout}>
                Déconnexion
            </Button>
        </StyledContainer>
    )
}

export default Header