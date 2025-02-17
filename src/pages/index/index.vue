<template>
  <view class="content">
    <view>pos: {{ x }}, {{ y }}</view>
    <UserAvatar size="200rpx" name="李四" />
    <UserAvatar radius="20rpx" name="王留美" url="/static/images/avatar.jpg" />
    <UserAvatar size="100rpx" radius="50%" name="煌大和" letter />
    <CallService />
    <z-swiper :custom-style="{ width: '100%' }">
      <z-swiper-item v-for="item in list" :key="item.id">
        <view class="swiper-item">{{ item.text }}</view>
      </z-swiper-item>
    </z-swiper>
    <button @click="goDemo">组件测试</button>
  </view>
</template>
<script setup>
import { ref } from "vue";
import UserAvatar from "@/components/UserAvatar";
import CallService from "@/components/CallService";
import { useMouse } from "@vueuse/core";
// 測試vueuse的useMouse函數
const { x, y } = useMouse();
// 其他逻辑
const list = ref(
  Array.from({
    length: 5,
  }).map((item, index) => {
    return {
      text: `Slide ${index + 1}`,
      id: index + 1,
    };
  })
);
const goDemo = () => {
  uni.navigateTo({
    url: "/pages/demo/index",
  });
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .user-avatar {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
}

.swiper-slide {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: #000;
}
.swiper-item {
  color: #fff;
}
</style>
