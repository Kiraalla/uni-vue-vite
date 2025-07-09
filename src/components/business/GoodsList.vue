<template>
  <div class="product-card">
    <img :src="image" alt="Product Image" class="product-image" />
    <div class="product-info">
      <h2 class="product-title">{{ title }}</h2>
      <p class="product-description">{{ description }}</p>
      <div class="product-price">$ {{ price }}</div>
      <button :class="['btn', buttonClass]" @click="handleClick">
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true
    },
    buttonLabel: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      default: 'primary'
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
      this.onClick();
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
}

.product-image {
  width: 200px;
  height: 200px;
  flex:none;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 24px;
  margin: 0 0 10px;
}

.product-description {
  font-size: 16px;
  color: #333;
  margin: 0 0 15px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: green;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #4CAF50; /* Green */
  color: white;
}

.btn:hover {
  background-color: #45a049; /* Darker green on hover */
}
</style>