<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">col 1</v-col>

      <v-col cols="6">col 2 {{ products }}
      
        <div v-if="productError">
          Error fetching products: {{ productError }}
        </div>
        <div v-else>
          <div v-for="product in products" :key="product.id">
            <v-card>
              <v-img :src="product.image" :alt="product.name"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>${{ product.price }}</v-card-subtitle>
              <v-card-text>{{ product.description }}</v-card-text>
            </v-card>
          </div>
        </div>
      
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
const apiImmeuble = useApiProduct()

const products = ref([]);

// Getting data
const getProducts = () => {

  apiImmeuble.index().then((response) => {
    products.value = response.data
  }).finally(() => {
  })
}

onMounted(() => {
  getProducts()
})

</script>
