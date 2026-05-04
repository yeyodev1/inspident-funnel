<script setup lang="ts">
defineProps<{
  steps: { icon: string; title: string; desc: string }[]
}>()
</script>

<template>
  <section class="booked-steps">
    <p class="booked-steps__label">Próximos pasos</p>
    <h2 class="booked-steps__title">Prepárate para tu visita</h2>
    <ol class="booked-steps__list" role="list">
      <li v-for="(step, i) in steps" :key="i" class="booked-steps__item">
        <div class="booked-steps__icon">
          <i :class="'fa-solid ' + step.icon" aria-hidden="true"></i>
        </div>
        <div class="booked-steps__content">
          <strong class="booked-steps__item-title">{{ step.title }}</strong>
          <p class="booked-steps__item-desc">{{ step.desc }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-steps {
  background: #F8FAFF;
  border: 1px solid #DBEAFE;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;

  &__label {
    font-family: fonts.$font-interface;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: colors.$INS-BLUE;
    margin: 0 0 0.35rem;
  }

  &__title {
    @include fonts.heading-font(700);
    font-size: 1.05rem;
    color: colors.$INS-DARK;
    margin: 0 0 1.25rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: colors.$INS-BLUE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    i { color: #ffffff; font-size: 1rem; }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-top: 0.1rem;
  }

  &__item-title {
    font-size: 0.9rem;
    color: colors.$INS-DARK;
    font-weight: 700;
    display: block;
  }

  &__item-desc {
    font-size: 0.83rem;
    color: #4A5F7A;
    line-height: 1.5;
    margin: 0;
  }
}
</style>
