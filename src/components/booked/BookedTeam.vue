<script setup lang="ts">
defineProps<{
  team: { name: string; role: string; note: string }
}>()
</script>

<template>
  <section class="booked-team">
    <p class="booked-team__label">Tu atención</p>
    <div class="booked-team__card">
      <div class="booked-team__avatar">
        <i class="fa-solid fa-user-doctor" aria-hidden="true"></i>
      </div>
      <div class="booked-team__info">
        <span class="booked-team__name">{{ team.name }}</span>
        <span class="booked-team__role">{{ team.role }}</span>
        <p class="booked-team__note">{{ team.note }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booked-team {
  &__label {
    font-family: fonts.$font-interface;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: colors.$INS-BLUE;
    margin: 0 0 0.75rem;
  }

  &__card {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    background: #F8FAFF;
    border: 1px solid #DBEAFE;
    border-radius: 16px;
    padding: 1.5rem;
    @media (max-width: 480px) { flex-direction: column; align-items: center; text-align: center; }
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #EFF6FF;
    border: 2px solid #DBEAFE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    i { color: colors.$INS-BLUE; font-size: 1.6rem; }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__name {
    @include fonts.heading-font(700);
    font-size: 1rem;
    color: colors.$INS-DARK;
  }

  &__role {
    font-family: fonts.$font-interface;
    font-size: 0.78rem;
    color: colors.$INS-BLUE;
    font-weight: 600;
  }

  &__note {
    margin: 0.5rem 0 0;
    font-size: 0.84rem;
    color: #4A5F7A;
    line-height: 1.55;
    font-style: italic;
  }
}
</style>
