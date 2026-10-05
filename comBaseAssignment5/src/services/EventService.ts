import axios from 'axios'
import type { Event as EventType } from '@/types'


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent ( id : number ){
    return apiClient.get ('/events/' + id)
  },
  saveEvent(event: EventType) {
    return apiClient.post('/events', event)
  },
  getEventByKeyword(keyword: string, perPage:number, page: number){
    return apiClient.get('/events?title='+keyword+'&_limit='+perPage+'&_page='+page)
  },
  getEventImages(images: string[]) {
    return Promise.all(
      images.map((image) =>
      apiClient
        .get<string>('/presignedUrl', {
          params: { filename: image },
          responseType: 'text',
        })
        .then((response)=>response.data),
    ),
    )
  }
}
