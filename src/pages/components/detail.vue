<template>
  <view class="component-detail">
    <!-- 顶部导航栏 -->
    <view class="detail-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">{{ componentData?.name || '组件详情' }}</view>
    </view>
    
    <!-- 预览区域 -->
    <view class="preview-section">
      <view class="section-title">预览</view>
      <view class="preview-container">
        <!-- 动态渲染组件 -->
        <template v-if="componentData">
          <!-- 按钮组件 -->
          <Button v-if="componentData.name === 'Button'" v-bind="currentProps">
            按钮文本
          </Button>
          
          <!-- 输入框组件 -->
          <Input v-else-if="componentData.name === 'Input'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 标签组件 -->
          <Tag v-else-if="componentData.name === 'Tag'" v-bind="currentProps">
            标签文本
          </Tag>
          
          <!-- 复选框组件 -->
          <Checkbox v-else-if="componentData.name === 'Checkbox'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 单选框组件 -->
          <Radio v-else-if="componentData.name === 'Radio'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 开关组件 -->
          <Switch v-else-if="componentData.name === 'Switch'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 标签页组件 -->
          <Tabs v-else-if="componentData.name === 'Tabs'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 进度条组件 -->
          <Progress v-else-if="componentData.name === 'Progress'" 
            v-bind="currentProps" />
          
          <!-- 分页组件 -->
          <Pagination v-else-if="componentData.name === 'Pagination'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 选择器组件 -->
          <Select v-else-if="componentData.name === 'Select'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 表格组件 -->
          <Table v-else-if="componentData.name === 'Table'" 
            v-bind="currentProps" />
          
          <!-- 对话框组件 -->
          <Dialog v-else-if="componentData.name === 'Dialog'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 消息组件 -->
          <Message v-else-if="componentData.name === 'Message'" 
            v-bind="currentProps" />
          
          <!-- 商品卡片组件 -->
          <ProductCard v-else-if="componentData.name === 'ProductCard'" 
            v-bind="currentProps" />
          
          <!-- 商品列表组件 -->
          <ProductList v-else-if="componentData.name === 'ProductList'" 
            v-bind="currentProps" />
          
          <!-- Business商品列表组件 -->
          <BusinessProductList v-else-if="componentData.name === 'BusinessProductList'" 
            v-bind="currentProps" />
          
          <!-- SKU选择器组件 -->
          <SkuSelector v-else-if="componentData.name === 'SkuSelector'" 
            v-bind="currentProps" />
          
          <!-- 轮播图组件 -->
          <Carousel v-else-if="componentData.name === 'Carousel'" 
            v-bind="currentProps" />
          
          <!-- 下拉刷新组件 -->
          <PullToRefresh v-else-if="componentData.name === 'PullToRefresh'" 
            v-bind="currentProps" />
          
          <!-- 底部弹出层组件 -->
          <BottomSheet v-else-if="componentData.name === 'BottomSheet'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 输入字段组件 -->
          <InputField v-else-if="componentData.name === 'InputField'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 搜索栏组件 -->
          <SearchBar v-else-if="componentData.name === 'SearchBar'" 
            v-model="currentProps.modelValue" 
            v-bind="currentProps" />
          
          <!-- 分类侧边栏组件 -->
          <CategorySidebar v-else-if="componentData.name === 'CategorySidebar'" 
            v-bind="currentProps" />
          
          <!-- 滑动菜单组件 -->
          <SwipeMenu v-else-if="componentData.name === 'SwipeMenu'" 
            v-bind="currentProps" />
          
          <!-- 底部标签栏组件 -->
          <TabBar v-else-if="componentData.name === 'TabBar'" 
            v-bind="currentProps" />
          
          <!-- 优惠券组件 -->
          <Coupon v-else-if="componentData.name === 'Coupon'" 
            v-bind="currentProps" />
          
          <!-- 用户头像组件 -->
          <UserAvatar v-else-if="componentData.name === 'UserAvatar'" 
            v-bind="currentProps" />
          
          <!-- 客服呼叫组件 -->
          <CallService v-else-if="componentData.name === 'CallService'" 
            v-bind="currentProps" />
          
          <!-- 优惠券列表组件 -->
          <CouponList v-else-if="componentData.name === 'CouponList'" 
            v-bind="currentProps" />
          
          <!-- 商品列表组件 -->
          <GoodsList v-else-if="componentData.name === 'GoodsList'" 
            v-bind="currentProps" />
          
          <!-- 默认情况 -->
          <block v-else>
            <component  :is="componentData.name" v-bind="currentProps" />

          </block>
        </template>
        <view v-else class="loading">加载中...</view>
      </view>
    </view>
    
    <!-- 配置切换区 -->
    <view class="config-section">
      <view class="section-title">配置</view>
      <view class="config-container">
        <view v-if="propOptions.length > 0" class="prop-list">
          <view v-for="(prop, index) in propOptions" :key="index" class="prop-item">
            <text class="prop-label">{{ prop.label }}:</text>
            
            <!-- 根据属性类型渲染不同的控件 -->
            <template v-if="prop.type === 'boolean'">
              <switch :checked="currentProps[prop.name]" @change="updateProp(prop.name, $event.detail.value)" />
            </template>
            
            <template v-else-if="prop.type === 'select'">
              <picker :value="getOptionIndex(prop)" :range="prop.options" range-key="label" @change="updateSelectProp(prop, $event)">
                <view class="picker-value">{{ getSelectedLabel(prop) }}</view>
              </picker>
            </template>
            
            <template v-else>
              <input type="text" v-model="currentProps[prop.name]" />
            </template>
          </view>
        </view>
        <view v-else class="no-props">该组件没有可配置的属性</view>
      </view>
    </view>
    
    <!-- 代码示例区 -->
    <view class="code-section">
      <view class="section-title">代码示例</view>
      <view class="code-container">
        <view class="code-block">
          <text class="code-content">{{ generatedCode }}</text>
        </view>
        <view class="copy-button" @click="copyCode">
          <text>复制代码</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

// 使用import.meta.glob动态导入所有组件
const baseComponents = import.meta.glob('../../components/base/*.vue', { eager: true });
const businessComponents = import.meta.glob('../../components/business/*.vue', { eager: true });
const displayComponents = import.meta.glob('../../components/display/*.vue', { eager: true });
const feedbackComponents = import.meta.glob('../../components/feedback/*.vue', { eager: true });
const formComponents = import.meta.glob('../../components/form/*.vue', { eager: true });
const layoutComponents = import.meta.glob('../../components/layout/*.vue', { eager: true });
const mallComponents = import.meta.glob('../../components/mall/*.vue', { eager: true });

// 合并所有组件
const allComponents = {
  ...Object.entries(baseComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[name] = module.default;
    acc[`Base${name}`] = module.default;
    return acc;
  }, {}),
  ...Object.entries(businessComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    const prefixedName = `Business${name}`;
    acc[prefixedName] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {}),
  ...Object.entries(displayComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[`Display${name}`] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {}),
  ...Object.entries(feedbackComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[`Feedback${name}`] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {}),
  ...Object.entries(formComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[`Form${name}`] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {}),
  ...Object.entries(layoutComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[`Layout${name}`] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {}),
  ...Object.entries(mallComponents).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    acc[`Mall${name}`] = module.default;
    // 只有在不存在同名组件时，才添加不带前缀的别名
    if (!acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {})  
};

// 添加business目录下的ProductList组件
allComponents.BusinessProductList = allComponents.BusinessProductList || null;

// 注册所有组件
const Button = allComponents.Button;
const Checkbox = allComponents.Checkbox;
const Dialog = allComponents.Dialog;
const Input = allComponents.Input;
const Pagination = allComponents.Pagination;
const Progress = allComponents.Progress;
const Radio = allComponents.Radio;
const RadioGroup = allComponents.RadioGroup;
const Select = allComponents.Select;
const Switch = allComponents.Switch;
const Table = allComponents.Table;
const Tabs = allComponents.Tabs;
const BaseTabs = allComponents.BaseTabs;
const Tag = allComponents.Tag;
const Message = allComponents.Message;
const ProductCard = allComponents.ProductCard;
const ProductList = allComponents.ProductList;
const BusinessProductList = Object.entries(businessComponents).reduce((acc, [path, module]) => {
  if (path.includes('ProductList.vue')) {
    return module.default;
  }
  return acc;
}, null);
const SkuSelector = allComponents.SkuSelector;
const Carousel = allComponents.Carousel;
const PullToRefresh = allComponents.PullToRefresh;
const BottomSheet = allComponents.BottomSheet;
const InputField = allComponents.InputField;
const SearchBar = allComponents.SearchBar;
const CategorySidebar = allComponents.CategorySidebar;
const SwipeMenu = allComponents.SwipeMenu;
const TabBar = allComponents.TabBar;
const Coupon = allComponents.Coupon;
const UserAvatar = allComponents.UserAvatar;
const CallService = allComponents.CallService;
const CouponList = allComponents.CouponList;
const GoodsList = allComponents.GoodsList;

// 获取路由参数
const componentName = ref('');
const componentCategory = ref('');

// 组件数据
const componentData = ref(null);

// 当前属性配置
const currentProps = ref({});

// 属性配置选项
const propOptions = ref([]);

// 生成的代码示例
const generatedCode = computed(() => {
  if (!componentData.value) return '';
  
  // 生成属性字符串
  const propsStr = Object.entries(currentProps.value)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `:${key}="'${value}'"`;  
      } else if (typeof value === 'boolean') {
        return value ? `:${key}="true"` : '';
      } else if (typeof value === 'number') {
        return `:${key}="${value}"`;
      } else if (typeof value === 'object') {
        return `:${key}="${JSON.stringify(value)}"`;
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
  
  return `<${componentData.value.name} ${propsStr}></${componentData.value.name}>`;
});

// 从组件信息管理工具中导入组件信息
import { getAllComponentInfo, getComponentInfo } from '../../utils/componentInfo';

// 组件列表数据
const components = getAllComponentInfo();
  
    

// 获取选项索引
const getOptionIndex = (prop) => {
  const value = currentProps.value[prop.name];
  const index = prop.options.findIndex(option => option.value === value);
  return index >= 0 ? index : 0;
};

// 获取选中的标签文本
const getSelectedLabel = (prop) => {
  const value = currentProps.value[prop.name];
  const option = prop.options.find(option => option.value === value);
  return option ? option.label : prop.options[0]?.label || '';
};

// 更新属性值
const updateProp = (propName, value) => {
  // 根据属性名称判断是否需要转换类型
  let typedValue = value;
  
  // 将数值类型的属性转换为数字
  if (propName === 'percentage' || propName === 'strokeWidth') {
    typedValue = Number(value);
  }
  
  // 创建一个新对象以确保响应式更新
  currentProps.value = {
    ...currentProps.value,
    [propName]: typedValue
  };
};

// 更新选择类型的属性值
const updateSelectProp = (prop, event) => {
  const index = event.detail.value;
  const value = prop.options[index].value;
  // 创建一个新对象以确保响应式更新
  currentProps.value = {
    ...currentProps.value,
    [prop.name]: value
  };
};

// 复制代码
const copyCode = () => {
  uni.setClipboardData({
    data: generatedCode.value,
    success: () => {
      uni.showToast({
        title: '代码已复制',
        icon: 'success'
      });
    }
  });
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 页面加载时初始化数据
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.$page?.options;
  
  if (options) {
    componentName.value = options.name || '';
    componentCategory.value = options.category || '';
    
    // 使用组件信息管理工具获取组件数据
    const component = getComponentInfo(componentName.value, componentCategory.value);
    
    if (component) {
      componentData.value = component;
      currentProps.value = { ...component.props };
      propOptions.value = component.propOptions || [];
    }
  }
});
</script>

<style lang="scss">
.component-detail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.detail-header {
  display: flex;
  align-items: center;
  height: 90rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 30rpx;
}

.back-button {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  margin-right: 60rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.preview-section,
.config-section,
.code-section {
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.preview-container {
  padding: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200rpx;
  background-color: #fafafa;
}

.config-container {
  padding: 30rpx;
}

.prop-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.prop-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.prop-label {
  font-size: 28rpx;
  color: #333;
  flex:none;
}

.picker-value {
  font-size: 28rpx;
  color: #666;
  padding: 10rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 200rpx;
  min-width: 200rpx;
  text-align: center;
  margin-left: 20rpx;
}

.no-props {
  font-size: 28rpx;
  color: #999;
  text-align: center;
  padding: 40rpx 0;
}

.code-container {
  padding: 30rpx;
}

.code-block {
  background-color: #f8f8f8;
  padding: 30rpx;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  overflow-x: auto;
}

.code-content {
  font-family: monospace;
  font-size: 26rpx;
  color: #333;
  white-space: pre-wrap;
  word-break: break-all;
}

.copy-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  background-color: #007AFF;
  color: #fff;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.loading {
  color: #999;
  font-size: 28rpx;
}
</style>