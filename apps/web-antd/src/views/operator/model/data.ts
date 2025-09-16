import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { h } from 'vue';
import { Tag } from 'ant-design-vue';

import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'modelName',
    label: '模型名称',
  },
  {
    component: 'RangePicker',
    fieldName: 'createTime',
    label: '创建时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },

  {
    title: '模型分类',
    field: 'category',
    slots: {
      default: ({ row }) => {
        return renderDict(row.category, DictEnum.CHAT_MODEL_CATEGORY);
      },
    },
  },
  {
    title: '模型名称',
    field: 'modelName',
  },
  {
    title: '模型描述',
    field: 'modelDescribe',
  },
  {
    title: '模型价格',
    field: 'modelPrice',
  },
  {
    title: '模型优先级',
    field: 'priority',
    width: 120,
    slots: {
      default: ({ row }) => {
        return row.priority || 1;
      },
    },
  },
  {
    title: '计费类型',
    field: 'modelType',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.modelType, DictEnum.SYS_MODEL_BILLING);
      },
    },
  },
  {
    title: '是否显示',
    field: 'modelShow',
    width: 120,
    slots: {
      default: ({ row }) => {
        return renderDict(row.modelShow, DictEnum.SYS_SHOW_HIDE);
      },
    },
  },
  {
    title: '深度思考',
    field: 'isDeepThinking',
    slots: {
      default: ({ row }) => {
        console.log('row.isDeepThinking', row.isDeepThinking);
        const isShow = row.isDeepThinking === 1;
        return h(
          Tag,
          {
            color: isShow ? 'green' : 'red',
          },
          isShow ? '能' : '否',
        );
      },
    },
  },
  {
    title: '系统提示词',
    field: 'useSystemPrompt',
    slots: {
      default: ({ row }) => {
        const isShow = row.useSystemPrompt === 1;
        return h(
          Tag,
          {
            color: isShow ? 'green' : 'red',
          },
          isShow ? '是' : '否',
        );
      },
    },
  },
  {
    title: '请求地址',
    field: 'apiHost',
  },

  {
    title: '密钥',
    field: 'apiKey',
    width: '300px',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];
