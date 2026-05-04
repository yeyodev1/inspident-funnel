# Inspident — Funnel de Estética Dental

## Proyecto
Este repositorio es la landing page / funnel de **Inspident** — consultorio de estética dental.
Es un **funnel de una sola página** (sin video) orientado a captación de leads calificados con presupuesto de $200+.

## Stack
- **Vue 3** + Vite + TypeScript
- **SCSS** con variables en `src/styles/colorVariables.module.scss`
- **GSAP** instalado (BookedHero usa animaciones de entrada)
- **pnpm** como package manager
- **vue-router** (rutas del funnel + legales)
- **FontAwesome 6** (CDN en index.html) — usar `<i class="fa-solid fa-...">`, NO emojis

## Flujo del Funnel
```
/ (FunnelView)
  ↓ [CTA → RegistrationModal captura contacto]
  ↓ [CalendarModal califica: $200 disponible + ready this week]
/agendar (BookingView)    ← GHL calendar + banner $10 depósito
  ↓ [msgsndr-booking-complete]
/cita-confirmada (BookedView)
  ↓ [no califica en CalendarModal]
/sin-espacio (NoSpaceView)
```

## Servicios que ofrece Inspident
1. **Blanqueamiento Dental** (servicio principal — headline del funnel)
2. **Fillers Labiales** (servicio secundario)
3. **Especial DiaMadres** (promo mayo — combo blanqueamiento + tratamiento)

## Calificación
- Presupuesto mínimo: **$200 disponibles**
- Depósito de reserva: **$10 con tarjeta** al confirmar cita (se descuenta del tratamiento)
- CalendarModal descalifica si: presupuesto < $200 OR solo explorando

## LocalStorage — claves en uso
| Clave | Contenido | Quién la escribe |
|---|---|---|
| `ins_contact` | `{ nombre, apellido, email, telefono, timestamp }` | RegistrationModal |
| `ins_disq_at` | timestamp (ms) | CalendarModal al descalificar |
| `ins_booked_at` | timestamp (ms) | BookingView al confirmar cita |

## Guards de seguridad
- **FunnelView**: si `ins_disq_at` < 24h → redirige a `/sin-espacio` (desactivado en `localhost`)
- **CalendarModal**: presupuesto=b OR disponibilidad=b → `/sin-espacio` + guarda `ins_disq_at`

## GHL Calendar
- URL: `https://api.leadconnectorhq.com/widget/booking/Dqe1lrB2Ieejmm25uJSP`
- Pre-fill params: `?firstName=...&email=...&phone=...` (leídos de `ins_contact`)
- Evento de confirmación: `postMessage(['msgsndr-booking-complete', {...}])`

## Estructura clave
```
src/
  views/
    FunnelView.vue          ← / — Landing principal (sin video)
    BookingView.vue         ← /agendar — GHL calendar + banner $10
    BookedView.vue          ← /cita-confirmada
    NoSpaceView.vue         ← /sin-espacio
    PrivacyPolicyView.vue   ← /politicas-privacidad
    LegalNoticeView.vue     ← /aviso-legal
    VideoView.vue           ← (legacy — redirige a /)
  components/
    RegistrationModal.vue   ← Modal captura (nombre, apellido, email, teléfono)
    CalendarModal.vue       ← Modal calificación (2 preguntas → routing)
    booked/
      BookedHeader.vue
      BookedHero.vue        ← Prop :contact-name
      BookedSteps.vue       ← Prop :steps
      BookedTeam.vue        ← Prop :team
      BookedFooter.vue
  stores/
    contact.ts              ← Pinia store, key: ins_contact
  utils/
    ghl.ts                  ← trackStage webhook (actualizar URL para Inspident)
    fbclid.ts               ← FB click ID utils
  styles/
    colorVariables.module.scss  ← Paleta Inspident (INS-BLUE, etc.)
```

## Colores de marca (Inspident — light theme)
```scss
$INS-BLUE:    #1E40AF   // Azul principal — CTAs y acentos
$INS-BLUE-L:  #3B82F6   // Azul claro — hover, highlights
$INS-DARK:    #0F172A   // Navy oscuro — texto
$INS-LIGHT:   #EFF6FF   // Fondo claro
$INS-SURFACE: #F8FAFF   // Cards / superficies
```

## Fuentes
- Headings: **Outfit** (800)
- Body: **Plus Jakarta Sans**
- Accent/CTAs: **Space Grotesk**
- UI: **Manrope**

## Comandos
```bash
pnpm dev        # desarrollo local
pnpm build      # build de producción
pnpm type-check # TypeScript check
```

## Pendientes del cliente
- [ ] **Meta Pixel ID** de Inspident (reemplazar `INSPIDENT_PIXEL_ID` en index.html)
- [ ] **GHL Webhook URL** para Inspident (actualizar `GHL_WEBHOOK` en `src/utils/ghl.ts`)
- [ ] **VITE_WEBHOOK_REGISTRO** en `.env` — webhook de registro GHL
- [ ] Logo Inspident en `src/assets/logos/` (reemplazar Logo-large.png y logo-small.png)
- [ ] Fotos del consultorio/equipo en `src/assets/team/`
- [ ] Testimonios reales de pacientes en `src/assets/testimonios/`
- [ ] Dominio final (reemplazar `inspident.com` en index.html y router)
- [ ] Precios reales de blanqueamiento y fillers (actualizar en FunnelView.vue)

## No hacer
- No agregar Header/Footer de navegación al funnel
- No usar emojis — usar íconos FontAwesome (`<i class="fa-solid fa-...">`)
- No usar VideoView.vue para contenido (redirige a /)
- No usar variables LPB-* / OS-* en código nuevo — usar INS-*
