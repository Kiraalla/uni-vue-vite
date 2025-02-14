<script setup>
import InputField from "@/components/InputField.vue";
import { ref } from "vue";

const inputValue = ref("");

const submitForm = () => {
  alert(`Username: ${inputValue.value}`);
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
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
</style>
