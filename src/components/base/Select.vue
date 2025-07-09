<template>
  <div class="base-select" :class="{ 'base-select--disabled': disabled }">
    <div
      class="base-select__input"
      @click="toggleDropdown"
      :tabindex="disabled ? -1 : 0"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
    >
      <span class="base-select__value">{{ selectedLabel }}</span>
      <span class="base-select__arrow" :class="{ 'is-reverse': isOpen }"></span>
    </div>
    <div v-show="isOpen" class="base-select__dropdown">
      <ul class="base-select__options">
        <li
          v-for="option in options"
          :key="option.value"
          class="base-select__option"
          :class="{ 'is-selected': modelValue === option.value }"
          @click="handleSelect(option)"
          role="option"
          :aria-selected="modelValue === option.value"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue);
  return selected ? selected.label : '';
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const handleSelect = (option) => {
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  const select = event.target.closest('.base-select');
  if (!select) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.base-select {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    .base-select__input {
      background-color: #f5f7fa;
      cursor: not-allowed;
    }
  }

  &__input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 0 30px 0 12px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #c0c4cc;
    }

    &:focus {
      outline: none;
      border-color: #409eff;
    }
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #c0c4cc;
    transition: transform 0.2s;

    &.is-reverse {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    width: 100%;
    margin-top: 4px;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
  }

  &__option {
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.is-selected {
      color: #409eff;
      font-weight: bold;
      background-color: #f5f7fa;
    }
  }
}
</style>