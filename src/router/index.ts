import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '@/views/FunnelView.vue'
import BookingView from '@/views/BookingView.vue'
import BookedView from '@/views/BookedView.vue'
import NoSpaceView from '@/views/NoSpaceView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import LegalNoticeView from '@/views/LegalNoticeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    {
      path: '/',
      name: 'funnel',
      component: FunnelView,
      meta: {
        title: 'Inspident | Blanqueamiento · Fillers · Estética Dental',
        description:
          'Transforma tu sonrisa con blanqueamiento profesional y fillers naturales. Resultados visibles desde la primera sesión. Agenda tu cita ahora.',
        canonical: 'https://inspident.com/',
        ogTitle: 'Inspident | Estética Dental Profesional',
        ogDescription:
          'Blanqueamiento dental, fillers labiales y tratamientos estéticos. Especialistas certificados, tecnología de última generación.',
        ogUrl: 'https://inspident.com/',
      } satisfies RouteMeta,
      beforeEnter: (_to, _from, next) => {
        if (import.meta.env.DEV) return next()
        const disqAt = localStorage.getItem('ins_disq_at')
        if (disqAt) {
          const elapsed = Date.now() - Number(disqAt)
          if (elapsed < 24 * 60 * 60 * 1000) return next('/sin-espacio')
        }
        next()
      },
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Cita | Inspident',
        description: 'Selecciona el día y hora para tu consulta dental con nuestros especialistas.',
        canonical: 'https://inspident.com/agendar',
        ogTitle: 'Agenda tu Cita | Inspident',
        ogDescription: 'Elige tu horario y reserva tu consulta dental en Inspident.',
        ogUrl: 'https://inspident.com/agendar',
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        title: 'Cita Confirmada | Inspident',
        description: 'Tu cita en Inspident está confirmada. Revisa tu correo con los detalles.',
        canonical: 'https://inspident.com/cita-confirmada',
        ogTitle: 'Cita Confirmada | Inspident',
        ogDescription: '¡Tu cita está confirmada! Nuestros especialistas te esperan.',
        ogUrl: 'https://inspident.com/cita-confirmada',
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        title: 'Sin disponibilidad | Inspident',
        description: '',
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | Inspident',
        description: 'Política de privacidad de Inspident.',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | Inspident',
        description: 'Aviso legal de Inspident.',
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      redirect: '/',
    },
  ],
})

router.afterEach((to) => {
  const meta = to.meta as RouteMeta
  if (meta?.title) document.title = String(meta.title)

  const desc = document.querySelector('meta[name="description"]')
  if (desc && meta?.description) desc.setAttribute('content', String(meta.description))

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle && meta?.ogTitle) ogTitle.setAttribute('content', String(meta.ogTitle))

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && meta?.ogDescription) ogDesc.setAttribute('content', String(meta.ogDescription))

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical && meta?.canonical) canonical.setAttribute('href', String(meta.canonical))
})

export default router
