# 高考倒计时 - Gaokao Countdown 🎓

> 为梦想加油，冲刺理想大学！

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen.svg)](https://pages.github.com/)

## 📱 在线访问

**[👉 点击此处访问在线版](https://你的用户名.github.io/高考倒计时/)**

（部署后替换为实际 URL）

## ✨ 功能特性

### 🎯 核心功能
- **⏱️ 高考倒计时** - 精确到秒的倒计时显示
- **📊 备考进度** - 可视化学习进度条
- **💡 励志语录** - 每日一句加油打气

### 📚 学习工具
- **⏱️ 学习计时器** - 记录学习时长
- **📝 任务管理** - 每日学习计划与打卡
- **📈 学习统计** - 今日/累计学习时长

### 🏆 成就系统
- 8 个成就徽章等你解锁
- 学习天数、任务完成、分享打卡等成就

### 🎨 设计特点
- 🌈 AI 风格配色 - 紫罗兰渐变主题
- ✨ 动态背景 - 浮动光斑 + 粒子效果
- 📱 响应式设计 - 手机/电脑完美适配
- 🎵 背景音乐 - 轻松学习氛围

## 🚀 部署到 GitHub Pages

### 方法一：自动部署（推荐）

1. **Fork 或创建新仓库**
   ```bash
   # 在 GitHub 创建新仓库后
   git init
   git add .
   git commit -m "Initial commit: 高考倒计时"
   git branch -M main
   git remote add origin https://github.com/你的用户名/高考倒计时.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - Folder 选择 `/ (root)`
   - 点击 Save

3. **等待部署**
   - 约 1-2 分钟后访问：`https://你的用户名.github.io/仓库名/`

### 方法二：使用 gh-pages 分支

```bash
# 创建 gh-pages 分支
git checkout --orphan gh-pages
git reset --hard
cp -r web-version/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
```

## 📂 项目结构

```
高考倒计时/
├── web-version/          # 网页版本（浏览器使用）
│   └── index.html       # 主页面（包含所有功能）
├── pages/               # 微信小程序页面
├── app.js               # 小程序主逻辑
├── app.json             # 小程序配置
└── README.md            # 项目说明
```

## 💻 本地开发

### 网页版
直接用浏览器打开 `web-version/index.html` 即可

### 微信小程序版
1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入项目目录
3. 填入 AppID 编译运行

## 🎯 使用场景

- 📱 **手机使用** - 扫码访问，随时随地查看倒计时
- 💻 **电脑使用** - 浏览器打开，学习时放在桌面
- 📤 **分享打卡** - 生成分享图，激励同学一起努力

## 🛠️ 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- Font Awesome 图标库
- QRCode.js 二维码生成
- html2canvas 截图分享
- LocalStorage 本地数据存储

## 📝 更新日志

### v1.0.0 (2026-03-09)
- ✨ 初始版本发布
- 🎨 AI 风格界面设计
- ⏱️ 倒计时 + 学习计时 + 任务管理
- 🏆 成就系统
- 📱 二维码分享

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**💪 乾坤未定，你我皆是黑马！加油！**
