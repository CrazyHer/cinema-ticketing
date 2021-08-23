/* md5: d57b3511507fd30f160fadd51cedd557 */
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
   * 接口名：登录
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053034
   */
  'POST/login': {
    Req: {
      username: string
      password: string
    }
    Res: {
      code: number
      message: string
      data: {
        token: string
      }
    }
  }

  /**
   * 接口名：获取用户信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053037
   */
  'GET/getuserinfo': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        character: string
        name: string
        avatarURL: string
        phone: string
        email: string
        address: string[]
        /**
         * 目前开放的城市
         */
        availableCities: {
          province: string
          cities: string[]
        }[]
      }
    }
  }

  /**
   * 接口名：注册
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053327
   */
  'POST/register': {
    Req: {
      username: string
      password: string
    }
    Res: {
      code: number
      message: string
      data: {}
    }
  }

  /**
   * 接口名：获取热映电影
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2055387
   */
  'GET/gethotfilms': {
    Req: {
      address: string[]
    }
    Res: {
      code: number
      message: string
      data: {
        posterURL: string
        name: string
        popularity: number
        /**
         * 电影唯一ID
         */
        IMDb: string
      }[]
    }
  }

  /**
   * 接口名：修改个人信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2056760
   */
  'POST/editprofile': {
    Req: {
      imgSrc: string
      name: string
      email: string
      address: string[]
      phone: string
    }
    Res: {
      code: number
      message: string
      data: string
    }
  }

  /**
   * 接口名：获取电影详情
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2057993
   */
  'GET/getfilminfo': {
    Req: {
      IMDb: string
    }
    Res: {
      code: number
      message: string
      data: {
        arrangements: {
          cinema: string
          hall: string
          time: string
          /**
           * 0为禁用，1为空闲，2为占用
           */
          seats: {
            [k: string]: any
          }[]
          price: number
          arrangementID: number
        }[]
        zhName: string
        enName: string
        type: string
        country: string
        duration: string
        IMDb: string
        actor: string
        boxOffice: number
        posterURL: string
        photosURL: string[]
        breif: string
      }
    }
  }

  /**
   * 接口名：支付订单
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2058034
   */
  'POST/pay': {
    Req: {
      arrangementID: number
      selectedSeats: {
        row: number
        line: number
      }[]
      price: number
    }
    Res: {
      code: number
      message: string
      data: string
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'POST/login': ResSelector<IModels['POST/login']['Res']>
  'GET/getuserinfo': ResSelector<IModels['GET/getuserinfo']['Res']>
  'POST/register': ResSelector<IModels['POST/register']['Res']>
  'GET/gethotfilms': ResSelector<IModels['GET/gethotfilms']['Res']>
  'POST/editprofile': ResSelector<IModels['POST/editprofile']['Res']>
  'GET/getfilminfo': ResSelector<IModels['GET/getfilminfo']['Res']>
  'POST/pay': ResSelector<IModels['POST/pay']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：登录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053034
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/login': (req?: IModels['POST/login']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/login',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/login']>
    },

    /**
     * 接口名：获取用户信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053037
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/getuserinfo': (req?: IModels['GET/getuserinfo']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/getuserinfo',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/getuserinfo']>
    },

    /**
     * 接口名：注册
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053327
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/register': (req?: IModels['POST/register']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/register',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/register']>
    },

    /**
     * 接口名：获取热映电影
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2055387
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/gethotfilms': (req?: IModels['GET/gethotfilms']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/gethotfilms',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/gethotfilms']>
    },

    /**
     * 接口名：修改个人信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2056760
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/editprofile': (req?: IModels['POST/editprofile']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/editprofile',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/editprofile']>
    },

    /**
     * 接口名：获取电影详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2057993
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/getfilminfo': (req?: IModels['GET/getfilminfo']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/getfilminfo',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/getfilminfo']>
    },

    /**
     * 接口名：支付订单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2058034
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/pay': (req?: IModels['POST/pay']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/pay',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/pay']>
    },
  }
}
