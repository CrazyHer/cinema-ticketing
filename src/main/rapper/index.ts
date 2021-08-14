/* md5: a73847cd69d3b7f08318b48ac9ecd39e */
/* Rap仓库id: 288782 */
/* Rapper版本: 1.2.2 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=288782
 */

import { createFetch, IModels } from './request';
import * as commonLib from 'rap/runtime/commonLib';

const { defaultFetch } = commonLib;
let fetch = createFetch({}, { fetchType: commonLib.FetchType.BASE });

export const overrideFetch = (fetchConfig: commonLib.RequesterOption) => {
  fetch = createFetch(fetchConfig, { fetchType: commonLib.FetchType.AUTO });
};
export { fetch, createFetch, defaultFetch };
export type Models = IModels;
