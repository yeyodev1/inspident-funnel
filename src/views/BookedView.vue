<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BookedHeader from '@/components/booked/BookedHeader.vue'
import BookedHero from '@/components/booked/BookedHero.vue'
import BookedSteps from '@/components/booked/BookedSteps.vue'
import BookedTeam from '@/components/booked/BookedTeam.vue'
import BookedFooter from '@/components/booked/BookedFooter.vue'

const contactName = computed(() => {
  try {
    const stored = localStorage.getItem('ins_contact')
    if (!stored) return ''
    return JSON.parse(stored).nombre ?? ''
  } catch { return '' }
})

onMounted(() => {
  const alreadyFired = sessionStorage.getItem('ins_complete_fired')
  if (!alreadyFired) {
    ;(window as any).fbq?.('track', 'CompleteRegistration', { content_name: 'cita-dental' })
    sessionStorage.setItem('ins_complete_fired', '1')
  }
})

const steps = [
  {
    icon: 'fa-envelope-open-text',
    title: 'Revisa tu correo y WhatsApp',
    desc: 'Te enviaremos la confirmación con fecha, hora y dirección de la clínica.',
  },
  {
    icon: 'fa-credit-card',
    title: 'Ten lista tu tarjeta el día de la cita',
    desc: 'Se requieren $10 como garantía de reserva al llegar — se descuentan del tratamiento.',
  },
  {
    icon: 'fa-face-smile',
    title: 'Disfruta tu transformación',
    desc: 'Nuestros especialistas te recibirán y comenzarán con tu evaluación personalizada.',
  },
]

const team = {
  name: 'Nuestros Especialistas',
  role: 'Equipo Inspident',
  note: 'Serás atendido/a por uno de nuestros especialistas certificados en estética dental. El equipo revisará tu caso y diseñará el tratamiento ideal para ti.',
}
</script>

<template>
  <div class="booked-view">
    <BookedHeader />

    <main class="booked-view__container">
      <BookedHero :contact-name="contactName" />
      <BookedSteps :steps="steps" />
      <BookedTeam :team="team" />

      <p class="booked-view__disclaimer">
        <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
        Tu información está protegida y no será compartida con terceros.
        Al agendar tu cita aceptas nuestras
        <RouterLink to="/politicas-privacidad">Políticas de Privacidad</RouterLink>.
      </p>
    </main>

    <BookedFooter />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: colors.$INS-DARK;
  font-family: fonts.$font-secondary;

  &__container {
    flex: 1;
    max-width: 620px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    @media (min-width: 768px) { padding: 0 2rem 3rem; }
  }
}

.booked-view__disclaimer {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.76rem;
  color: #A0B0C5;
  line-height: 1.55;
  margin: 0;
  i { font-size: 0.8rem; flex-shrink: 0; margin-top: 1px; color: #C0D0E0; }
  a { color: colors.$INS-BLUE; text-decoration: none; &:hover { text-decoration: underline; } }
}
</style>
