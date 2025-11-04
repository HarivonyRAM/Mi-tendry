import { useAppDispatch } from "../../../app/store/hooks"
import { getTemplateList } from "../services/music.service"
import { setMusics } from "../slices/music.slice"
import type { Music } from "../types"

const useMusic = () => {
    const dispatch = useAppDispatch()
    const getList = async (): Promise<Music[]> => {
        const list = await getTemplateList()
        dispatch(setMusics(list))
    
        return list
    }

    return { getList }
}

export default useMusic