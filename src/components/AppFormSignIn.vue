<template>
  <AppForm @submit.prevent="create">
    <AppLabel
      :showError="v$.user.email.$invalid"
      :errorMessage="'Не корректный E-mail'"
    >
      <AppInput
        class="form__input"
        :class="{
          input_error: v$.user.email.$invalid,
          input_valid: !v$.user.email.$invalid,
        }"
        type="email"
        placeholder="Введите email"
        v-model="user.email"
      />
    </AppLabel>
    <AppLabel
      :showError="v$.user.password.$invalid"
      :errorMessage="'Короткий пароль'"
    >
      <AppInput
        class="form__input"
        :class="{
          input_error: v$.user.password.$invalid,
          input_valid: !v$.user.password.$invalid,
        }"
        type="password"
        placeholder="Введите пароль"
        autocomplete="on"
        v-model="user.password"
      />
    </AppLabel>
    <AppButton
      class="form__button"
      :class="v$.user.$invalid ? 'disabled' : ''"
      :disabled="v$.user.$invalid"
      >Войти
    </AppButton>
  </AppForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import SignIn from "../types/SignIn";
export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data(): SignIn {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      user: {
        email: { required, email },
        password: { minLength: minLength(10), required },
      },
    };
  },
  methods: {
    create() {
      this.$emit("signIn", { user: { ...this.user } });
    },
  },
  emits: {
    signIn: (user: SignIn) => user,
  },
});
</script>

<style lang="scss"></style>
