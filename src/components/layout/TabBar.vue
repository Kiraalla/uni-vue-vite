<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every(tab => {
        return typeof tab.name === 'string' &&
               typeof tab.icon === 'string' &&
               typeof tab.id === (Number || String)
      })
    }
  },
  activeTab: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['change']);

const handleTabChange = (tab) => {
  emit('change', tab);
};
</script>

<template>
  <div class="tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab-item', { active: tab.id === activeTab }]"
      @click="handleTabChange(tab)"
    >
      <i :class="['tab-icon', tab.icon]"></i>
      <span class="tab-name">{{ tab.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  border-top: 1px solid #eee;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 12px;
}

.tab-item.active {
  color: #ff4444;
}

.tab-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.tab-name {
  font-size: 12px;
}
</style>