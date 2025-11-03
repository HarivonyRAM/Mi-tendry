import type { LogoutComponent } from "./logout.types"
import { useTranslation } from "react-i18next"
import { StyledContainer } from "./logout.styles"
import useAuth from "../../hooks/useAuth"
import Button from "../../../../shared/components/Button/Button"
import { useState } from "react"
import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material"

const Logout: LogoutComponent = () => {
    const [ dialogOpen, setDialogOpen ] = useState(false)
    const { t } = useTranslation()
    const { logout } = useAuth()

    const onLogout = () => {
        try {
            logout()
            window.location.reload()
        } catch (e) {
            console.error("Logout failed:", e)
        }
    }
    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    return (
        <StyledContainer>
            <Button onClick={handleOpenDialog}>{t("auth.logout.buttonlabel")}</Button>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            >
                <DialogContent>
                    <Typography>{t("auth.logout.dialoglabel")}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onLogout}>{t("auth.logout.yes")}</Button>
                    <Button onClick={handleCloseDialog}>{t("auth.logout.no")}</Button>
                </DialogActions>
            </Dialog>
        </StyledContainer>
    )
}

export default Logout