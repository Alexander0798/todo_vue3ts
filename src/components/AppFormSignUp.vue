<template>
  <AppForm class="form" name="sign-up" @submit.prevent="create">
    <AppLabel :showError="v$.newUser.name.$error" :errorMessage="'Короткое имя'">
      <AppInput class="form__input" v-on:input="v$.newUser.name.$touch" :class="{
        input_error: v$.newUser.name.$error,
        input_valid: !v$.newUser.name.$invalid,
      }" type="text" placeholder="Введите имя" v-model="newUser.name" />
    </AppLabel>

    <AppLabel :showError="v$.newUser.email.$error" :errorMessage="'Не корректный E-mail'">
      <AppInput class="form__input" v-on:input="v$.newUser.email.$touch" :class="{
        input_error: v$.newUser.email.$error,
        input_valid: !v$.newUser.email.$invalid,
      }" type="email" placeholder="Введите email" v-model="newUser.email" />
    </AppLabel>

    <AppLabel :showError="v$.newUser.password.$error" :errorMessage="'Короткий пароль'">
      <AppInput class="form__input" v-on:input="v$.newUser.password.$touch" :class="{
        input_error: v$.newUser.password.$error,
        input_valid: !v$.newUser.password.$invalid,
      }" type="password" placeholder="Введите пароль" autocomplete="on" v-model="newUser.password" />
    </AppLabel>

    <appButton class="form__button" :disabled="v$.newUser.$invalid">
      Зарегистрироваться
    </appButton>
  </AppForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import SignUp from "../types/SignUp";

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data(): SignUp {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      newUser: {
        name: { minLength: minLength(2), required },
        email: { required, email },
        password: { minLength: minLength(10), required },
      },
    };
  },
  methods: {
    create() {
      this.$emit("signUp", {
        newUser: {
          ...this.newUser,
        },
      });
      this.newUser = {
        name: "",
        email: "",
        password: "",
      };
    },
  },
  emits: {
    signUp: (newUser: SignUp) => newUser,
  },
});
</script>

<style lang="scss"></style>
