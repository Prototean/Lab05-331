import apiClient from './AxiosClient'
import type { Event as EventType } from '@/types'


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
