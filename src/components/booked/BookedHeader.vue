<script setup lang="ts">
</script>

<template>
  <header class="booked-header">
    <span class="booked-header__logo">INSPIDENT</span>
    <span class="booked-header__tagline">Estética Dental Profesional</span>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #EFF6FF;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__logo {
    @include fonts.heading-font(800);
    font-size: 1.1rem;
    color: colors.$INS-BLUE;
    letter-spacing: 0.04em;
  }

  &__tagline {
    font-family: fonts.$font-interface;
    font-size: 0.72rem;
    color: #8A9BB5;
    font-weight: 500;
    letter-spacing: 0.03em;
  }
}
</style>
