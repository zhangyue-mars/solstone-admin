<script setup lang="ts">
import { ref } from 'vue';

import { useUserStore } from '@vben/stores'; // vben v5 官方 stores

import { Form, InputNumber, message, Modal } from 'ant-design-vue';

import { postRedeemAdd } from '#/api/operator/redeem';

interface Props {
  visible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:visible', 'success']);

const formRef = ref();
const userStore = useUserStore(); // 获取全局用户信息

const formState = ref({
  amount: null as number | null,
  createBy: userStore.userInfo?.realName || '', // 自动填充当前用户名
});

const loading = ref(false);

async function handleOk() {
  try {
    await formRef.value.validate();
    loading.value = true;

    console.log('提交的表单数据:', formState.value);
    const res = await postRedeemAdd(formState.value);

    // const res = await requestClient.post('/redeem/code/add', formState.value);
    const newCode = res; // 接口直接返回兑换码字符串

    message.success(`生成成功: ${newCode}`);

    emit('success', newCode); // 触发父组件回调，刷新列表

    // emit('update:visible', false); // 关闭弹窗
    // formState.value.amount = null; // 重置输入
  } catch (error) {
    console.error('添加兑换码失败:', error);
    message.error('生成兑换码失败');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Modal
    :open="props.visible"
    title="新建兑换码"
    :confirm-loading="loading"
    @ok="handleOk"
    @cancel="() => emit('update:visible', false)"
  >
    <Form
      ref="formRef"
      :model="formState"
      :rules="{ amount: [{ required: true, message: '请输入Tokens数量' }] }"
      layout="vertical"
    >
      <Form.Item label="Tokens数量（单位：百万）" name="amount">
        <InputNumber
          v-model:value="formState.amount"
          :min="1"
          style="width: 100%"
        />
      </Form.Item>
    </Form>
  </Modal>
</template>
