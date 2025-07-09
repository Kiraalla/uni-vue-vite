<template>
  <label
    class="base-radio"
    :class="[
      `base-radio--${size}`,
      {
        'base-radio--disabled': disabled,
        'base-radio--checked': modelValue === label,
        'base-radio--focus': isFocused
      }
    ]"
    :style="{ '--color': color }"
    @keydown.space.prevent="handleKeydown"
    tabindex="0"
    role="radio"
    :aria-checked="modelValue === label"
    :aria-disabled="disabled"
  >
    <span class="base-radio__input">
      <input
        type="radio"
        :value="label"
        :name="radioGroup?.name || name"
        :disabled="disabled"
        @input="handleChange"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
      <span class="base-radio__inner"></span>
    </span>
    <span class="base-radio__label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { defineEmits, defineProps, inject, ref } from 'vue';

const radioGroup = inject('radioGroup', null);

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
  },
  color: {
    type: String,
    default: '#409eff'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isFocused = ref(false)

const handleChange = (event) => {
  if (radioGroup) {
    radioGroup.onChange(event.target.value);
  } else {
    emit('update:modelValue', event.target.value);
    emit('change', event.target.value);
  }
}

const handleKeydown = () => {
  if (!props.disabled) {
    if (radioGroup) {
      radioGroup.onChange(props.label);
    } else {
      emit('update:modelValue', props.label);
      emit('change', props.label);
    }
  }
}
</script>

<style lang="scss" scoped>
.base-radio {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-right: 30px;
  outline: none;
  transition: all 0.3s;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .base-radio__input {
      cursor: not-allowed;
    }
  }

  &--checked {
    .base-radio__inner {
      border-color: var(--color);
      background-color: var(--color);

      &::after {
        transform: translate(-50%, -50%) scale(1);
        background-color: #fff;
      }
    }
  }

  &--focus {
    .base-radio__inner {
      box-shadow: 0 0 2px 2px rgba(64, 158, 255, 0.2);
    }
  }
  
  &__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    position: relative;
    vertical-align: middle;

    input {
      position: absolute;
      opacity: 0;
      margin: 0;
    }
  }

  &__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
    box-sizing: border-box;

    &:hover {
      border-color: var(--color, #409eff);
    }

    &::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  &__label {
    padding-left: 8px;
    font-size: 14px;
    color: #606266;
  }

  &--checked {
    .base-radio__inner {
      border-color: var(--color, #409eff);
      background: var(--color, #409eff);

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .base-radio__label {
      color: var(--color, #409eff);
    }
  }

  &--focus:not(&--disabled) {
    .base-radio__inner {
      box-shadow: 0 0 0 2px rgba(var(--color, #409eff), 0.2);
    }
  }

  &--disabled {
    cursor: not-allowed;

    .base-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;

      &:after {
        background-color: #c0c4cc;
      }
    }

    .base-radio__label {
      color: #c0c4cc;
    }

    &.base-radio--checked {
      .base-radio__inner {
        background-color: #f2f6fc;
      }
    }
  }

  &--large {
    .base-radio__label {
      font-size: 16px;
    }
    .base-radio__inner {
      width: 16px;
      height: 16px;
    }
  }

  &--small {
    .base-radio__label {
      font-size: 13px;
    }
    .base-radio__inner {
      width: 12px;
      height: 12px;
    }
  }

  &--mini {
    .base-radio__label {
      font-size: 12px;
    }
    .base-radio__inner {
      width: 10px;
      height: 10px;
    }
  }
}
</style>