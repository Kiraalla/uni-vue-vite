<script setup>
import { useHttp } from '@/utils/http';
import { ref } from 'vue';

const http = useHttp();
const getResult = ref('');
const postResult = ref('');
const loading = ref(false);

const testGetRequest = async () => {
  try {
    loading.value = true;
    const res = await http.get('https://jsonplaceholder.typicode.com/posts/1');
    getResult.value = JSON.stringify(res, null, 2);
  } catch (error) {
    getResult.value = `请求失败: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

const testPostRequest = async () => {
  try {
    loading.value = true;
    const data = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    const res = await http.post('https://jsonplaceholder.typicode.com/posts', data);
    postResult.value = JSON.stringify(res, null, 2);
  } catch (error) {
    postResult.value = `请求失败: ${error.message}`;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="http-test-container">
    <h2>HTTP工具测试</h2>
    
    <div class="test-section">
      <h3>GET请求测试</h3>
      <button @click="testGetRequest" :disabled="loading">测试GET请求</button>
      <div class="result-box">
        <pre>{{ getResult || '暂无数据' }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h3>POST请求测试</h3>
      <button @click="testPostRequest" :disabled="loading">测试POST请求</button>
      <div class="result-box">
        <pre>{{ postResult || '暂无数据' }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.http-test-container {
  padding: 20px;
}

.test-section {
  margin-bottom: 20px;
}

.result-box {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>