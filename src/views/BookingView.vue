<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const iframeHeight = ref(1100)

const BASE_URL = 'https://api.leadconnectorhq.com/widget/booking/Dqe1lrB2Ieejmm25uJSP'

const calendarUrl = computed(() => {
  try {
    const stored = localStorage.getItem('ins_contact')
    if (!stored) return BASE_URL
    const { nombre, email, phone } = JSON.parse(stored)
    const params = new URLSearchParams()
    if (nombre) params.set('firstName', nombre)
    if (email) params.set('email', email)
    if (phone) params.set('phone', phone)
    const qs = params.toString()
    return qs ? `${BASE_URL}?${qs}` : BASE_URL
  } catch {
    return BASE_URL
  }
})

const onMessage = (event: MessageEvent) => {
  if (Array.isArray(event.data) && event.data[0] === 'msgsndr-booking-complete') {
    localStorage.setItem('ins_booked_at', String(Date.now()))
    router.push('/cita-confirmada')
  }
  if (event.data?.type === 'booking-app' && typeof event.data.height === 'number') {
    iframeHeight.value = event.data.height + 40
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)

  if (!document.getElementById('ghl-form-embed-script')) {
    const script = document.createElement('script')
    script.id = 'ghl-form-embed-script'
    script.src = 'https://api.leadconnectorhq.com/js/form_embed.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)
  }
})

onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div class="booking">

    <!-- TOPBAR -->
    <header class="booking__topbar">
      <span class="booking__logo-text">INSPIDENT</span>
      <div class="booking__stepper" aria-label="Progreso de reserva">
        <span class="booking__step booking__step--done">
          <i class="fa-solid fa-check"></i> Datos
        </span>
        <span class="booking__step-sep">›</span>
        <span class="booking__step booking__step--active">Agenda</span>
      </div>
    </header>

    <main class="booking__main">

      <!-- Heading -->
      <section class="booking__heading">
        <span class="booking__eyebrow">
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          Paso final
        </span>
        <h1 class="booking__title">
          Elige el horario de tu
          <span class="booking__title-accent">consulta dental</span>
        </h1>
        <p class="booking__subtitle">
          Selecciona el día y hora que mejor te convenga. Nuestros especialistas están listos para atenderte.
        </p>
      </section>

      <!-- Deposit notice -->
      <div class="booking__deposit-notice">
        <i class="fa-solid fa-credit-card" aria-hidden="true"></i>
        <div>
          <strong>Garantía de reserva: $10 con tarjeta</strong>
          <p>Se solicita al confirmar tu cita. Este valor se descuenta de tu tratamiento el día de la visita.</p>
        </div>
      </div>

      <!-- Calendar iframe -->
      <div class="calendar__wrap">
        <iframe
          :src="calendarUrl"
          :style="{ height: iframeHeight + 'px' }"
          title="Agenda tu cita en Inspident"
          class="calendar__iframe"
          frameborder="0"
          scrolling="no"
          id="Dqe1lrB2Ieejmm25uJSP_1"
        ></iframe>
      </div>

    </main>

    <!-- Footer -->
    <footer class="booking__footer">
      <nav class="booking__footer-links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="booking__footer-copy">© {{ new Date().getFullYear() }} INSPIDENT. Todos los derechos reservados.</p>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booking {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: colors.$INS-DARK;
  font-family: fonts.$font-secondary;

  &__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid #EFF6FF;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  &__logo-text {
    @include fonts.heading-font(800);
    font-size: 1.1rem;
    color: colors.$INS-BLUE;
    letter-spacing: 0.04em;
  }

  &__stepper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: fonts.$font-interface;
    font-size: 0.78rem;
    font-weight: 600;
  }

  &__step {
    color: #A0B5CC;
    &--done { color: #34D399; }
    &--active { color: colors.$INS-BLUE; font-weight: 700; }
    i { margin-right: 0.2rem; }
  }

  &__step-sep { color: #CBD5E0; }

  &__main {
    flex: 1;
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    @media (min-width: 768px) { padding: 2.5rem 2rem 3rem; }
  }
}

.booking__heading {
  text-align: center;
}

.booking__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(colors.$INS-BLUE, 0.08);
  border: 1px solid rgba(colors.$INS-BLUE, 0.18);
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  color: colors.$INS-BLUE;
  font-family: fonts.$font-interface;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
  i { font-size: 0.72rem; }
}

.booking__title {
  @include fonts.heading-font(800);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  color: colors.$INS-DARK;
  margin: 0 0 0.6rem;
  letter-spacing: -0.025em;
  line-height: 1.2;
  &-accent { color: colors.$INS-BLUE; }
}

.booking__subtitle {
  font-size: 0.93rem;
  color: #4A5F7A;
  line-height: 1.6;
  margin: 0;
}

// ── Deposit notice ────────────────────────────────────────────────────────────
.booking__deposit-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #EFF6FF;
  border: 1.5px solid #BFDBFE;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  i {
    color: colors.$INS-BLUE;
    font-size: 1.1rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
  strong {
    display: block;
    font-family: fonts.$font-interface;
    font-size: 0.88rem;
    font-weight: 700;
    color: colors.$INS-DARK;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.82rem;
    color: #4A5F7A;
    line-height: 1.5;
    margin: 0;
  }
}

// ── Calendar ─────────────────────────────────────────────────────────────────
.calendar__wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #DBEAFE;
  box-shadow: 0 4px 24px rgba(30, 64, 175, 0.06);
}

.calendar__iframe {
  width: 100%;
  display: block;
  min-height: 600px;
}

// ── Footer ───────────────────────────────────────────────────────────────────
.booking__footer {
  padding: 1.5rem;
  border-top: 1px solid #EFF6FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  &-links {
    display: flex;
    gap: 1.5rem;
    a { font-size: 0.76rem; color: #B0C0D5; text-decoration: none; &:hover { color: colors.$INS-DARK; } }
  }

  &-copy { font-size: 0.72rem; color: #C8D8ED; margin: 0; }
}
</style>
