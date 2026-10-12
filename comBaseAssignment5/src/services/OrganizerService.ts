import apiClient from './AxiosClient'
import type { Organizer } from '@/types'

export default {
  
  getOrganizers() {
    return apiClient.get('/organizers')
  },
  getOrganizersPage(perPage: number, page: number) {
    return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  
  saveOrganizer(organizer: Omit<Organizer, 'id'>) {
    return apiClient.post('/organizers', organizer)
  },
  getOrganizerImages(images: string[]) {
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
