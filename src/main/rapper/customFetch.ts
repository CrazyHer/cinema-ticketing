import axios, { AxiosRequestConfig } from 'axios';
import { overrideFetch } from '.';

// 使用axios重写请求方法
const customFetch = (token: string) => {
  overrideFetch(
    ({ url, method, params }) =>
      new Promise<any>((resolve, reject) => {
        const config: AxiosRequestConfig = {
          method,
          url,
          data: params,
          baseURL: 'http://rap2api.taobao.org/app/mock/288782',
        };
        axios(
          // 登录接口请求头不附带token
          url === '/login' ? config : { ...config, headers: { token } }
        )
          .then((res) => resolve(res.data))
          .catch((error) => reject(error));
      })
  );
};

export default customFetch;
