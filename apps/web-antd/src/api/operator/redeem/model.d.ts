import type { BaseEntity, PageQuery } from '#/api/common';

export interface RedeemVO {
  /**
   * 主键
   */
  id: number | string;

  /**
   * 兑换码
   */
  code: string;

  /**
   * 卡号
   */
  cardNo: string;

  /**
   * 金额
   */
  amount: string;

  /**
   * 是否已兑换
   */
  isRedeemed: number;

  /**
   * 兑换用户ID
   */
  redeemedUserId: string | null;

  /**
   * 兑换时间
   */
  redeemedTime: string | null;

  /**
   * 备注
   */
  remark: string | null;

  /**
   * 创建者
   */
  createBy: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新者
   */
  updateBy: string;

  /**
   * 更新时间
   */
  updateTime: string;

  /**
   * 删除标志
   */
  delFlag: string;

  /**
   * 租户ID
   */
  tenantId: string;
}

export interface RedeemForm extends BaseEntity {
  /**
   * 主键
   */
  id?: number | string;

  /**
   * 兑换码
   */
  code?: string;

  /**
   * 卡号
   */
  cardNo?: string;

  /**
   * 金额
   */
  amount?: string;

  /**
   * 是否已兑换
   */
  isRedeemed?: number;

  /**
   * 兑换用户ID
   */
  redeemedUserId?: string | null;

  /**
   * 兑换时间
   */
  redeemedTime?: string | null;

  /**
   * 备注
   */
  remark?: string | null;
}

export interface RedeemQuery extends PageQuery {
  /**
   * 兑换码
   */
  code?: string;

  /**
   * 卡号
   */
  cardNo?: string;

  /**
   * 是否已兑换
   */
  isRedeemed?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
