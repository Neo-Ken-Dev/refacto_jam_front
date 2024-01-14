<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col cols="4">
         <!-- Text Field for Name Filter -->
      <v-text-field
        label="Nom"
        v-model="nameFilter"
      ></v-text-field>
        <!-- Category Filter -->
        <v-select 
          label="Category" 
          v-model="selectedCategory" 
          :items="categories" 
          item-title="name"
          item-value="id"
          clearable
        ></v-select>
        <!-- Size Filter -->
        <v-select
          label="Poids"
          v-model="selectedSize"
          :items="availableSizes"
          return-object
          item-title="name"
          item-value="id"
          clearable
        ></v-select>
        <!-- Price Range Filter -->
        <v-range-slider
          v-model="priceRange"
          :max="maxPrice"
          :min="minPrice"
          :step="1"
          hide-details
          label="Prix"
          class="align-center"
        >
          <template v-slot:prepend>
            <v-text-field
              v-model="priceRange[0]"
              hide-details
              single-line
              type="number"
              variant="outlined"
              density="compact"
              style="width: 90px"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              v-model="priceRange[1]"
              hide-details
              single-line
              type="number"
              variant="outlined"
              style="width: 90px"
              density="compact"
            ></v-text-field>
          </template>
        </v-range-slider>
        <v-col class="pl-0 mt-2">
          <v-btn color="primary" @click="searchProducts">Rechercher</v-btn>
        </v-col>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="product in filteredProducts" :key="product['id']">
            <v-card variant="outlined" class="pa-3">
              <v-img :src="`http://127.0.0.1:8000/uploads/${product['image']}`"></v-img>
              <v-card-title>{{ product['name'] }}</v-card-title>
              <v-card-subtitle>Prix: {{ product['price'] }} €</v-card-subtitle>
              <v-card-subtitle>Poids: {{ product['size'] }} gr</v-card-subtitle>
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

import { ref, onMounted, computed } from 'vue'
const apiProduct = useApiProduct()
const apiCategory = useApiCategory()
const apiCart = useApiCart()

let products = ref([])
let filteredProducts = computed(() => products.value)
let categories = ref([])
let selectedCategory = ref(null)

let minPrice = ref(0)
let maxPrice = ref(100)
let priceRange = ref([minPrice.value, maxPrice.value])
let nameFilter = ref('')

let selectedSize = ref(null);
const availableSizes = [
  { id: 120, name: '120' },
  { id: 200, name: '200' },
  { id: 90, name: '90' }
];
// Getting data
const getProducts = () => {
  apiProduct.index().then((response) => {
    products.value = response.data['hydra:member']
    // Initialize the price range
    minPrice.value = Math.min(...products.value.map(p => p.price));
    maxPrice.value = Math.max(...products.value.map(p => p.price));
    priceRange.value = [minPrice.value, maxPrice.value];
  }).finally(() => {
  })
}

const searchProducts = () => {
  let params = new URLSearchParams();

  if (nameFilter.value) {
    params.append('name', nameFilter.value);
  }
  if (priceRange.value[0] !== null) {
    params.append('minPrice', priceRange.value[0]);
  }
  if (priceRange.value[1] !== null) {
    params.append('maxPrice', priceRange.value[1]);
  }
  if (selectedCategory.value) {
    params.append('categories', selectedCategory.value);
  }
  if (selectedSize.value) {
    params.append('size', selectedSize.value.id);
  }

  apiProduct.search(params).then(response => {
    products.value = response.data['hydra:member']
  }).catch(error => {
    console.error('Error fetching filtered products:', error)
  })
}

// Get categories for the filter
const getCategories = () => {
  apiCategory.index().then((response) => {
    categories.value = response.data['hydra:member']
    console.log('categories')
    console.log(categories)
  }).catch(error => {
    console.error('Error fetching categories:', error)
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
  getCategories()
})

</script>
