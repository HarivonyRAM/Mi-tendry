import { getTemplateListRequest } from "../api/music.api"
import type { Music } from "../types"
import { setMusics } from "../slices/music.slice"

const getTemplateList = async (): Promise<Music[]> => {
    const { list } = await getTemplateListRequest()
    setMusics(list) // TODO Verify if mandeha pr

    return list
}

export default { getTemplateList }