<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  coupons: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(coupon => {
        return typeof coupon.amount === 'number' &&
               typeof coupon.condition === 'string' &&
               typeof coupon.validPeriod === 'string' &&
               typeof coupon.restrictions === 'string'
      })
    }
  },
  buttonText: {
    type: String,
    default: '立即使用'
  }
});

const handleUse = (coupon) => {
  emit('use', coupon);
};

const emit = defineEmits(['use']);
</script>

<template>
  <div class="coupon-list">
    <div v-for="(coupon, index) in coupons" 
         :key="index" 
         class="coupon-item">
      <div class="coupon-left">
        <span class="amount">¥{{ coupon.amount }}</span>
      </div>
      <div class="coupon-right">
        <div class="condition">{{ coupon.condition }}</div>
        <div class="restrictions">{{ coupon.restrictions }}</div>
        <div class="valid-period">{{ coupon.validPeriod }}</div>
      </div>
      <button class="use-btn" @click="handleUse(coupon)">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.coupon-list {
  width: 100%;
}

.coupon-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.coupon-left {
  padding-right: 16px;
  border-right: 1px dashed #ddd;
}

.amount {
  color: #ff4444;
  font-size: 24px;
  font-weight: bold;
}

.coupon-right {
  flex: 1;
  padding: 0 16px;
}

.condition {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.restrictions {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.valid-period {
  font-size: 12px;
  color: #999;
}

.use-btn {
  padding: 8px 16px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.use-btn:hover {
  background: #ff2222;
}
</style>