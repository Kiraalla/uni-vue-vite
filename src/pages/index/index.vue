<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <UserAvatar size="100rpx" name="王留美" letter />
    <UserAvatar radius="20rpx" name="张三" letter />
  </view>
</template>
<script setup>
import UserAvatar from "@/components/UserAvatar";
const title = "Welcome to uni-vue-vite";
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin: 1em auto;
  }

  .text-area {
    display: flex;
    justify-content: center;
    margin: 1em auto;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
    text-align: center;
  }

  .user-avatar {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
}
</style>
