<template>
    <view class="flex-col ai-center">
      <view class="kefu-ewm">
        <image class="kefu-ewm-img" src="/static/images/ewm.jpg" loading="lazy"></image>
      </view>
      <view
        class="my-10 p-12 flex jc-center bg-f5"
        style="width: 200px">
        <image :src="ewm" class="kefu-avatar"></image>
        <text class="kefu-name as-center">{{ name }}</text>
      </view>
      <view class="flex jc-center my-10">
        <text class="text-primary font-14">{{ label}}</text>
        <image :src="bottomIcon" class="kefu-click"></image>
      </view>
    </view>
</template>
<script setup>
const props = defineProps({
  ewm: {
    type: String,
    default: "/static/images/avatar.jpg",
  },
  name: {
    type: String,
    default: "维奕网络001号",
  },
  label: {
    type: String,
    default: "点击联系专属客服",
  },
  bottomIcon: {
    type: String,
    default: "/static/images/ewm-hand.png",
  },
});
</script>
<style scoped>
.kefu-ewm {
  width: 200px;
  height: 200px;
  background-image: url(@/static/images/ewm-border.png);
  background-size: cover;
  padding: 5px;
  box-sizing: border-box;
}

.kefu-ewm .kefu-ewm-img {
  width: 190px;
  height: 190px;
}

.kefu-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50px;
  margin-right: 10px;
  margin-left: 0;
}

.kefu-name {
  font-size: 13px;
  color: #575b66;
}

.kefu-click {
  width: 20px;
  height: 20px;
}
</style>
