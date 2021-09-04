/* md5: a908b0f4e750b2782a0ed4fd8d30579c */
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
      userID: string
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
      userID: string
      password: string
    }
    Res: {
      code: number
      message: string
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
        username: string
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
    Req: {}
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
      username: string
      email: string
      address: string[]
      phone: string
    }
    Res: {
      code: number
      message: string
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

  /**
   * 接口名：修改电影信息
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062765
   */
  'POST/admin/editfilm': {
    Req: {
      IMDb: string
      zhName: string
      enName: string
      type: string
      country: string
      duration: string
      actor: string
      posterURL: string
      photosURL: string[]
      breif: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：新增电影
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062767
   */
  'POST/admin/addfilm': {
    Req: {
      IMDb: string
      zhName: string
      enName: string
      type: string
      country: string
      duration: string
      actor: string
      posterURL: string
      photosURL: string[]
      breif: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：删除电影
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062817
   */
  'GET/admin/delfilm': {
    Req: {
      IMDb: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：获取排片列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062851
   */
  'GET/admin/getarrangements': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        filmName: string
        hall: string
        time: string
        seats: {
          [k: string]: any
        }[]
        price: number
        arrangementID: number
      }[]
    }
  }

  /**
   * 接口名：添加排片
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062846
   */
  'POST/admin/addarrangement': {
    Req: {
      IMDb: string
      hallID: string
      time: string
      price: number
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：删除排片
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062847
   */
  'GET/admin/delarrangement': {
    Req: {
      arrangementID: number
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：获取放映厅列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062852
   */
  'GET/admin/gethalls': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        hallID: number
        hallName: string
        seats: {
          [k: string]: any
        }[]
        comment: string
      }[]
    }
  }

  /**
   * 接口名：添加放映厅
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062848
   */
  'POST/admin/addhall': {
    Req: {
      hallName: string
      seats: any[]
      comment: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：修改放映厅
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062849
   */
  'POST/admin/edithall': {
    Req: {
      hallID: number
      hallName: string
      seats: any[]
      comment: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：删除放映厅
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062850
   */
  'GET/admin/delhall': {
    Req: {
      hallID: number
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：获取订单列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062853
   */
  'GET/admin/getorders': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        orderID: number
        userID: string
        filmName: string
        hall: string
        time: string
        selectedSeats: {
          row: number
          line: number
        }[]
        totalPrice: number
        status: number
      }[]
    }
  }

  /**
   * 接口名：获取用户列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062854
   */
  'GET/admin/getusers': {
    Req: {}
    Res: {
      code: number
      message: string
      data: {
        userID: string
        username: string
        character: string
        address: string
      }[]
    }
  }

  /**
   * 接口名：添加分店管理员
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062860
   */
  'POST/admin/addadmin': {
    Req: {
      username: string
      email: string
      phone: string
      address: string[]
      password: string
      userID: string
    }
    Res: {
      code: number
      message: string
    }
  }

  /**
   * 接口名：删除用户
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062861
   */
  'GET/admin/deluser': {
    Req: {
      userID: string
    }
    Res: {
      code: number
      message: string
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
  'POST/admin/editfilm': ResSelector<IModels['POST/admin/editfilm']['Res']>
  'POST/admin/addfilm': ResSelector<IModels['POST/admin/addfilm']['Res']>
  'GET/admin/delfilm': ResSelector<IModels['GET/admin/delfilm']['Res']>
  'GET/admin/getarrangements': ResSelector<IModels['GET/admin/getarrangements']['Res']>
  'POST/admin/addarrangement': ResSelector<IModels['POST/admin/addarrangement']['Res']>
  'GET/admin/delarrangement': ResSelector<IModels['GET/admin/delarrangement']['Res']>
  'GET/admin/gethalls': ResSelector<IModels['GET/admin/gethalls']['Res']>
  'POST/admin/addhall': ResSelector<IModels['POST/admin/addhall']['Res']>
  'POST/admin/edithall': ResSelector<IModels['POST/admin/edithall']['Res']>
  'GET/admin/delhall': ResSelector<IModels['GET/admin/delhall']['Res']>
  'GET/admin/getorders': ResSelector<IModels['GET/admin/getorders']['Res']>
  'GET/admin/getusers': ResSelector<IModels['GET/admin/getusers']['Res']>
  'POST/admin/addadmin': ResSelector<IModels['POST/admin/addadmin']['Res']>
  'GET/admin/deluser': ResSelector<IModels['GET/admin/deluser']['Res']>
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

    /**
     * 接口名：修改电影信息
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062765
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/editfilm': (req?: IModels['POST/admin/editfilm']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/editfilm',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/editfilm']>
    },

    /**
     * 接口名：新增电影
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062767
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/addfilm': (req?: IModels['POST/admin/addfilm']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/addfilm',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/addfilm']>
    },

    /**
     * 接口名：删除电影
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062817
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/delfilm': (req?: IModels['GET/admin/delfilm']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/delfilm',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/delfilm']>
    },

    /**
     * 接口名：获取排片列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062851
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/getarrangements': (req?: IModels['GET/admin/getarrangements']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/getarrangements',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/getarrangements']>
    },

    /**
     * 接口名：添加排片
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062846
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/addarrangement': (req?: IModels['POST/admin/addarrangement']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/addarrangement',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/addarrangement']>
    },

    /**
     * 接口名：删除排片
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062847
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/delarrangement': (req?: IModels['GET/admin/delarrangement']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/delarrangement',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/delarrangement']>
    },

    /**
     * 接口名：获取放映厅列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062852
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/gethalls': (req?: IModels['GET/admin/gethalls']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/gethalls',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/gethalls']>
    },

    /**
     * 接口名：添加放映厅
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062848
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/addhall': (req?: IModels['POST/admin/addhall']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/addhall',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/addhall']>
    },

    /**
     * 接口名：修改放映厅
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062849
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/edithall': (req?: IModels['POST/admin/edithall']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/edithall',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/edithall']>
    },

    /**
     * 接口名：删除放映厅
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062850
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/delhall': (req?: IModels['GET/admin/delhall']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/delhall',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/delhall']>
    },

    /**
     * 接口名：获取订单列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062853
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/getorders': (req?: IModels['GET/admin/getorders']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/getorders',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/getorders']>
    },

    /**
     * 接口名：获取用户列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062854
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/getusers': (req?: IModels['GET/admin/getusers']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/getusers',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/getusers']>
    },

    /**
     * 接口名：添加分店管理员
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062860
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/admin/addadmin': (req?: IModels['POST/admin/addadmin']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/addadmin',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/admin/addadmin']>
    },

    /**
     * 接口名：删除用户
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=288782&mod=471651&itf=2062861
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/admin/deluser': (req?: IModels['GET/admin/deluser']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/admin/deluser',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/admin/deluser']>
    },
  }
}
