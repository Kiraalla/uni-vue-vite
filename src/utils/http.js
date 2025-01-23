import { inject } from 'vue';

// 定义 http 工具方法
const http = {
  get(url, params) {
    return uni.request({
      url,
      method: 'GET',
      data: params,
    });
  },

  post(url, data) {
    return uni.request({
      url,
      method: 'POST',
      data,
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