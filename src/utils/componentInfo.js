/**
 * 组件信息管理工具
 * 用于统一管理组件的元数据信息，包括组件名称、类别、描述和属性配置等
 */

// 组件信息注册表
const componentRegistry = [
  // 基础组件
  {
    name: 'Button',
    category: 'base',
    description: '按钮组件，用于触发操作',
    props: { type: 'primary', size: 'medium', plain: false, round: false, disabled: false, loading: false, icon: '' },
    propOptions: [
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' }
        ]
      },
      {
        name: 'size', label: '尺寸', type: 'select', options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'medium' },
          { label: '小', value: 'small' },
          { label: '迷你', value: 'mini' }
        ]
      },
      { name: 'plain', label: '朴素按钮', type: 'boolean' },
      { name: 'round', label: '圆角按钮', type: 'boolean' },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      { name: 'loading', label: '加载状态', type: 'boolean' },
      { name: 'icon', label: '图标类名', type: 'text' }
    ]
  },
  {
    name: 'Input',
    category: 'base',
    description: '输入框组件，用于文本输入',
    props: { modelValue: '', placeholder: '请输入内容', type: 'text', disabled: false, clearable: false, readonly: false },
    propOptions: [
      { name: 'modelValue', label: '输入值', type: 'text' },
      { name: 'placeholder', label: '占位文本', type: 'text' },
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '文本', value: 'text' },
          { label: '密码', value: 'password' },
          { label: '数字', value: 'number' },
          { label: '邮箱', value: 'email' }
        ]
      },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      { name: 'clearable', label: '可清空', type: 'boolean' },
      { name: 'readonly', label: '只读', type: 'boolean' }
    ]
  },
  {
    name: 'Tag',
    category: 'base',
    description: '标签组件，用于标记和分类',
    props: { type: 'primary', size: 'medium', plain: false, round: false, closable: false },
    propOptions: [
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' }
        ]
      },
      {
        name: 'size', label: '尺寸', type: 'select', options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'medium' },
          { label: '小', value: 'small' },
          { label: '迷你', value: 'mini' }
        ]
      },
      { name: 'plain', label: '朴素标签', type: 'boolean' },
      { name: 'round', label: '圆角标签', type: 'boolean' },
      { name: 'closable', label: '可关闭', type: 'boolean' }
    ]
  },
  {
    name: 'Checkbox',
    category: 'base',
    description: '复选框组件，用于多选操作',
    props: { modelValue: false, label: '复选框', disabled: false, size: 'medium' },
    propOptions: [
      { name: 'modelValue', label: '是否选中', type: 'boolean' },
      { name: 'label', label: '标签文本', type: 'text' },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      {
        name: 'size', label: '尺寸', type: 'select', options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'medium' },
          { label: '小', value: 'small' },
          { label: '迷你', value: 'mini' }
        ]
      }
    ]
  },
  {
    name: 'Radio',
    category: 'base',
    description: '单选框组件，用于单选操作',
    props: { modelValue: '', label: '单选框', disabled: false, size: 'medium' },
    propOptions: [
      { name: 'modelValue', label: '选中值', type: 'text' },
      { name: 'label', label: '标签文本', type: 'text' },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      {
        name: 'size', label: '尺寸', type: 'select', options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'medium' },
          { label: '小', value: 'small' },
          { label: '迷你', value: 'mini' }
        ]
      }
    ]
  },
  {
    name: 'Switch',
    category: 'base',
    description: '开关组件，用于切换状态',
    props: { modelValue: false, disabled: false, size: 'medium', activeColor: '#409eff', inactiveColor: '#dcdfe6' },
    propOptions: [
      { name: 'modelValue', label: '是否打开', type: 'boolean' },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      {
        name: 'size', label: '尺寸', type: 'select', options: [
          { label: '大', value: 'large' },
          { label: '中', value: 'medium' },
          { label: '小', value: 'small' },
          { label: '迷你', value: 'mini' }
        ]
      },
      { name: 'activeColor', label: '打开颜色', type: 'text' },
      { name: 'inactiveColor', label: '关闭颜色', type: 'text' },
      { name: 'activeText', label: '打开文本', type: 'text' },
      { name: 'inactiveText', label: '关闭文本', type: 'text' }
    ]
  },
  {
    name: 'Tabs',
    category: 'base',
    description: '标签页组件，用于内容分组展示',
    props: {
      modelValue: 'tab1',
      tabs: [
        { name: 'tab1', label: '标签1' },
        { name: 'tab2', label: '标签2' },
        { name: 'tab3', label: '标签3' }
      ],
      type: 'line',
      closable: false
    },
    propOptions: [
      {
        name: 'modelValue', label: '当前标签', type: 'select', options: [
          { label: '标签1', value: 'tab1' },
          { label: '标签2', value: 'tab2' },
          { label: '标签3', value: 'tab3' }
        ]
      },
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '线条', value: 'line' },
          { label: '卡片', value: 'card' }
        ]
      },
      { name: 'closable', label: '可关闭', type: 'boolean' }
    ]
  },
  {
    name: 'Progress',
    category: 'base',
    description: '进度条组件，用于展示进度',
    props: { percentage: 50, type: 'line', status: '', strokeWidth: 6, textInside: false, showText: true },
    propOptions: [
      { name: 'percentage', label: '百分比', type: 'text' },
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '线条', value: 'line' },
          { label: '圆形', value: 'circle' }
        ]
      },
      {
        name: 'status', label: '状态', type: 'select', options: [
          { label: '默认', value: '' },
          { label: '成功', value: 'success' },
          { label: '异常', value: 'exception' },
          { label: '警告', value: 'warning' }
        ]
      },
      { name: 'strokeWidth', label: '线宽', type: 'text' },
      { name: 'textInside', label: '内显文字', type: 'boolean' },
      { name: 'showText', label: '显示文字', type: 'boolean' }
    ]
  },
  {
    name: 'Select',
    category: 'base',
    description: '选择器组件，用于下拉选择',
    props: {
      modelValue: '',
      placeholder: '请选择',
      disabled: false,
      clearable: false,
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' }
      ]
    },
    propOptions: [
      { name: 'modelValue', label: '选中值', type: 'text' },
      { name: 'placeholder', label: '占位文本', type: 'text' },
      { name: 'disabled', label: '禁用状态', type: 'boolean' },
      { name: 'clearable', label: '可清空', type: 'boolean' }
    ]
  },
  {
    name: 'Table',
    category: 'base',
    description: '表格组件，用于数据展示',
    props: {
      data: [
        { id: 1, name: '示例数据1', age: 25 },
        { id: 2, name: '示例数据2', age: 30 }
      ],
      columns: [
        { title: 'ID', key: 'id' },
        { title: '名称', key: 'name' },
        { title: '年龄', key: 'age' }
      ],
      border: true,
      stripe: false
    },
    propOptions: [
      { name: 'border', label: '显示边框', type: 'boolean' },
      { name: 'stripe', label: '斑马纹', type: 'boolean' }
    ]
  },
  {
    name: 'Pagination',
    category: 'base',
    description: '分页组件，用于数据分页',
    props: { modelValue: 1, total: 100, pageSize: 10, pagerCount: 7 },
    propOptions: [
      { name: 'modelValue', label: '当前页码', type: 'text' },
      { name: 'total', label: '总条目数', type: 'text' },
      { name: 'pageSize', label: '每页条数', type: 'text' },
      { name: 'pagerCount', label: '页码按钮数', type: 'text' }
    ]
  },
  {
    name: 'Dialog',
    category: 'base',
    description: '对话框组件，用于展示弹窗',
    props: { modelValue: false, title: '对话框', width: '50%', top: '15vh', closeOnClickModal: true },
    propOptions: [
      { name: 'modelValue', label: '是否显示', type: 'boolean' },
      { name: 'title', label: '标题', type: 'text' },
      { name: 'width', label: '宽度', type: 'text' },
      { name: 'top', label: '顶部距离', type: 'text' },
      { name: 'closeOnClickModal', label: '点击遮罩关闭', type: 'boolean' }
    ]
  },
  {
    name: 'Message',
    category: 'base',
    description: '消息提示组件，用于展示提示信息',
    props: { type: 'info', message: '这是一条消息', duration: 3000, showClose: false },
    propOptions: [
      {
        name: 'type', label: '类型', type: 'select', options: [
          { label: '信息', value: 'info' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '错误', value: 'error' }
        ]
      },
      { name: 'message', label: '消息内容', type: 'text' },
      { name: 'duration', label: '显示时间', type: 'text' },
      { name: 'showClose', label: '显示关闭按钮', type: 'boolean' }
    ]
  },
  // 商城组件
  {
    name: 'ProductCard',
    category: 'mall',
    description: '商品卡片组件，用于展示商品信息',
    props: { title: '商品标题', price: '99.00', image: '', tags: ['热销', '新品'], discount: false },
    propOptions: [
      { name: 'title', label: '商品标题', type: 'text' },
      { name: 'price', label: '商品价格', type: 'text' },
      { name: 'image', label: '商品图片', type: 'text' },
      { name: 'discount', label: '显示折扣', type: 'boolean' }
    ]
  },
  {
    name: 'ProductList',
    category: 'mall',
    description: '商品列表组件，用于展示商品列表',
    props: { data: [], loading: false, finished: false },
    propOptions: [
      { name: 'loading', label: '加载中', type: 'boolean' },
      { name: 'finished', label: '加载完成', type: 'boolean' }
    ]
  },
  {
    name: 'SkuSelector',
    category: 'mall',
    description: 'SKU选择器组件，用于选择商品规格',
    props: { options: [], modelValue: {} },
    propOptions: [
      { name: 'modelValue', label: '选中值', type: 'text' }
    ]
  },
  {
    name: 'Coupon',
    category: 'mall',
    description: '优惠券组件，用于展示优惠券',
    props: { title: '满100减10', value: '10', condition: '满100元可用', validDate: '2023-12-31前有效', used: false },
    propOptions: [
      { name: 'title', label: '优惠券标题', type: 'text' },
      { name: 'value', label: '优惠券金额', type: 'text' },
      { name: 'condition', label: '使用条件', type: 'text' },
      { name: 'validDate', label: '有效期', type: 'text' },
      { name: 'used', label: '是否已使用', type: 'boolean' }
    ]
  },
  // 展示组件
  {
    name: 'Carousel',
    category: 'display',
    description: '轮播图组件，用于展示轮播图',
    props: { images: [], autoplay: true, interval: 3000, duration: 500, circular: true, indicatorDots: true },
    propOptions: [
      { name: 'autoplay', label: '自动播放', type: 'boolean' },
      { name: 'interval', label: '自动切换时间', type: 'text' },
      { name: 'duration', label: '滑动动画时长', type: 'text' },
      { name: 'circular', label: '循环播放', type: 'boolean' },
      { name: 'indicatorDots', label: '显示指示点', type: 'boolean' }
    ]
  },
  {
    name: 'PullToRefresh',
    category: 'display',
    description: '下拉刷新组件，用于下拉刷新',
    props: { loading: false, finished: false },
    propOptions: [
      { name: 'loading', label: '加载中', type: 'boolean' },
      { name: 'finished', label: '加载完成', type: 'boolean' }
    ]
  },
  // 反馈组件
  {
    name: 'BottomSheet',
    category: 'feedback',
    description: '底部弹出层组件，用于展示底部弹出层',
    props: { modelValue: false, title: '标题', round: true, overlay: true, closeOnClickOverlay: true },
    propOptions: [
      { name: 'modelValue', label: '是否显示', type: 'boolean' },
      { name: 'title', label: '标题', type: 'text' },
      { name: 'round', label: '圆角', type: 'boolean' },
      { name: 'overlay', label: '显示遮罩', type: 'boolean' },
      { name: 'closeOnClickOverlay', label: '点击遮罩关闭', type: 'boolean' }
    ]
  },
  // 表单组件
  {
    name: 'InputField',
    category: 'form',
    description: '输入字段组件，用于表单输入',
    props: { modelValue: '', label: '输入字段', required: false, errorMessage: '', placeholder: '请输入' },
    propOptions: [
      { name: 'modelValue', label: '输入值', type: 'text' },
      { name: 'label', label: '字段标签', type: 'text' },
      { name: 'required', label: '是否必填', type: 'boolean' },
      { name: 'errorMessage', label: '错误信息', type: 'text' },
      { name: 'placeholder', label: '占位文本', type: 'text' }
    ]
  },
  {
    name: 'SearchBar',
    category: 'form',
    description: '搜索栏组件，用于搜索功能',
    props: { modelValue: '', placeholder: '搜索', showAction: true, background: '#f2f2f2' },
    propOptions: [
      { name: 'modelValue', label: '输入值', type: 'text' },
      { name: 'placeholder', label: '占位文本', type: 'text' },
      { name: 'showAction', label: '显示按钮', type: 'boolean' },
      { name: 'background', label: '背景颜色', type: 'text' }
    ]
  },
  // 布局组件
  {
    name: 'CategorySidebar',
    category: 'layout',
    description: '分类侧边栏组件，用于分类导航',
    props: { categories: [], modelValue: 0 },
    propOptions: [
      { name: 'modelValue', label: '选中索引', type: 'text' }
    ]
  },
  {
    name: 'SwipeMenu',
    category: 'layout',
    description: '滑动菜单组件，用于侧滑操作',
    props: { buttons: [], disabled: false },
    propOptions: [
      { name: 'disabled', label: '禁用状态', type: 'boolean' }
    ]
  },
  {
    name: 'TabBar',
    category: 'layout',
    description: '底部标签栏组件，用于底部导航',
    props: { tabs: [], modelValue: 0, fixed: true, border: true },
    propOptions: [
      { name: 'modelValue', label: '选中索引', type: 'text' },
      { name: 'fixed', label: '固定在底部', type: 'boolean' },
      { name: 'border', label: '显示边框', type: 'boolean' }
    ]
  },
  // 业务组件
  {
    name: 'UserAvatar',
    category: 'business',
    description: '用户头像组件，用于展示用户头像',
    props: { name: '新用户', url: '', alt: '用户头像', size: 60, radius: '0', block: false, mode: 'cover', letter: false },
    propOptions: [
      { name: 'name', label: '用户名称', type: 'text' },
      { name: 'url', label: '头像地址', type: 'text' },
      { name: 'alt', label: '替代文本', type: 'text' },
      { name: 'size', label: '尺寸', type: 'text' },
      { name: 'radius', label: '圆角大小', type: 'text' },
      { name: 'block', label: '块级显示', type: 'boolean' },
      {
        name: 'mode', label: '图片模式', type: 'select', options: [
          { label: '覆盖', value: 'cover' },
          { label: '包含', value: 'contain' },
          { label: '居中', value: 'center' }
        ]
      },
      { name: 'letter', label: '字母头像', type: 'boolean' }
    ]
  },
  {
    name: 'CallService',
    category: 'business',
    description: '客服呼叫组件，用于联系客服',
    props: { text: '联系客服', phone: '', online: true },
    propOptions: [
      { name: 'text', label: '按钮文本', type: 'text' },
      { name: 'phone', label: '客服电话', type: 'text' },
      { name: 'online', label: '在线状态', type: 'boolean' }
    ]
  },
  {
    name: 'CouponList',
    category: 'business',
    description: '优惠券列表组件，用于展示优惠券列表',
    props: { coupons: [], loading: false, finished: false },
    propOptions: [
      { name: 'loading', label: '加载中', type: 'boolean' },
      { name: 'finished', label: '加载完成', type: 'boolean' }
    ]
  },
  {
    name: 'GoodsList',
    category: 'business',
    description: '商品列表组件，用于展示商品列表',
    props: { goods: [], loading: false, finished: false, columns: 2 },
    propOptions: [
      { name: 'loading', label: '加载中', type: 'boolean' },
      { name: 'finished', label: '加载完成', type: 'boolean' },
      { name: 'columns', label: '列数', type: 'text' }
    ]
  }
];

/**
 * 获取所有组件信息
 * @returns {Array} 组件信息列表
 */
export function getAllComponentInfo() {
  return componentRegistry;
}

/**
 * 根据组件名称和类别获取组件信息
 * @param {string} name 组件名称
 * @param {string} category 组件类别
 * @returns {Object|null} 组件信息对象或null
 */
export function getComponentInfo(name, category) {
  return componentRegistry.find(item => 
    item.name === name && item.category === category
  ) || null;
}

/**
 * 根据类别获取组件信息列表
 * @param {string} category 组件类别
 * @returns {Array} 组件信息列表
 */
export function getComponentsByCategory(category) {
  if (category === 'all') {
    return componentRegistry;
  }
  return componentRegistry.filter(item => item.category === category);
}

/**
 * 搜索组件信息
 * @param {string} keyword 搜索关键词
 * @returns {Array} 匹配的组件信息列表
 */
export function searchComponents(keyword) {
  if (!keyword) {
    return componentRegistry;
  }
  const lowerKeyword = keyword.toLowerCase();
  return componentRegistry.filter(item => 
    item.name.toLowerCase().includes(lowerKeyword) || 
    item.description.toLowerCase().includes(lowerKeyword)
  );
}