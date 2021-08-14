/* md5: 05a080f25600808c6b8aa65884f78cc6 */
/* Rap仓库id: 288782 */
/* Rapper版本: 1.2.2 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=288782
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：示例接口
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2048371
   */
  'GET/example/1628934364823': {
    Req: {
      /**
       * 请求属性示例
       */
      foo?: string
    }
    Res: {
      /**
       * 字符串属性示例
       */
      string: string
      /**
       * 数字属性示例
       */
      number: number
      /**
       * 布尔属性示例
       */
      boolean: boolean
      /**
       * 正则属性示例
       */
      regexp: string
      /**
       * 函数属性示例
       */
      function: string
      /**
       * 数组属性示例
       */
      array: {
        /**
         * 数组元素示例
         */
        foo: number
        /**
         * 数组元素示例
         */
        bar: string
      }[]
      /**
       * 自定义数组元素示例
       */
      items: any[]
      /**
       * 对象属性示例
       */
      object: {
        /**
         * 对象属性示例
         */
        foo: number
        /**
         * 对象属性示例
         */
        bar: string
      }
      /**
       * 占位符示例
       */
      placeholder: string
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'GET/example/1628934364823': ResSelector<IModels['GET/example/1628934364823']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：示例接口
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2048371
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/example/1628934364823': (req?: IModels['GET/example/1628934364823']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/example/1628934364823',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/example/1628934364823']>
    },
  }
}
