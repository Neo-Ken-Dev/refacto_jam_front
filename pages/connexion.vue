<template>
  <v-container class="my-5">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div v-if="error" class="error-message">{{ error }}</div>

        <h1 class="my-5">Login</h1>
        <v-form @submit.prevent="connect">
          <!-- Email input -->
          <v-text-field
            label="Adresse Email"
            id="username"
            name="_username"
            variant="outlined"
            v-model="email"
          ></v-text-field>

          <!-- Password input -->
          <v-text-field
            label="Mot de passe"
            id="password"
            name="_password"
            type="password"
            variant="outlined"
            v-model="password"
          ></v-text-field>

          <!-- Submit button -->
          <v-btn type="submit" color="primary" @click="goToHome">Se connecter</v-btn>

          <!-- Register buttons -->
          <div class="text-center">
            <p>Pas de compte ? <NuxtLink to="/register">S'enregistrer</NuxtLink></p>
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
    await signIn(credentials, { callbackUrl: '/home' })
  } catch (error) {
    console.log('Sign-in failed:', error)
  }
}

const goToHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
