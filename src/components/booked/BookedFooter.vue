<script setup lang="ts">
</script>

<template>
  <footer class="booked-footer">
    <nav class="booked-footer__links" aria-label="Legal">
      <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
      <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
    </nav>
    <p class="booked-footer__copy">© {{ new Date().getFullYear() }} INSPIDENT. Todos los derechos reservados.</p>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-footer {
  padding: 1.5rem;
  border-top: 1px solid #EFF6FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  &__links {
    display: flex;
    gap: 1.5rem;
    a {
      font-size: 0.76rem;
      color: #B0C0D5;
      text-decoration: none;
      &:hover { color: colors.$INS-DARK; }
    }
  }

  &__copy {
    font-size: 0.72rem;
    color: #C8D8ED;
    margin: 0;
  }
}
</style>
