<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(category => {
        return typeof category.name === 'string' &&
               typeof category.id === 'number' ||
               typeof category.id === 'string'
      })
    }
  },
  activeId: {
    type: [Number, String],
    default: null
  }
});

const emit = defineEmits(['select']);

const handleSelect = (category) => {
  emit('select', category);
};
</script>

<template>
  <div class="category-sidebar">
    <div
      v-for="category in categories"
      :key="category.id"
      :class="['category-item', { active: category.id === activeId }]"
      @click="handleSelect(category)"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<style scoped>
.category-sidebar {
  width: 90px;
  height: 100%;
  background: #f8f8f8;
  overflow-y: auto;
}

.category-item {
  padding: 15px 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.category-item.active {
  background: #fff;
  color: #ff4444;
  font-weight: bold;
}
</style>