<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "John Doe",
  },
  avatar: {
    type: String,
  },
  alt: {
    type: String,
    default: "User Avatar",
  },
  size: {
    type: [Number, String],
    default: 60,
  },
  radius: {
    type: String,
    default: "50%",
  },
  block: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "cover", // cover, contain, center
  },
  letter: {
    type: Boolean,
    default: false,
  },
});

// 处理 block
const inlineBlock = computed(() => (props.block ? "inline-block" : "block"));
const initialLetter = computed(() => {
  const name = props.name || "";
  const firstLetter = name.charAt(0);
  return firstLetter ? firstLetter.toUpperCase() : "";
});

// 处理 size 的单位
const sizeWithUnit = computed(() => {
  if (typeof props.size === "number") {
    return `${props.size}px`;
  }
  return props.size;
});

// 处理 fontSize 的单位
const fontSizeWithUnit = computed(() => {
  if (typeof props.size === "number") {
    const fontSizeNumber = props.size / 2;
    return `${fontSizeNumber}px`;
  } else {
    const match = props.size.match(/^(\d+)(\D+)$/);
    if (match) {
      const value = parseFloat(match[1]) / 2;
      const unit = match[2];
      return `${value}${unit}`;
    }
    return `${parseFloat(props.size) / 2}px`;
  }
});

// 生成随机颜色
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// 使用 ref 保存颜色值
const cachedColor = ref("");

// 获取 Storage 存储的值
const getStorage = (key) => {
  // #ifdef MP-WEIXIN
  return wx.getStorageSync(key);
  // #endif
  // #ifdef H5
  return localStorage.getItem(key);
  // #endif
  // #ifndef H5 || MP-WEIXIN
  return null;
  // #endif
};

//   存储 Storage 值
const setStorage = (key, value) => {
  // #ifdef MP-WEIXIN
  wx.setStorageSync(key, value);
  // #endif
  // #ifdef H5
  localStorage.setItem(key, value);
  // #endif
};

// 删除 storage 中的颜色
const removeStorage = (key) => {
  // #ifdef MP-WEIXIN
  wx.removeStorageSync(key);
  // #endif
  // #ifdef H5
  localStorage.removeItem(key);
  // #endif
};

// 从缓存中读取颜色值或生成新颜色
const getCachedColor = () => {
  const cacheKey = `UserAvatar-${props.name}`; // 使用 name 作为缓存键
  const cached = getStorage(cacheKey);
  if (cached) {
    return cached;
  } else {
    const newColor = generateRandomColor();
    // #ifdef H5 || MP-WEIXIN
    setStorage(cacheKey, newColor);
    // #endif
    return newColor;
  }
};

// 在组件挂载时初始化颜色值
onMounted(() => {
  cachedColor.value = getCachedColor();
});

// 在组件卸载时删除 storage 中的颜色
onUnmounted(() => {
  const cacheKey = `user-avatar-color-${props.name}`; // 使用 name 作为缓存键
  removeStorage(cacheKey);
});
</script>
<template>
  <image
    v-if="!letter"
    class="user-avatar"
    :src="avatar || `https://dummyimage.com/${size}x${size}`"
    :alt="alt"
    :title="name"
  ></image>
  <view v-else class="user-avatar">
    {{ initialLetter }}
  </view>
</template>
<style scoped>
.user-avatar {
  width: v-bind("sizeWithUnit");
  height: v-bind("sizeWithUnit");
  border-radius: v-bind("radius");
  display: v-bind("inlineBlock");
  object-fit: v-bind("mode || 'cover'");
  background-color: v-bind("cachedColor || '#ccc'");
  font-size: v-bind("fontSizeWithUnit");
  line-height: v-bind("sizeWithUnit");
  font-family: system-ui, sans-serif;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
</style>
