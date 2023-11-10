<template>
  <v-container class="my-5">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div v-if="error.value" class="error-message">{{ error.value.message }}</div>

        <h1 class="my-5">Login</h1>
        <v-form @submit.prevent="connect">
          <!-- Email input -->
          <v-text-field
            label="Email address"
            id="username"
            name="_username"
            variant="outlined"
            v-model="email"
          ></v-text-field>

          <!-- Password input -->
          <v-text-field
            label="Password"
            id="password"
            name="_password"
            type="password"
            variant="outlined"
            v-model="password"
          ></v-text-field>

          <!-- Submit button -->
          <v-btn type="submit" color="primary">Sign in</v-btn>

          <!-- Register buttons -->
          <div class="text-center">
            <p>Not a member? <NuxtLink to="/register">Register</NuxtLink></p>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const authentificationStore = useAuthentificationStore()
authentificationStore.openLoginDialog()


const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const { status, data, signIn, signOut } = useAuth()

const connect = async () => {
  const credentials = {
    email: email.value,
    password: password.value
  }

  try {
    await signIn(credentials, { callbackUrl: '/home' });
  } catch (error) {
    console.log('Sign-in failed:', error);
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
