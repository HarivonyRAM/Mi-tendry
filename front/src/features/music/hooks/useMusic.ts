import { useAppDispatch } from "../../../app/store/hooks"
import { getTemplateList, playMusic, playNewMusic } from "../services/music.service"
import { setMusics } from "../slices/music.slice"
import type { Music } from "../types"

const useMusic = () => {
    const dispatch = useAppDispatch()
    const getList = async (): Promise<Music[]> => {
        const list = await getTemplateList()
        dispatch(setMusics(list))
    
        return list
    }

    const playNew = async(file: File, type: string): Promise<any[]> => {
        return await playNewMusic(file, type)
    }

    const play = async(id: string, type: string) => {
        await playMusic(id, type)
    }

    return { getList, play, playNew }
}

export default useMusic