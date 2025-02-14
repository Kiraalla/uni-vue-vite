<template>
  <view class="input-field">
    <text v-if="label">{{ label }}</text>
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.detail.value)"
    />
  </view>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    modelValue: [String, Number]
  },
  emits: ['update:modelValue']
};
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  height: 88rpx;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>