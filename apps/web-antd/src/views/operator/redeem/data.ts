import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'isRedeemed',
    label: '是否兑换',
    componentProps: {
      options: [
        { label: '未兑换', value: 0 },
        { label: '已兑换', value: 1 },
      ],
      allowClear: true,
    },
  },
  { component: 'Input', fieldName: 'code', label: '兑换码' },
  { component: 'Input', fieldName: 'cardNo', label: '卡号' },
  {
    component: 'InputNumber',
    fieldName: 'minAmount',
    label: '最小金额',
    componentProps: {
      placeholder: '请输入最小金额',
      min: 0,
      style: { width: '100%' },
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'maxAmount',
    label: '最大金额',
    componentProps: {
      placeholder: '请输入最大金额',
      min: 0,
      style: { width: '100%' },
    },
  },
];


export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  { title: '兑换码', field: 'code', width: 180 },
  { title: '卡号', field: 'cardNo' },
  { title: '金额', field: 'amount' },

  {
    title: '是否兑换',
    field: 'isRedeemed',
    align: 'center',
    slots: {
      default: ({ row }) => {
        return row.isRedeemed === 1
          ? h(Tag, { color: 'red' }, () => '已兑换')
          : h(Tag, { color: 'green' }, () => '未兑换');
      },
    },
  },

  { title: '兑换用户ID', field: 'redeemedUserId', width: 180 },
  { title: '兑换时间', field: 'redeemedTime' },
  { title: '创建时间', field: 'createTime' },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
