/**
 * 组件注册工具
 * 用于统一管理组件的导入和注册
 */

// 使用import.meta.glob动态导入所有组件
const baseComponents = import.meta.glob('../components/base/*.vue', { eager: true });
const businessComponents = import.meta.glob('../components/business/*.vue', { eager: true });
const displayComponents = import.meta.glob('../components/display/*.vue', { eager: true });
const feedbackComponents = import.meta.glob('../components/feedback/*.vue', { eager: true });
const formComponents = import.meta.glob('../components/form/*.vue', { eager: true });
const layoutComponents = import.meta.glob('../components/layout/*.vue', { eager: true });
const mallComponents = import.meta.glob('../components/mall/*.vue', { eager: true });

// 组件注册表
const componentRegistry = {};

// 处理组件注册
function registerComponents(componentsObj, prefix = '') {
  return Object.entries(componentsObj).reduce((acc, [path, module]) => {
    const name = path.split('/').pop().replace('.vue', '');
    const componentName = prefix ? `${prefix}${name}` : name;
    // 始终添加带前缀的组件名，确保唯一性
    acc[componentName] = module.default;
    // 添加不带前缀的别名，但确保base目录下的组件优先级最高
    // 对于非base目录的组件，只有在不存在同名组件时才添加不带前缀的别名
    if (prefix === 'Base' || !acc[name]) {
      acc[name] = module.default;
    }
    return acc;
  }, {});
}

// 注册组件
Object.assign(componentRegistry, registerComponents(baseComponents, 'Base'));
Object.assign(componentRegistry, registerComponents(businessComponents, 'Business'));
Object.assign(componentRegistry, registerComponents(displayComponents, 'Display'));
Object.assign(componentRegistry, registerComponents(feedbackComponents, 'Feedback'));
Object.assign(componentRegistry, registerComponents(formComponents, 'Form'));
Object.assign(componentRegistry, registerComponents(layoutComponents, 'Layout'));
Object.assign(componentRegistry, registerComponents(mallComponents, 'Mall'));

/**
 * 获取所有注册的组件
 * @returns {Object} 组件注册表
 */
export function getAllComponents() {
  return componentRegistry;
}

/**
 * 获取指定名称的组件
 * @param {string} name 组件名称
 * @returns {Object|null} 组件对象或null
 */
export function getComponent(name) {
  return componentRegistry[name] || null;
}

/**
 * 全局注册所有组件到Vue应用
 * @param {Object} app Vue应用实例
 */
export function registerGlobalComponents(app) {
  Object.entries(componentRegistry).forEach(([name, component]) => {
    app.component(name, component);
  });
}