<template>
  <view class="components-page">
    <!-- 搜索栏 -->
    <SearchBar v-model="searchText" placeholder="搜索组件" />
    <!-- 筛选菜单栏 -->
    <view class="filter-bar">
      <scroll-view scroll-x="true" class="category-scroll">
        <view class="category-list">
          <view v-for="category in categories" :key="category.name"
            :class="['category-item', { active: currentCategory === category.name }]"
            @click="selectCategory(category.name)">
            {{ category.label }}
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 组件预览区域 -->
    <scroll-view scroll-y="true" class="preview-area" @scrolltolower="loadMore">
      <view class="component-grid">
        <view v-for="component in filteredComponents" :key="component.name" class="component-card" @click="navigateToDetail(component)">
          <view class="component-header">
            <text class="component-name">{{ component.name }}</text>
            <text class="component-category">{{ component.category }}</text>
          </view>
          <view class="component-preview">
            <!-- 组件封面图区域 -->
            <view class="component-cover">
              <text class="component-icon">{{ component.name.charAt(0) }}</text>
            </view>
          </view>
          <view class="component-description">
            {{ component.description }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
import SearchBar from '@/components/form/SearchBar.vue';
import { computed, ref } from 'vue';
import { getAllComponentInfo, getComponentsByCategory, searchComponents } from '../../utils/componentInfo';

// 组件分类
const categories = [
  { name: 'all', label: '全部' },
  { name: 'base', label: '基础组件' },
  { name: 'business', label: '业务组件' },
  { name: 'display', label: '展示组件' },
  { name: 'feedback', label: '反馈组件' },
  { name: 'form', label: '表单组件' },
  { name: 'layout', label: '布局组件' },
  { name: 'mall', label: '商城组件' }
];
// 状态管理
const searchText = ref('');
const currentCategory = ref('all');
const pageSize = ref(10);
const currentPage = ref(1);
// 计算属性：过滤后的组件列表
const filteredComponents = computed(() => {
  let result;
  // 按分类筛选
  if (currentCategory.value !== 'all') {
    result = getComponentsByCategory(currentCategory.value);
  } else {
    result = getAllComponentInfo();
  }
  // 按搜索关键词筛选
  if (searchText.value) {
    result = searchComponents(searchText.value);
    // 如果同时有分类筛选，需要再次过滤
    if (currentCategory.value !== 'all') {
      result = result.filter(item => item.category === currentCategory.value);
    }
  }
  // 分页
  return result.slice(0, currentPage.value * pageSize.value);
});
// 加载更多
const loadMore = () => {
  currentPage.value++;
};
// 选择分类
const selectCategory = (category) => {
  currentCategory.value = category;
  currentPage.value = 1;
};

// 导航到组件详情页
const navigateToDetail = (component) => {
  uni.navigateTo({
    url: `/pages/components/detail?name=${component.name}&category=${component.category}`
  });
};
// 组件列表数据通过componentInfo.js获取,
  

</script>

<style lang="scss">
.components-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.filter-bar {
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.category-scroll {
  white-space: nowrap;
  padding: 20rpx;
}

.category-list {
  display: inline-flex;
  gap: 20rpx;
}

.category-item {
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  background-color: #f0f0f0;
  font-size: 28rpx;
  color: #666;

  &.active {
    background-color: #007AFF;
    color: #fff;
  }
}

.preview-area {
  flex: 1;
  padding: 20rpx;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300rpx, 1fr));
  gap: 20rpx;
}

.component-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.component-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.component-category {
  font-size: 24rpx;
  color: #999;
  padding: 4rpx 12rpx;
  background-color: #f5f5f5;
  border-radius: 20rpx;
}

.component-preview {
  min-height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ddd;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.component-cover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
}

.component-icon {
  font-size: 48rpx;
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #007AFF;
  color: #fff;
  border-radius: 50%;
}

.preview-placeholder {
  color: #999;
  font-size: 28rpx;
}

.component-description {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}
</style>