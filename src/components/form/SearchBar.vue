<script setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const keyword = ref(props.modelValue);

const handleInput = (e) => {
  keyword.value = e.target.value;
  emit('update:modelValue', keyword.value);
};

const handleSearch = () => {
  emit('search', keyword.value);
};
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <i class="search-icon">🔍</i>
      <input
        type="text"
        class="search-input"
        :value="keyword"
        :placeholder="placeholder"
        @input="handleInput"
        @keyup.enter="handleSearch"
      >
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  padding: 8px 16px;
  background: #fff;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 8px 12px;
}

.search-icon {
  font-size: 16px;
  color: #999;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}
</style>