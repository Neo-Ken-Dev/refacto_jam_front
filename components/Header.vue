<template>
  <v-app-bar fixed color="white" elevate-on-scroll>
    <v-col
          cols="12"
          sm="6"
          md="4"
        >
      <v-app-bar-title>
        <span class="text-h5" to="/">Shop</span>
        <v-btn class="ml-5" text :to="{ name: 'home' }">Home</v-btn>
        <v-btn text :to="{ name: 'cart' }">Cart</v-btn>
      </v-app-bar-title>
    </v-col>
    <v-col
      class="ml-n5"
      cols="12"
      sm="6"
      md="4"
    >
      <v-text-field
      density="compact"
      variant="outlined"
      label="Search"
      append-inner-icon="mdi-magnify"
      single-line
      flat
      hide-details
      ></v-text-field>
    </v-col>
    <v-btn icon :to="{ name: 'cart' }">
      <v-badge color="red" floating content="2">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
      <template v-slot:append>
        <v-btn v-if="status === 'unauthenticated'" color="white" style="background-color: black" :to="{ name: 'connexion' }" class="mr-5">Connexion</v-btn>
        <v-btn v-if="status === 'authenticated'" color="white" style="background-color: black" class="mr-5" @click="disconnect()">Deconnection</v-btn>

        <v-btn v-if="status === 'unauthenticated'" color="black" style="background-color: #D3AC07" :to="{ name: 'register' }">Inscription</v-btn>
      </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';
const { status, signOut } = useAuth()

const disconnect = async () => {
  try {
    await signOut({ callbackUrl: '/connexion' })
  } catch (error) {
    console.log('Sign-in failed:', error);
  }
}
</script>

