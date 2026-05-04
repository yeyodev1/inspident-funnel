<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const contactStore = useContactStore()

const form = ref({ presupuesto: '', disponibilidad: '' })
const touched = ref(false)
const submitting = ref(false)

const isValid = () => form.value.presupuesto !== '' && form.value.disponibilidad !== ''
const isDisqualified = () => form.value.presupuesto === 'b' || form.value.disponibilidad === 'b'

watch(() => props.open, (val) => {
  if (val) {
    form.value = { presupuesto: '', disponibilidad: '' }
    touched.value = false
    submitting.value = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

async function handleSubmit() {
  touched.value = true
  if (!isValid()) return
  submitting.value = true

  const c = contactStore.get()
  const eventId = generateEventId('cal')

  await trackStage('calificacion', {
    nombre: c.nombre,
    email: c.email,
    telefono: c.telefono,
    presupuesto: form.value.presupuesto,
    disponibilidad: form.value.disponibilidad,
    resultado: isDisqualified() ? 'descalificado' : 'calificado',
    event_id: eventId,
  })

  submitting.value = false

  if (isDisqualified()) {
    localStorage.setItem('ins_disq_at', String(Date.now()))
    emit('close')
    router.push('/sin-espacio')
  } else {
    emit('close')
    router.push('/agendar')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="cal-fade">
      <div
        v-if="props.open"
        class="cal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cal-title"
        @click.self="emit('close')"
      >
        <div class="cal-modal">

          <button class="cal-close" @click="emit('close')" aria-label="Cerrar">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="cal-header">
            <div class="cal-header-icon" aria-hidden="true">
              <i class="fa-solid fa-tooth"></i>
            </div>
            <h2 id="cal-title" class="cal-title">
              Solo dos preguntas
              <span class="cal-accent">antes de continuar</span>
            </h2>
            <p class="cal-subtitle">Menos de 30 segundos — para asegurarnos de poder atenderte.</p>
          </div>

          <form class="cal-form" @submit.prevent="handleSubmit" novalidate>

            <!-- Q1 — Presupuesto -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.presupuesto }">
              <legend class="cal-legend">
                <span class="cal-q-num">01</span>
                ¿Con cuánto presupuesto cuentas para invertir en tu tratamiento dental?
              </legend>
              <div class="cal-options">
                <label
                  v-for="opt in [
                    { value: 'a', label: 'Cuento con $200 o más — estoy listo/a para comenzar mi tratamiento' },
                    { value: 'b', label: 'Tengo menos de $200 disponibles en este momento' },
                  ]"
                  :key="opt.value"
                  class="cal-option"
                  :class="{ selected: form.presupuesto === opt.value }"
                >
                  <input type="radio" :value="opt.value" v-model="form.presupuesto" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">
                    <strong>{{ opt.value.toUpperCase() }})</strong> {{ opt.label }}
                  </span>
                </label>
              </div>
              <span v-if="touched && !form.presupuesto" class="cal-error">
                <i class="fa-solid fa-circle-exclamation"></i>
                Selecciona una opción
              </span>
            </fieldset>

            <!-- Q2 — Disponibilidad -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.disponibilidad }">
              <legend class="cal-legend">
                <span class="cal-q-num">02</span>
                ¿Estás lista/o para agendar tu cita esta semana?
              </legend>
              <div class="cal-options">
                <label
                  v-for="opt in [
                    { value: 'a', label: 'Sí, quiero agendar mi cita cuanto antes' },
                    { value: 'b', label: 'Solo estoy explorando opciones por ahora' },
                  ]"
                  :key="opt.value"
                  class="cal-option"
                  :class="{ selected: form.disponibilidad === opt.value }"
                >
                  <input type="radio" :value="opt.value" v-model="form.disponibilidad" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">
                    <strong>{{ opt.value.toUpperCase() }})</strong> {{ opt.label }}
                  </span>
                </label>
              </div>
              <span v-if="touched && !form.disponibilidad" class="cal-error">
                <i class="fa-solid fa-circle-exclamation"></i>
                Selecciona una opción
              </span>
            </fieldset>

            <button class="cal-submit" type="submit" :disabled="submitting">
              <i v-if="submitting" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-solid fa-arrow-right"></i>
              {{ submitting ? 'Procesando...' : 'VER HORARIOS DISPONIBLES' }}
            </button>

            <p class="cal-legal">
              <i class="fa-solid fa-lock"></i>
              Tus datos están seguros y no serán compartidos.
            </p>

          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.cal-fade-enter-active,
.cal-fade-leave-active { transition: opacity 0.25s ease; }
.cal-fade-enter-from,
.cal-fade-leave-to { opacity: 0; }

.cal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(colors.$INS-DARK, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.cal-modal {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
  border: 1px solid #DBEAFE;
}

.cal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #EFF6FF;
  color: #8A9BB5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
  &:hover { background: #DBEAFE; color: colors.$INS-DARK; }
}

.cal-header {
  padding: 2rem 2rem 1.25rem;
  border-bottom: 1px solid #EFF6FF;
  text-align: center;
}

.cal-header-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: colors.$INS-BLUE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  i { color: #ffffff; font-size: 1.4rem; }
}

.cal-title {
  @include fonts.heading-font(800);
  font-size: 1.45rem;
  color: colors.$INS-DARK;
  margin: 0 0 0.5rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.cal-accent { color: colors.$INS-BLUE; }

.cal-subtitle {
  font-size: 0.86rem;
  color: #8A9BB5;
  margin: 0;
}

.cal-form {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cal-fieldset {
  border: none;
  padding: 0;
  margin: 0;
  &.has-error .cal-options { border: 1.5px solid #EF4444; border-radius: 10px; }
}

.cal-legend {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: fonts.$font-interface;
  font-size: 0.88rem;
  font-weight: 700;
  color: colors.$INS-DARK;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.cal-q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 6px;
  background: colors.$INS-BLUE;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 1px;
}

.cal-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cal-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid #DBEAFE;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  background: #FAFBFF;
  &:hover { border-color: colors.$INS-BLUE; background: #EFF6FF; }
  &.selected { border-color: colors.$INS-BLUE; background: #EFF6FF; }

  &__radio {
    width: 18px;
    height: 18px;
    min-width: 18px;
    border-radius: 50%;
    border: 2px solid #BFDBFE;
    margin-top: 2px;
    transition: border-color 0.18s, background 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
    .selected & {
      border-color: colors.$INS-BLUE;
      background: colors.$INS-BLUE;
      &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ffffff;
      }
    }
  }

  &__label {
    font-size: 0.88rem;
    color: #3A4F6A;
    line-height: 1.45;
    strong { color: colors.$INS-DARK; }
  }
}

.cal-error {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #EF4444;
  margin-top: 0.4rem;
  i { font-size: 0.72rem; }
}

.cal-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$INS-BLUE;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: fonts.$font-accent;
  font-size: 0.97rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.28);
  &:hover:not(:disabled) { background: #1E3A8A; transform: translateY(-1px); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
}

.cal-legal {
  font-family: fonts.$font-interface;
  font-size: 0.73rem;
  color: #A0B0C5;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  i { font-size: 0.7rem; }
}
</style>
