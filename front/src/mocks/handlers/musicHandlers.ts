import { apiUrl } from '../../app/config'
import { http, HttpResponse } from 'msw'
import mockMusics from '../musics.mock-data'
 
const authHandlers = [
    http.get(`${apiUrl}/template/list`, async () =>{
        return HttpResponse.json({ list: mockMusics })
    }),
]

export default authHandlers