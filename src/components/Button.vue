<template>
  <button :class="['btn', buttonClass]" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    label: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      default: ''
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