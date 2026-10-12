import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import AddEventView from '@/views/event/EventFormView.vue'
import AuctionItemListView from '@/views/AuctionItemListView.vue'
import AddOrganizerView from '@/views/OrganizerFormView.vue'
import OrganizerListView from '@/views/OrganizerListView.vue'
import OrganizerDetailView from '@/views/OrganizerDetailView.vue'
import OrganizerService from '@/services/OrganizerService'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'


import { useEventStore } from '@/stores/event'
import { useOrganizerStore } from '@/stores/organizer'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1')})
    },    
    {
      path:'/login',
      name:'login-view',
      component: LoginView
    },
    {
      path:'/register',
      name:'register-view',
      component: RegisterView
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          // need to setup the data for the event
          eventStore.setEvent(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else{
            return { name: 'network-error-view' }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/auction-items',
      name: 'auction-item-list-view',
      component: AuctionItemListView
    },
    {
      path:'/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/organizer',
      name: 'organizer',
      component: OrganizerListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1')})
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView
    },
    {
      path: '/organizer/:id',
      name: 'organizer-detail-view',
      component: OrganizerDetailView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const organizerStore = useOrganizerStore()
        return OrganizerService.getOrganizer(id)
        .then((response) => {
          
          organizerStore.setOrganizer(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'organizer' }
            }
          } else{
            return { name: 'network-error-view' }
          }
        })
      }
    },


    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
    return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
