<template>
  <nav class="filter">
    <AppButton
      type="button"
      class="filter__button"
      :class="{ filter__button_active: filter === 'active' }"
      @click="setFilter('active')"
      >Активные</AppButton
    >
    <AppButton
      type="button"
      class="filter__button"
      :class="{ filter__button_active: filter === 'overdue' }"
      @click="setFilter('overdue')"
      >Просроченые</AppButton
    >
    <AppButton
      type="button"
      class="filter__button"
      :class="{ filter__button_active: filter === 'current' }"
      @click="setFilter('current')"
      >На сегодня
    </AppButton>
    <AppButton
      type="button"
      class="filter__button"
      :class="{ filter__button_active: filter === 'completed' }"
      @click="setFilter('completed')"
      >Завершенные
    </AppButton>
  </nav>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Filter } from "../types/Filter";
export default defineComponent({
  props: {
    filter: {
      type: String as PropType<Filter>,
      required: true,
    },
  },

  methods: {
    setFilter(activeFilter: Filter) {
      this.$emit("setFilter", activeFilter);
    },
  },
  emits: {
    setFilter: (filter: Filter) => filter,
  },
});
</script>

<style lang="scss">
.filter {
  display: flex;

  gap: 0 10px;

  &__button_active {
    color: white;
    background-color: rgba(102, 51, 153, 0.651) !important;
  }

  &__button {
  }

  &__button-completed {
    justify-self: flex-end;
  }
}
</style>
