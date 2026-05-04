<script setup lang="ts">
import { ref } from 'vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import CalendarModal from '@/components/CalendarModal.vue'

const registrationOpen = ref(false)
const calendarOpen = ref(false)

function openModal() {
  const stored = localStorage.getItem('ins_contact')
  if (stored) {
    calendarOpen.value = true
  } else {
    registrationOpen.value = true
  }
}

function onRegistered() {
  registrationOpen.value = false
  calendarOpen.value = true
}

const services = [
  {
    badge: 'MAS POPULAR',
    badgeIcon: 'fa-star',
    icon: 'fa-tooth',
    name: 'Blanqueamiento Dental',
    desc: 'Hasta 8 tonos más blanco en una sola sesión. Tecnología LED de última generación — sin dolor, sin sensibilidad, con resultados inmediatos que duran años.',
    features: [
      'Resultado visible desde la 1ra sesión',
      'Tecnología LED de vanguardia',
      'Sin dolor · Sin sensibilidad',
      'Efecto dura hasta 2 años',
    ],
    cta: 'Quiero mi cita',
    highlight: true,
  },
  {
    badge: null,
    badgeIcon: null,
    icon: 'fa-spa',
    name: 'Fillers Labiales',
    desc: 'Labios más voluminosos y definidos de forma 100% natural. Ácido hialurónico premium, sin cirugía, con resultados inmediatos que lucen naturales.',
    features: [
      'Resultado natural y armonioso',
      'Ácido hialurónico premium',
      'Sin cirugía ni recuperación',
      'Efecto dura 6-12 meses',
    ],
    cta: 'Quiero mi cita',
    highlight: false,
  },
  {
    badge: 'PROMO MAYO',
    badgeIcon: 'fa-gift',
    icon: 'fa-heart',
    name: 'Especial DiaMadres',
    desc: 'El regalo más especial del año: combo blanqueamiento + tratamiento estético. Celebra a mamá con una transformación real y duradera.',
    features: [
      'Blanqueamiento dental profesional',
      'Tratamiento estético incluido',
      'Kit de mantenimiento de regalo',
      'Solo disponible durante mayo',
    ],
    cta: 'Aprovechar promo',
    highlight: false,
  },
]

const steps = [
  {
    num: '01',
    icon: 'fa-calendar-check',
    title: 'Agenda tu cita online',
    desc: 'Elige el día y hora que mejor te convenga. El proceso toma menos de 2 minutos.',
  },
  {
    num: '02',
    icon: 'fa-user-doctor',
    title: 'Consulta con nuestros especialistas',
    desc: 'Te evaluamos y diseñamos el plan de tratamiento ideal para tu caso.',
  },
  {
    num: '03',
    icon: 'fa-face-smile',
    title: 'Luce tu nueva sonrisa',
    desc: 'Resultados visibles desde la primera sesión. Sal diferente de como entraste.',
  },
]

const stats = [
  { icon: 'fa-users', number: '+500', text: 'Pacientes satisfechos' },
  { icon: 'fa-star', number: '4.9/5', text: 'Calificación promedio' },
  { icon: 'fa-shield-halved', number: '+5 años', text: 'De experiencia clínica' },
  { icon: 'fa-award', number: '100%', text: 'Especialistas certificados' },
]

const testimonials = [
  {
    name: 'María José R.',
    result: 'Blanqueamiento Dental',
    text: 'No podía creer el cambio. En una sesión mis dientes quedaron increíbles. El equipo es súper profesional y no sentí dolor para nada.',
    stars: 5,
  },
  {
    name: 'Andreína L.',
    result: 'Fillers Labiales',
    text: 'Llevaba tiempo queriendo hacerme los labios pero tenía miedo. Me explicaron todo, el resultado es natural y me encanta. Regreso seguro.',
    stars: 5,
  },
  {
    name: 'Sofía M.',
    result: 'Especial DiaMadres',
    text: 'Le regalé el combo DiaMadres a mi mamá y quedó feliz. El blanqueamiento + tratamiento fue una experiencia increíble para ella.',
    stars: 5,
  },
]
</script>

<template>
  <div class="funnel">

    <!-- TOPBAR -->
    <div class="funnel__topbar" role="banner">
      <div class="funnel__container">
        <p class="funnel__topbar-text">
          <i class="fa-solid fa-gift" aria-hidden="true"></i>
          <strong>Especial DiaMadres</strong> — Promo activa solo durante mayo
          <span class="funnel__topbar-sep">·</span>
          Cupos limitados
        </p>
      </div>
    </div>

    <!-- HERO -->
    <section class="funnel__hero" aria-labelledby="funnel-headline">
      <div class="funnel__container">

        <span class="funnel__eyebrow">
          <i class="fa-solid fa-tooth" aria-hidden="true"></i>
          Clínica de Estética Dental
        </span>

        <h1 id="funnel-headline" class="funnel__headline">
          Tu sonrisa perfecta
          <span class="funnel__headline-accent">está a una cita de distancia</span>
        </h1>

        <p class="funnel__hero-sub">
          Blanqueamiento profesional, fillers naturales y tratamientos estéticos de última generación.
          Resultados visibles desde la primera sesión — sin dolor, sin tiempo de recuperación.
        </p>

        <ul class="funnel__pillars" role="list">
          <li class="funnel__pillar">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            Hasta 8 tonos más blanco en 1 sesión
          </li>
          <li class="funnel__pillar">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            Fillers labiales 100% naturales
          </li>
          <li class="funnel__pillar">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            Sin dolor · Sin tiempo de recuperación
          </li>
        </ul>

        <div class="funnel__cta-wrap">
          <button class="funnel__cta-btn" @click="openModal()">
            <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
            QUIERO MI CITA AHORA
          </button>
          <p class="funnel__cta-sub">
            <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
            Disponibilidad limitada &nbsp;·&nbsp; Solo para pacientes con $200+ disponibles
          </p>
        </div>

      </div>
    </section>

    <!-- SERVICIOS -->
    <section class="funnel__services" aria-labelledby="services-heading">
      <div class="funnel__container">
        <p class="funnel__section-label">Nuestros tratamientos</p>
        <h2 id="services-heading" class="funnel__section-title">
          Todo lo que tu imagen merece,
          <span class="funnel__section-title-accent">en un solo lugar</span>
        </h2>
        <div class="funnel__services-grid">
          <div
            v-for="svc in services"
            :key="svc.name"
            class="funnel__service-card"
            :class="{ 'funnel__service-card--highlight': svc.highlight }"
          >
            <div v-if="svc.badge" class="funnel__service-badge">
              <i :class="'fa-solid ' + svc.badgeIcon" aria-hidden="true"></i>
              {{ svc.badge }}
            </div>
            <div class="funnel__service-icon">
              <i :class="'fa-solid ' + svc.icon" aria-hidden="true"></i>
            </div>
            <h3 class="funnel__service-name">{{ svc.name }}</h3>
            <p class="funnel__service-desc">{{ svc.desc }}</p>
            <ul class="funnel__service-features" role="list">
              <li v-for="f in svc.features" :key="f">
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                {{ f }}
              </li>
            </ul>
            <button class="funnel__service-cta" @click="openModal()">
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              {{ svc.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="funnel__steps" aria-labelledby="steps-heading">
      <div class="funnel__container">
        <p class="funnel__section-label funnel__section-label--light">Simple y rápido</p>
        <h2 id="steps-heading" class="funnel__section-title funnel__section-title--light">
          Así de fácil es
          <span class="funnel__section-title-accent--light">transformar tu imagen</span>
        </h2>
        <div class="funnel__steps-grid">
          <div v-for="step in steps" :key="step.num" class="funnel__step">
            <div class="funnel__step-num">{{ step.num }}</div>
            <div class="funnel__step-icon">
              <i :class="'fa-solid ' + step.icon" aria-hidden="true"></i>
            </div>
            <h3 class="funnel__step-title">{{ step.title }}</h3>
            <p class="funnel__step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="funnel__stats" aria-label="Números que hablan solos">
      <div class="funnel__container">
        <div class="funnel__stats-grid">
          <div v-for="stat in stats" :key="stat.number" class="funnel__stat">
            <div class="funnel__stat-icon" aria-hidden="true">
              <i :class="'fa-solid ' + stat.icon"></i>
            </div>
            <strong class="funnel__stat-number">{{ stat.number }}</strong>
            <p class="funnel__stat-text">{{ stat.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALES -->
    <section class="funnel__testimonials" aria-labelledby="testimonials-heading">
      <div class="funnel__container">
        <p class="funnel__section-label">Resultados reales</p>
        <h2 id="testimonials-heading" class="funnel__section-title">
          Lo que dicen nuestras
          <span class="funnel__section-title-accent">pacientes</span>
        </h2>
        <div class="funnel__testimonials-grid">
          <div v-for="t in testimonials" :key="t.name" class="funnel__testimonial">
            <div class="funnel__testimonial-stars" aria-label="5 de 5 estrellas">
              <i v-for="s in t.stars" :key="s" class="fa-solid fa-star" aria-hidden="true"></i>
            </div>
            <p class="funnel__testimonial-text">"{{ t.text }}"</p>
            <div class="funnel__testimonial-author">
              <div class="funnel__testimonial-avatar">
                <i class="fa-solid fa-user" aria-hidden="true"></i>
              </div>
              <div>
                <strong class="funnel__testimonial-name">{{ t.name }}</strong>
                <span class="funnel__testimonial-result">{{ t.result }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ESPECIALISTAS -->
    <section class="funnel__authority" aria-labelledby="authority-heading">
      <div class="funnel__container">
        <div class="funnel__authority-inner">
          <div class="funnel__authority-badge">
            <i class="fa-solid fa-user-doctor" aria-hidden="true"></i>
          </div>
          <p class="funnel__section-label">Nuestro equipo</p>
          <h2 id="authority-heading" class="funnel__section-title">
            Siempre atendido/a por
            <span class="funnel__section-title-accent">un especialista certificado</span>
          </h2>
          <p class="funnel__authority-text">
            En Inspident, cada paciente es atendido por especialistas con formación avanzada en estética dental
            y tratamientos faciales. Seguimos protocolos clínicos de última generación para garantizar
            tu seguridad y los mejores resultados posibles.
          </p>
          <ul class="funnel__authority-list" role="list">
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i>Especialistas certificados en formación continua</li>
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i>Equipos y tecnología de última generación</li>
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i>Protocolos de seguridad clínica rigurosos</li>
            <li><i class="fa-solid fa-check-circle" aria-hidden="true"></i>Atención 100% personalizada por paciente</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="funnel__cta-final" aria-labelledby="cta-final-heading">
      <div class="funnel__container">
        <span class="funnel__cta-final-eyebrow">
          <i class="fa-solid fa-clock" aria-hidden="true"></i>
          Cupos limitados este mes
        </span>
        <h2 id="cta-final-heading" class="funnel__cta-final-title">
          ¿Lista/o para tu transformación?
        </h2>
        <p class="funnel__cta-final-sub">
          Agenda tu consulta ahora y da el primer paso hacia la sonrisa que siempre quisiste.
          Solo aceptamos pacientes con <strong>$200 o más disponibles</strong> para su tratamiento.
        </p>
        <button class="funnel__cta-btn funnel__cta-btn--final" @click="openModal()">
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          AGENDAR MI CITA AHORA
        </button>
        <div class="funnel__cta-deposit">
          <i class="fa-solid fa-credit-card" aria-hidden="true"></i>
          <p>Para confirmar tu cita se requiere un pago de <strong>$10 con tarjeta</strong> como garantía
          de reserva. Este valor se descuenta de tu tratamiento al llegar.</p>
        </div>
        <p class="funnel__cta-sub">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          Reserva segura &nbsp;·&nbsp; $10 al confirmar &nbsp;·&nbsp; Se descuenta del tratamiento
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="funnel__footer">
      <div class="funnel__container funnel__footer-inner">
        <nav class="funnel__footer-links" aria-label="Legal">
          <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
          <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
        </nav>
        <p class="funnel__footer-copy">
          © {{ new Date().getFullYear() }} INSPIDENT. Todos los derechos reservados.
        </p>
      </div>
    </footer>

  </div>

  <RegistrationModal
    :open="registrationOpen"
    @close="registrationOpen = false"
    @registered="onRegistered"
  />
  <CalendarModal :open="calendarOpen" @close="calendarOpen = false" />
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.funnel {
  background: #ffffff;
  color: colors.$INS-DARK;
  min-height: 100vh;
  font-family: fonts.$font-secondary;

  &__container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 1.5rem;
    @media (min-width: 768px) { padding: 0 2rem; }
  }
}

// ── Topbar ───────────────────────────────────────────────────────────────────
.funnel__topbar {
  background: colors.$INS-BLUE;
  padding: 0.6rem 0;
  text-align: center;
}

.funnel__topbar-text {
  font-family: fonts.$font-interface;
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  i { font-size: 0.78rem; }
}

.funnel__topbar-sep { opacity: 0.55; }

// ── Hero ─────────────────────────────────────────────────────────────────────
.funnel__hero {
  padding: 3.5rem 0 3.5rem;
  background: linear-gradient(160deg, #EFF6FF 0%, #ffffff 70%);
  text-align: center;
  .funnel__eyebrow { margin-left: auto; margin-right: auto; }
  .funnel__pillars { justify-content: center; }
  .funnel__cta-wrap { align-items: center; }
}

.funnel__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(colors.$INS-BLUE, 0.08);
  border: 1px solid rgba(colors.$INS-BLUE, 0.2);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  color: colors.$INS-BLUE;
  font-family: fonts.$font-interface;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 1.4rem;
  i { font-size: 0.8rem; }
}

.funnel__headline {
  @include fonts.heading-font(800);
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.13;
  color: colors.$INS-DARK;
  margin: 0 0 1.1rem;
  letter-spacing: -0.025em;
  &-accent { color: colors.$INS-BLUE; display: block; }
}

.funnel__hero-sub {
  font-size: 1.05rem;
  color: #4A5F7A;
  line-height: 1.65;
  max-width: 580px;
  margin: 0 auto 1.75rem;
}

.funnel__pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.funnel__pillar {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: fonts.$font-interface;
  font-size: 0.83rem;
  font-weight: 600;
  color: colors.$INS-DARK;
  background: #ffffff;
  border: 1.5px solid #DBEAFE;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  i { color: colors.$INS-BLUE; font-size: 0.78rem; }
}

.funnel__cta-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.funnel__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$INS-BLUE;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 1.1rem 2.25rem;
  font-family: fonts.$font-accent;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 6px 24px rgba(30, 64, 175, 0.28);
  &:hover { background: #1E3A8A; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(30, 64, 175, 0.38); }
  &--final { font-size: 1.05rem; padding: 1.2rem 2.5rem; }
}

.funnel__cta-sub {
  font-family: fonts.$font-interface;
  font-size: 0.75rem;
  color: #6B7FA0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
  margin: 0;
  i { font-size: 0.72rem; }
}

// ── Section labels/titles shared ─────────────────────────────────────────────
.funnel__section-label {
  font-family: fonts.$font-interface;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: colors.$INS-BLUE;
  margin: 0 0 0.65rem;
  &--light { color: rgba(#ffffff, 0.7); }
}

.funnel__section-title {
  @include fonts.heading-font(800);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: colors.$INS-DARK;
  margin: 0 0 2.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  &-accent { color: colors.$INS-BLUE; }
  &--light { color: #ffffff; margin-bottom: 2rem; }
  &-accent--light { color: rgba(#ffffff, 0.85); }
}

// ── Services ─────────────────────────────────────────────────────────────────
.funnel__services {
  padding: 4.5rem 0;
  background: colors.$INS-SURFACE;
}

.funnel__services-grid {
  display: grid;
  gap: 1.25rem;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
}

.funnel__service-card {
  background: #ffffff;
  border: 1.5px solid #DBEAFE;
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover { box-shadow: 0 8px 32px rgba(30, 64, 175, 0.1); transform: translateY(-2px); }
  &--highlight {
    border-color: colors.$INS-BLUE;
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
  }
}

.funnel__service-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: colors.$INS-BLUE;
  color: #ffffff;
  font-family: fonts.$font-interface;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  width: fit-content;
  i { font-size: 0.65rem; }
}

.funnel__service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: colors.$INS-LIGHT;
  display: flex;
  align-items: center;
  justify-content: center;
  i { color: colors.$INS-BLUE; font-size: 1.3rem; }
}

.funnel__service-name {
  @include fonts.heading-font(700);
  font-size: 1.15rem;
  color: colors.$INS-DARK;
  margin: 0;
}

.funnel__service-desc {
  font-size: 0.875rem;
  color: #4A5F7A;
  line-height: 1.6;
  margin: 0;
}

.funnel__service-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: #3A4F6A;
    i { color: colors.$INS-BLUE; font-size: 0.78rem; flex-shrink: 0; }
  }
}

.funnel__service-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: colors.$INS-LIGHT;
  color: colors.$INS-BLUE;
  border: 1.5px solid #BFDBFE;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-family: fonts.$font-accent;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  margin-top: 0.5rem;
  &:hover { background: colors.$INS-BLUE; color: #ffffff; border-color: colors.$INS-BLUE; }
  i { font-size: 0.82rem; }
}

// ── Steps ────────────────────────────────────────────────────────────────────
.funnel__steps {
  padding: 4.5rem 0;
  background: colors.$INS-BLUE;
  text-align: center;
}

.funnel__steps-grid {
  display: grid;
  gap: 2.5rem;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}

.funnel__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.funnel__step-num {
  font-family: fonts.$font-interface;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(#ffffff, 0.45);
}

.funnel__step-icon {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: rgba(#ffffff, 0.15);
  border: 1.5px solid rgba(#ffffff, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  i { color: #ffffff; font-size: 1.4rem; }
}

.funnel__step-title {
  @include fonts.heading-font(700);
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
}

.funnel__step-desc {
  font-size: 0.84rem;
  color: rgba(#ffffff, 0.75);
  line-height: 1.55;
  margin: 0;
  max-width: 220px;
}

// ── Stats ────────────────────────────────────────────────────────────────────
.funnel__stats {
  padding: 3rem 0;
  background: #ffffff;
  border-top: 1px solid #EFF6FF;
  border-bottom: 1px solid #EFF6FF;
}

.funnel__stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
  @media (min-width: 640px) { grid-template-columns: repeat(4, 1fr); }
}

.funnel__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.funnel__stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: colors.$INS-LIGHT;
  display: flex;
  align-items: center;
  justify-content: center;
  i { color: colors.$INS-BLUE; font-size: 1.1rem; }
}

.funnel__stat-number {
  @include fonts.heading-font(800);
  font-size: 1.65rem;
  color: colors.$INS-DARK;
  line-height: 1;
}

.funnel__stat-text {
  font-size: 0.8rem;
  color: #6B7FA0;
  margin: 0;
  line-height: 1.4;
}

// ── Testimonials ─────────────────────────────────────────────────────────────
.funnel__testimonials {
  padding: 4.5rem 0;
  background: colors.$INS-SURFACE;
}

.funnel__testimonials-grid {
  display: grid;
  gap: 1.25rem;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
}

.funnel__testimonial {
  background: #ffffff;
  border: 1px solid #DBEAFE;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 20px rgba(30, 64, 175, 0.08); }
}

.funnel__testimonial-stars {
  display: flex;
  gap: 0.2rem;
  i { color: #FBBF24; font-size: 0.85rem; }
}

.funnel__testimonial-text {
  font-size: 0.875rem;
  color: #3A4F6A;
  line-height: 1.65;
  margin: 0;
  flex: 1;
  font-style: italic;
}

.funnel__testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.funnel__testimonial-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: colors.$INS-LIGHT;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  i { color: colors.$INS-BLUE; font-size: 1rem; }
}

.funnel__testimonial-name {
  display: block;
  font-family: fonts.$font-interface;
  font-size: 0.85rem;
  font-weight: 700;
  color: colors.$INS-DARK;
}

.funnel__testimonial-result {
  font-size: 0.75rem;
  color: colors.$INS-BLUE;
  font-weight: 600;
}

// ── Authority ────────────────────────────────────────────────────────────────
.funnel__authority {
  padding: 4.5rem 0;
  background: #ffffff;
}

.funnel__authority-inner {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.funnel__authority-badge {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: colors.$INS-LIGHT;
  border: 2px solid #DBEAFE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  i { color: colors.$INS-BLUE; font-size: 1.8rem; }
}

.funnel__authority-text {
  font-size: 0.93rem;
  color: #4A5F7A;
  line-height: 1.7;
  margin: 0;
}

.funnel__authority-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  text-align: left;
  width: 100%;
  max-width: 420px;
  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.88rem;
    color: #3A4F6A;
    i { color: colors.$INS-BLUE; font-size: 0.9rem; flex-shrink: 0; }
  }
}

// ── CTA Final ────────────────────────────────────────────────────────────────
.funnel__cta-final {
  padding: 5rem 0;
  background: linear-gradient(155deg, #EFF6FF 0%, #DBEAFE 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .funnel__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
}

.funnel__cta-final-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(colors.$INS-BLUE, 0.1);
  border: 1px solid rgba(colors.$INS-BLUE, 0.22);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  color: colors.$INS-BLUE;
  font-family: fonts.$font-interface;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  i { font-size: 0.75rem; }
}

.funnel__cta-final-title {
  @include fonts.heading-font(800);
  font-size: clamp(1.8rem, 4.5vw, 2.8rem);
  color: colors.$INS-DARK;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

.funnel__cta-final-sub {
  font-size: 0.95rem;
  color: #4A5F7A;
  line-height: 1.65;
  max-width: 520px;
  margin: 0;
  strong { color: colors.$INS-DARK; }
}

.funnel__cta-deposit {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: #ffffff;
  border: 1.5px solid #DBEAFE;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  max-width: 460px;
  text-align: left;
  i { color: colors.$INS-BLUE; font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
  p { font-size: 0.83rem; color: #4A5F7A; line-height: 1.5; margin: 0; }
  strong { color: colors.$INS-DARK; }
}

// ── Footer ───────────────────────────────────────────────────────────────────
.funnel__footer {
  padding: 1.5rem;
  border-top: 1px solid #EFF6FF;
  background: #ffffff;
}

.funnel__footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.funnel__footer-links {
  display: flex;
  gap: 1.5rem;
  a { font-size: 0.76rem; color: #9BB0CC; text-decoration: none; &:hover { color: colors.$INS-DARK; } }
}

.funnel__footer-copy {
  font-size: 0.72rem;
  color: #C0D0E0;
  margin: 0;
}
</style>
