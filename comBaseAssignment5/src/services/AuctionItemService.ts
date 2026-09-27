import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuctionItems() {
    return apiClient.get('/auctionItems')
  },
  getAuctionItemsBySearch(description: string, type: string) {
    return apiClient.get(
      '/auctionItems?description=' +
        encodeURIComponent(description) +
        '&type=' +
        encodeURIComponent(type)
    )
  }
}
