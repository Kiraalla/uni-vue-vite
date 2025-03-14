import { inject } from 'vue';

// 定义 http 工具方法
const http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method: 'GET',
        data: params,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败: ${res.statusCode}`));
          }
        },
        fail: (err) => {
          reject(new Error(err.errMsg || '网络请求失败'));
        }
      });
    });
  },

  post(url, data) {
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method: 'POST',
        data,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败: ${res.statusCode}`));
          }
        },
        fail: (err) => {
          reject(new Error(err.errMsg || '网络请求失败'));
        }
      });
    });
  },
};

// 定义 useHttp Hook
export function useHttp() {
  const $http = inject('$http');
  if (!$http) {
    throw new Error('$http 未提供');
  }
  return $http;
}

// 导出 http 工具方法
export default http;


// 在组件中使用
// import { useHttp } from '@/utils/http';

// export default {
//   setup() {
//     const http = useHttp();

//     const getData = async () => {
//       const res = await http.get('/api/getData');
//       console.log(res);
//     };

//     return {
//       getData,
//     };
//   },
// };