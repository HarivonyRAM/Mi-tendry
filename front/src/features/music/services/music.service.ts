import { getTemplateListRequest } from "../api/music.api"
import type { Music } from "../types"

const getTemplateList = async (): Promise<Music[]> => {
    const { list } = await getTemplateListRequest()
    return list
}

export { getTemplateList }