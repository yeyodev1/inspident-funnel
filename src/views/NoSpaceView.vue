<script setup lang="ts">
import { ref, onMounted } from 'vue'

const hoursLeft = ref(0)

onMounted(() => {
  const disqAt = localStorage.getItem('ins_disq_at')
  if (disqAt) {
    const elapsed = Date.now() - Number(disqAt)
    const remaining = 24 * 60 * 60 * 1000 - elapsed
    if (remaining > 0) {
      hoursLeft.value = Math.ceil(remaining / (60 * 60 * 1000))
    }
  }
})
</script>

<template>
  <div class="nospace">
    <header class="nospace__topbar">
      <span class="nospace__logo">INSPIDENT</span>
    </header>

    <main class="nospace__main">

      <div v-if="hoursLeft > 0" class="nospace__cooldown">
        <i class="fa-solid fa-clock" aria-hidden="true"></i>
        Podrás volver a solicitar una cita en
        <strong>{{ hoursLeft }} {{ hoursLeft === 1 ? 'hora' : 'horas' }}</strong>
      </div>

      <div class="nospace__card">
        <div class="nospace__icon-wrap" aria-hidden="true">
          <i class="fa-solid fa-calendar-xmark nospace__icon"></i>
        </div>

        <h1 class="nospace__title">
          Por ahora no podemos atenderte
        </h1>

        <p class="nospace__subtitle">
          Nuestros tratamientos requieren una inversión mínima de $200. Si en el futuro
          tienes disponible este presupuesto, con gusto te agendamos una consulta.
        </p>
      </div>

      <div class="nospace__steps">
        <p class="nospace__steps-title">Mientras tanto, puedes</p>
        <ul class="nospace__steps-list">
          <li>
            <div class="nospace__step-icon"><i class="fa-solid fa-instagram"></i></div>
            <div>
              <strong>Seguirnos en Instagram</strong>
              <p>Consejos de cuidado dental y promociones especiales.</p>
            </div>
          </li>
          <li>
            <div class="nospace__step-icon"><i class="fa-brands fa-whatsapp"></i></div>
            <div>
              <strong>Contactarnos por WhatsApp</strong>
              <p>Si tienes preguntas sobre nuestros tratamientos o precios.</p>
            </div>
          </li>
          <li>
            <div class="nospace__step-icon"><i class="fa-solid fa-rotate-right"></i></div>
            <div>
              <strong>Intenta de nuevo cuando estés listo</strong>
              <p>Cuando tengas tu presupuesto disponible, regresa y agenda tu cita.</p>
            </div>
          </li>
        </ul>
      </div>

    </main>

    <footer class="nospace__footer">
      <nav class="nospace__footer-links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="nospace__footer-copy">© {{ new Date().getFullYear() }} INSPIDENT. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.nospace {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: colors.$INS-DARK;
  font-family: fonts.$font-secondary;

  &__topbar {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #EFF6FF;
    background: #ffffff;
  }

  &__logo {
    @include fonts.heading-font(800);
    font-size: 1.1rem;
    color: colors.$INS-BLUE;
    letter-spacing: 0.04em;
  }
}

.nospace__main {
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.nospace__cooldown {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(colors.$INS-BLUE-L, 0.08);
  border: 1px solid rgba(colors.$INS-BLUE-L, 0.22);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.84rem;
  color: colors.$INS-DARK;
  i { color: colors.$INS-BLUE; flex-shrink: 0; }
  strong { font-weight: 700; }
}

.nospace__card {
  background: #F8FAFF;
  border: 1px solid #DBEAFE;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
}

.nospace__icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(colors.$INS-BLUE, 0.07);
  border: 1.5px solid rgba(colors.$INS-BLUE, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.nospace__icon {
  font-size: 2.2rem;
  color: rgba(colors.$INS-BLUE, 0.65);
  line-height: 1;
}

.nospace__title {
  @include fonts.heading-font(800);
  font-size: 1.5rem;
  color: colors.$INS-DARK;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.nospace__subtitle {
  font-size: 0.9rem;
  color: #4A5F7A;
  line-height: 1.65;
  margin: 0 auto;
  max-width: 420px;
}

.nospace__steps {
  background: #F8FAFF;
  border: 1px solid #DBEAFE;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
}

.nospace__steps-title {
  font-family: fonts.$font-interface;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: colors.$INS-BLUE;
  margin: 0 0 1rem;
}

.nospace__steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    strong { display: block; font-size: 0.9rem; color: colors.$INS-DARK; margin-bottom: 0.2rem; }
    p { font-size: 0.83rem; color: #4A5F7A; line-height: 1.5; margin: 0; }
  }
}

.nospace__step-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: colors.$INS-BLUE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  i { color: #ffffff; font-size: 1rem; }
}

.nospace__footer {
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
