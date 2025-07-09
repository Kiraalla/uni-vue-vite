<template>
  <div class="base-radio-group" role="radiogroup">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, provide } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const handleChange = (value) => {
  emit('update:modelValue', value);
  emit('change', value);
};

provide('radioGroup', {
  name: props.name,
  modelValue: props.modelValue,
  disabled: props.disabled,
  onChange: handleChange
});
</script>

<style lang="scss" scoped>
.base-radio-group {
  display: inline-block;
}
</style>