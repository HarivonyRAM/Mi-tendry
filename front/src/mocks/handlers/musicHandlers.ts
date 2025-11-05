import { apiUrl } from '../../app/config'
import { http, HttpResponse } from 'msw'
import { mockMusics, mockResults } from '../musics.mock-data'
 
const musicHandlers = [
    http.get(`${apiUrl}/template/list`, async () =>{
        return HttpResponse.json({ list: mockMusics })
    }),

    http.post(`${apiUrl}/play/new`, async () =>{
        return HttpResponse.json({ list: mockResults })
    }),
]

export default musicHandlers