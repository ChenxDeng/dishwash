# 洗碗记录 Web App (MVP) 实施计划

> **对于 Trae:** 请使用 `executing-plans` 技能分阶段执行此计划。

**目标:** 为情侣创建一个可以记录谁洗碗的 Web App，并带有抛硬币决策工具。

**架构:** 使用 Next.js App Router 作为前端框架，Supabase 提供 Auth 和实时数据库同步。UI 采用响应式设计，以日历为核心，辅以侧边栏记录。

**技术栈:** Next.js, Tailwind CSS, Supabase, Framer Motion, Lucide React (图标)。

---

### 任务 1: 项目初始化与基础布局

**文件:**
- 创建: `src/app/layout.tsx`
- 创建: `src/app/page.tsx`
- 创建: `src/components/Calendar.tsx`
- 创建: `src/components/CoinFlip.tsx`

**步骤 1: 初始化 Next.js 项目**
运行: `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --skip-install`

**步骤 2: 安装必要的依赖**
运行: `npm install @supabase/supabase-js framer-motion lucide-react date-fns`

**步骤 3: 编写基本的日历组件框架**
- 实现: `src/components/Calendar.tsx`

---

### 任务 2: Supabase 集成与数据模型

**文件:**
- 创建: `src/lib/supabase.ts`

**步骤 1: 定义数据库 Schema**
在 Supabase 中创建 `dish_records` 表。

**步骤 2: 配置 Supabase 客户端**
创建 `src/lib/supabase.ts`。

---

### 任务 3: 记录功能 (Meal Record Drawer)

**文件:**
- 创建: `src/components/MealDrawer.tsx`

**步骤 1: 实现点击日期弹出抽屉**
**步骤 2: 记录 CRUD 逻辑**

---

### 任务 4: 抛硬币工具 (Coin Flip)

**文件:**
- 创建: `src/components/CoinFlip.tsx`

**步骤 1: 实现抛硬币动画**

---

### 任务 5: 共享账号登录

**文件:**
- 创建: `src/app/login/page.tsx`

**步骤 1: 实现简单的邮箱/密码登录**
