<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(product => {
        return typeof product.title === 'string' &&
               typeof product.price === 'number' &&
               typeof product.originalPrice === 'number' &&
               typeof product.image === 'string'
      })
    }
  }
});

const emit = defineEmits(['addToCart']);

const handleAddToCart = (product) => {
  emit('addToCart', product);
};
</script>

<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-item">
      <img :src="product.image" :alt="product.title" class="product-image">
      <div class="product-info">
        <h3 class="product-title">{{ product.title }}</h3>
        <div class="price-container">
          <span class="current-price">¥{{ product.price }}</span>
          <span class="original-price">¥{{ product.originalPrice }}</span>
        </div>
      </div>
      <button class="add-cart-btn" @click="handleAddToCart(product)">
        <i class="cart-icon"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  flex: 1;
  padding: 10px;
  background: #fff;
}

.product-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  padding: 0 15px;
}

.product-title {
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.price-container {
  display: flex;
  align-items: center;
}

.current-price {
  color: #ff4444;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}

.original-price {
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
}

.add-cart-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ff4444;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>