# 🚀 部署到 GitHub Pages 指南

## 第一步：在 GitHub 创建仓库

1. 打开 https://github.com/new
2. 仓库名称：`gaokao-countdown` (或 `高考倒计时`)
3. 可见性：**Public** (公开)
4. **不要** 勾选 "Add a README file"
5. 点击 **Create repository**

## 第二步：推送代码到 GitHub

在终端执行以下命令（替换 `你的用户名` 为你的 GitHub 用户名）：

```bash
cd /Users/zmh/.openclaw/workspace/gaokao-countdown-miniprogram

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/gaokao-countdown.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 第三步：启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings** (设置)
3. 左侧菜单找到 **Pages**
4. **Source** 选择：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**

## 第四步：等待部署完成

- 等待约 1-2 分钟
- 页面顶部会显示部署状态
- 部署完成后会显示访问地址，格式：
  ```
  https://你的用户名.github.io/gaokao-countdown/
  ```

## 第五步：更新二维码

部署完成后，修改 `index.html` 中的二维码内容：

1. 找到 `showQrModal()` 函数
2. 将 `appInfo` 替换为你的 GitHub Pages URL：
   ```javascript
   const appInfo = 'https://你的用户名.github.io/gaokao-countdown/';
   ```
3. 重新提交推送：
   ```bash
   git add index.html
   git commit -m "📱 更新二维码为实际 URL"
   git push
   ```

## ✅ 完成！

现在你可以：
- 📱 用手机微信扫码访问
- 💻 在电脑浏览器打开
- 📤 分享二维码给同学

## 🔄 后续更新

修改代码后推送即可自动更新：

```bash
git add .
git commit -m "更新说明"
git push
```

GitHub Pages 会在 1-2 分钟内自动部署更新。

---

**💪 祝部署成功！高考加油！**
