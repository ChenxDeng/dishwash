# 洗碗记录器 (Dish Washer Tracker)

这是一个使用 Next.js 和 Supabase 开发的洗碗记录应用。

## 🚀 本地启动指南

由于 Trae 的沙盒环境没有 Node.js，你需要**在你的 Mac 本地终端**执行以下操作：

### 1. 安装 Node.js
如果你的电脑没有 `npm`，请先安装 Node.js：
- 推荐使用 [Homebrew](https://brew.sh/): `brew install node`
- 或者直接从 [官网下载](https://nodejs.org/)。

### 2. 安装依赖
在项目根目录运行：
```bash
npm install
```

### 3. 配置环境变量
在根目录创建一个 `.env.local` 文件，填入你的 Supabase 信息（参考 `.env.local.example`）：
```bash
NEXT_PUBLIC_SUPABASE_URL=你的URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Key
```

### 4. 运行开发服务器
```bash
npm run dev
```
之后访问 [http://localhost:3000](http://localhost:3000)。

## 🛠 技术栈
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion
- **Backend**: Supabase (Auth & Database)
- **Icons**: Lucide React
