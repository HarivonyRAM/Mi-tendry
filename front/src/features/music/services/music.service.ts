import { getTemplateListRequest, playNewRequest, playRequest } from "../api/music.api"
import type { Music } from "../types"

const getTemplateList = async (): Promise<Music[]> => {
    const { list } = await getTemplateListRequest()
    return list
}

const playNewMusic = async (file: File, type: string): Promise<any[]> => {
    const { list } = await playNewRequest(file, type)
    return list
}

const playMusic = async (id: string, type: string) => {
    await playRequest(id, type)
}

export { getTemplateList, playNewMusic, playMusic }