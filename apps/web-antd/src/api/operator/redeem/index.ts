import type { RedeemForm, RedeemQuery, RedeemVO } from './model';

import type { PageResult } from '#/api/common';

import { requestClient } from '#/api/request';
/**
 * 查询兑换码列表
 * @param params
 * @returns 兑换码列表
 */
export function getRedeemListByPage(params?: RedeemQuery) {
  return requestClient.get<PageResult<RedeemVO>>('/redeem/code/list', {
    params,
  });
}

/**
 * 新增兑换码
 */
export function postRedeemAdd(data: RedeemForm) {
  // postWithMsg 可以自动弹出提示信息
  // return requestClient.postWithMsg<string>('/redeem/code/add', data);

  // 普通 post，不会自动弹提示
  return requestClient.post<string>('/redeem/code/add', data);
}

/**
 * 删除单个兑换码
 * @param code 要删除的兑换码
 * @returns 删除结果
 */
export function postDeleteRedeem(code: string) {
  return requestClient.post<{ code: number; data: null; msg: string }>(
    '/redeem/code/delete',
    { code },
  );
}

/**
 * 批量删除兑换码
 * @param codes 要删除的兑换码数组
 * @returns 删除结果
 */
export function postDeleteRedeemBatch(codes: string[]) {
  return requestClient.post<{ code: number; data: number; msg: string }>(
    '/redeem/code/deleteBatch',
    { codes },
  );
}
