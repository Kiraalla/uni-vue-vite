<script setup>
import InputField from "@/components/InputField.vue";
import ProductCard from "@/components/GoodsList.vue";
import { ref, reactive } from "vue";

const inputValue = ref("");

const submitForm = () => {
  alert(`Username: ${inputValue.value}`);
};
const product = reactive({
  image: "https://dummyimage.com/200",
  title: "Example Product",
  description: "This is an example product description.",
  price: 99.99,
  buttonLabel: "Add to Cart",
  buttonClass: "primary",
});
const handleProductClick = () => {
  alert("Product clicked!");
};
</script>

<template>
  <div class="container">
    <InputField
      v-model="inputValue"
      label="Username"
      type="text"
      placeholder="Enter your username"
      required
    />
    <button @click="submitForm">Submit</button>
  </div>
  <div>
    <ProductCard
      :image="product.image"
      :title="product.title"
      :description="product.description"
      :price="product.price"
      :buttonLabel="product.buttonLabel"
      :buttonClass="product.buttonClass"
      @click="handleProductClick"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
</style>
