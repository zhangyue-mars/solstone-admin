<script setup lang="ts">

import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import type { RedeemForm } from '#/api/operator/redeem/model';

import { Page } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { message, Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';

import {
  getRedeemListByPage,
  postDeleteRedeemBatch,
  postDeleteRedeem,
} from '#/api/operator/redeem';

import { columns, querySchema } from './data';

import { ref } from 'vue';
import RedeemAddModal from './RedeemAddModal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  // 启用表格右上角的刷新按钮
  toolbarConfig: {
    refresh: true,
    zoom: true,
    custom: true,
    export: true,
  },
  exportConfig: {
    filename: '兑换码列表',
    sheetName: 'Sheet1',
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        console.log('表格查询被调用，参数:', { page, formValues });
        try {
          const result = await getRedeemListByPage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
          console.log('API返回结果:', result);

          // 转换数据格式以匹配PageResult接口
          console.log('原始API返回结果:', result);

          // 使用类型断言处理数据结构
          const apiResult = result as any;
          console.log('result.data:', apiResult.data);
          console.log('result.data.records:', apiResult.data?.records);

          // 检查数据结构并安全转换
          if (apiResult && apiResult.data && apiResult.data.records) {
            return {
              rows: apiResult.data.records,
              total: apiResult.data.total || 0,
              pageNum: apiResult.data.current || 1,
              pageSize: apiResult.data.size || 10,
            };
          } else if (apiResult && apiResult.records) {
            // 如果数据直接在result.records中
            return {
              rows: apiResult.records,
              total: apiResult.total || 0,
              pageNum: apiResult.current || 1,
              pageSize: apiResult.size || 10,
            };
          } else {
            // 如果数据结构不匹配，返回空结果
            console.warn('API返回的数据结构不匹配预期格式:', apiResult);
            return {
              rows: [],
              total: 0,
              pageNum: 1,
              pageSize: 10,
            };
          }
        } catch (error) {
          console.error('API调用失败:', error);
          throw error;
        }
      },
    },
    // 自动加载数据
    autoLoad: true,
  },
  rowConfig: {
    keyField: 'id',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'operator-redeem-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

// 调试信息
console.log('BasicTable:', BasicTable);
console.log('tableApi:', tableApi);

// 表格右上角的刷新按钮会自动处理数据加载
// 由于启用了 autoLoad: true，数据会在组件挂载后自动加载
async function handleDelete(row: Required<RedeemForm>) {
  try {
    const res = await postDeleteRedeem(row.code);

    // 如果返回 null，说明删除成功
    if (res === null) {
      message.success('删除成功');
      await tableApi.query();
      return;
    }

    // 如果是对象，且有 code 字段
    if (typeof res === 'object' && res.code === 200) {
      message.success(res.msg || '删除成功');
      await tableApi.query();
    } else {
      message.error((res as any)?.msg || '删除失败');
    }
  } catch (error) {
    console.error('删除失败:', error);
    message.error('删除失败');
  }
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const codes = rows.map((row: Required<RedeemForm>) => row.code);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${codes.length}条记录吗？`,
    onOk: async () => {
      try {
        const res = await postDeleteRedeemBatch(codes);
        if (typeof res === 'number') {
          message.success(`成功删除 ${res} 条`);
          await tableApi.query();
        } else if (res && res.code === 200) {
          message.success(res.msg || `成功删除${res.data}条`);
          await tableApi.query();
        } else {
          message.error('批量删除失败');
        }
      } catch (error) {
        console.error('批量删除失败:', error);
        message.error('批量删除失败');
      }
    },
  });
}

const showAddModal = ref(false);

function handleAdd() {
  showAddModal.value = true;
}

function handleAddSuccess(newCode: string) {
  console.log('新增兑换码成功，返回的code:', newCode);
  tableApi.query(); // 刷新表格
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="兑换码列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['operator:redeem:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['operator:redeem:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['operator:redeem:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <RedeemAddModal
      v-model:visible="showAddModal"
      @success="handleAddSuccess"
    />
  </Page>
</template>
