/* md5: c64e693bac7516a4a2a8401f6cb052e5 */
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
   * 接口名：获取用户信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053037
   */
  'GET/user/getuserinfo': {
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
   * 接口名：获取热映电影
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2055387
   */
  'GET/user/gethotfilms': {
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
  'POST/user/editprofile': {
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
  'GET/user/getfilminfo': {
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
  'POST/user/pay': {
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

  /**
   * 接口名：获取订单列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2059118
   */
  'GET/user/getmyorders': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        cinema: string
        hall: string
        time: string
        selectedSeats: {
          row: number
          line: number
        }[]
        totalPrice: number
        /**
         * 0已支付，1已完成，2已退票
         */
        status: number
        orderID: number
      }[]
    }
  }

  /**
   * 接口名：退票
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2059123
   */
  'GET/user/refund': {
    Req: {
      orderID: number
    }
    Res: {
      code: number
      message: string
      data: {}
    }
  }

  /**
   * 接口名：获取统计信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2061260
   */
  'GET/admin/getstats': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        /**
         * 总用户数
         */
        users: number
        /**
         * 总销售额
         */
        sales: number
        /**
         * 日销售额
         */
        dailySales: {
          date: string
          value: number
        }[]
        /**
         * 各影片票房
         */
        boxOffice: {
          filmName: string
          value: number
        }[]
        /**
         * 各影片上座率
         */
        seatRate: {
          filmName: string
          value: number
        }[]
      }
    }
  }

  /**
   * 接口名：获取电影列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062438
   */
  'GET/admin/getfilms': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        IMDb: string
        zhName: string
        enName: string
        type: string
        country: string
        duration: string
        actor: string
        boxOffice: number
        posterURL: string
        photosURL: string[]
        breif: string
      }[]
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'POST/login': ResSelector<IModels['POST/login']['Res']>
  'POST/register': ResSelector<IModels['POST/register']['Res']>
  'GET/user/getuserinfo': ResSelector<IModels['GET/user/getuserinfo']['Res']>
  'GET/user/gethotfilms': ResSelector<IModels['GET/user/gethotfilms']['Res']>
  'POST/user/editprofile': ResSelector<IModels['POST/user/editprofile']['Res']>
  'GET/user/getfilminfo': ResSelector<IModels['GET/user/getfilminfo']['Res']>
  'POST/user/pay': ResSelector<IModels['POST/user/pay']['Res']>
  'GET/user/getmyorders': ResSelector<IModels['GET/user/getmyorders']['Res']>
  'GET/user/refund': ResSelector<IModels['GET/user/refund']['Res']>
  'GET/admin/getstats': ResSelector<IModels['GET/admin/getstats']['Res']>
  'GET/admin/getfilms': ResSelector<IModels['GET/admin/getfilms']['Res']>
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
     * 接口名：获取用户信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2053037
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/user/getuserinfo': (req?: IModels['GET/user/getuserinfo']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/getuserinfo',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/user/getuserinfo']>
    },

    /**
     * 接口名：获取热映电影
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2055387
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/user/gethotfilms': (req?: IModels['GET/user/gethotfilms']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/gethotfilms',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/user/gethotfilms']>
    },

    /**
     * 接口名：修改个人信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2056760
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/user/editprofile': (req?: IModels['POST/user/editprofile']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/editprofile',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/user/editprofile']>
    },

    /**
     * 接口名：获取电影详情
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2057993
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/user/getfilminfo': (req?: IModels['GET/user/getfilminfo']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/getfilminfo',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/user/getfilminfo']>
    },

    /**
     * 接口名：支付订单
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2058034
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/user/pay': (req?: IModels['POST/user/pay']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/pay',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/user/pay']>
    },

    /**
     * 接口名：获取订单列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2059118
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/user/getmyorders': (req?: IModels['GET/user/getmyorders']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/getmyorders',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/user/getmyorders']>
    },

    /**
     * 接口名：退票
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2059123
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/user/refund': (req?: IModels['GET/user/refund']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/user/refund',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/user/refund']>
    },

    /**
     * 接口名：获取统计信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2061260
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/getstats': (req?: IModels['GET/admin/getstats']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/getstats',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/getstats']>
    },

    /**
     * 接口名：获取电影列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062438
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/getfilms': (req?: IModels['GET/admin/getfilms']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/getfilms',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/getfilms']>
    },
  }
}
