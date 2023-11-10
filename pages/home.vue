<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col cols="4">col 1</v-col>

      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="product in products" :key="product['id']">
            <v-card variant="outlined" class="pa-3">
              <v-img :src="`http://127.0.0.1:8000/uploads/${product['image']}`"></v-img>
              <v-card-title>{{ product['name'] }}</v-card-title>
              <v-card-subtitle>{{ product['price'] }} €</v-card-subtitle>
              <v-text-field
                type="number"
                v-model="product['quantity']"
                variant="outlined"
                min="0"
                class="mt-2 mx-3"
              ></v-text-field>

              <v-btn color="black" class="mt-1 ml-3" @click="addToCart(product['id'], product['quantity'])">Ajouter</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
const apiProduct = useApiProduct()
const apiCart = useApiCart()

let products = ref([]);

// Getting data
const getProducts = () => {

  apiProduct.index().then((response) => {
    products.value = response.data['hydra:member']
  }).finally(() => {
  })
}

const addToCart = (productId: number, productQuantity: number) => {
  const params = {
    quantity: productQuantity
  }

  apiCart.addToCart(productId, params).then((response) => {
    console.log('response')
    console.log(response)
  }).finally(() => {
  })
}

onMounted(() => {
  getProducts()
})

</script>
