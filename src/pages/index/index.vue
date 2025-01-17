<template>
  <view class="content">
    <UserAvatar size="200rpx" name="李四" />
    <UserAvatar radius="20rpx" name="王留美" url="/static/images/avatar.jpg"  />
    <UserAvatar size="100rpx" radius="50%" name="煌大和" letter />
    <CallService /> 
  </view>
</template>
<script setup>
import UserAvatar from "@/components/UserAvatar";
import CallService from "@/components/CallService";
const title = "Welcome to uni-vue-vite";
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
</style>
