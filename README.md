# 太阳石矿山大模型AI管理系统 (Solstone AI Admin)

> [English Documentation](./README_EN.md) | 中文文档

基于 Vben Admin 框架构建的现代化后台管理系统，集成了完整的权限管理、系统监控等企业级功能模块。

## ✨ 项目特性

- 🎯 **现代化架构**：基于 Vue 3 + TypeScript + Vite 构建
- 🛠️ **丰富组件**：集成 Ant Design Vue 组件库
- 🔐 **权限管理**：完整的 RBAC 权限控制体系
- 📊 **系统监控**：实时监控系统运行状态
- 📱 **响应式设计**：完美适配各种设备屏幕

## 🚀 技术栈

### 前端技术

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具
- **Ant Design Vue** - 企业级 UI 组件库
- **Pinia** - Vue 状态管理
- **Vue Router** - 官方路由管理器

### 开发工具

- **pnpm** - 快速、节省磁盘空间的包管理器
- **Turbo** - 高性能构建系统
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks 工具

## 📋 环境要求

- **Node.js** >= 20.10.0
- **pnpm** >= 9.12.0

## 🛠️ 快速开始

### 1. 克隆项目

```bash
git clone https://gitee.com/ageerle/ruoyi-admin
cd ruoyi-admin
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run dev:antd
```

### 4. 构建生产版本

```bash
pnpm run build:antd
```

## 📝 注意事项

1. **Node.js 版本**：请确保使用 Node.js 20.10.0 或更高版本
2. **包管理器**：项目使用 pnpm，请勿使用 npm 或 yarn
3. **开发环境**：推荐使用 VS Code 并安装相关插件
4. **浏览器支持**：支持现代浏览器，不支持 IE

## 📚 项目结构

```
ruoyi-admin/
├── apps/                    # 应用目录
│   ├── web-antd/           # Ant Design Vue 版本
├── packages/               # 共享包
│   ├── @core/             # 核心包
│   ├── constants/         # 常量定义
│   ├── effects/           # 副作用处理
│   ├── icons/             # 图标库
│   ├── locales/           # 国际化
│   ├── preferences/       # 偏好设置
│   ├── stores/            # 状态管理
│   ├── styles/            # 样式文件
│   ├── types/             # 类型定义
│   └── utils/             # 工具函数
├── internal/              # 内部工具
└── scripts/               # 构建脚本
```

## 🤝 代码提交

代码上传到gitlab步骤。

```
git status
git add .
git commit -m "修复 LogoSvg 显示错误，使用 img 标签"
git push origin main
```

## 📄 提交类型

| 类型               | 描述                                           |
| ------------------ | ---------------------------------------------- |
| **feat**     | 新功能（feature）                              |
| **fix**      | 修复 bug                                       |
| **docs**     | 文档更新                                       |
| **style**    | 代码格式修改（空格、缩进、分号等，不影响功能） |
| **refactor** | 代码重构（既不是新功能也不是 bug 修复）        |
| **perf**     | 性能优化                                       |
| **test**     | 测试相关（新增、修改、删除测试）               |
| **chore**    | 构建过程或辅助工具变动（如更新依赖、脚本修改） |
| **revert**   | 回滚某个提交                                   |

## 👨‍💻 作者

- **煤炭科学研究总院有限公司-矿山人工智能研究院**
