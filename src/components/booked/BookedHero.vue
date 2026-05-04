<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  contactName: {
    type: String,
    required: false,
    default: '',
  },
})

const heroContent = ref<HTMLElement | null>(null)
const checkIcon = ref<HTMLElement | null>(null)

onMounted(() => {
  if (heroContent.value && checkIcon.value) {
    const tl = gsap.timeline()
    tl.from(checkIcon.value, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' })
    tl.from(
      heroContent.value.querySelectorAll('.animate-up'),
      { y: 20, opacity: 0, duration: 0.45, stagger: 0.12, ease: 'power2.out' },
      '-=0.2'
    )
  }
})
</script>

<template>
  <section class="booked-hero" ref="heroContent">
    <div class="booked-hero__icon-wrap" ref="checkIcon">
      <i class="fa-solid fa-circle-check booked-hero__check-icon"></i>
    </div>

    <h1 class="booked-hero__title animate-up">
      <template v-if="props.contactName">¡Listo, {{ props.contactName }}!</template>
      <template v-else>¡Tu cita está confirmada!</template>
    </h1>

    <p class="booked-hero__subtitle animate-up">
      En breve recibirás la confirmación en tu correo y WhatsApp con todos los detalles
      de tu cita. Nuestro equipo está listo para transformar tu sonrisa.
    </p>

    <div class="booked-hero__deposit animate-up">
      <i class="fa-solid fa-credit-card"></i>
      <p>Recuerda llevar <strong>$10 en tarjeta</strong> el día de tu cita como garantía de reserva.
         Este valor se descuenta de tu tratamiento.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-hero {
  padding: 2.5rem 0 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__icon-wrap {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #EFF6FF;
    border: 2.5px solid #DBEAFE;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__check-icon {
    font-size: 2.2rem;
    color: colors.$INS-BLUE;
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(1.7rem, 4vw, 2.2rem);
    color: colors.$INS-DARK;
    margin: 0;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: 0.93rem;
    color: #4A5F7A;
    line-height: 1.65;
    margin: 0;
    max-width: 480px;
  }

  &__deposit {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    background: #EFF6FF;
    border: 1.5px solid #DBEAFE;
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    max-width: 420px;
    text-align: left;
    i { color: colors.$INS-BLUE; font-size: 0.95rem; margin-top: 2px; flex-shrink: 0; }
    p { font-size: 0.82rem; color: #4A5F7A; line-height: 1.5; margin: 0; }
    strong { color: colors.$INS-DARK; }
  }
}
</style>
