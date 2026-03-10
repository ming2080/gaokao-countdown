# 📋 手动创建仓库步骤

由于需要 GitHub 认证，请手动创建仓库：

## 第一步：创建仓库

1. 打开链接：**https://github.com/new**
2. 填写以下信息：
   - **Repository name**: `gaokao-countdown`
   - **Description**: `高考倒计时 - 为梦想加油 🎓`
   - **Public**: ✅ 选中
   - **Add a README file**: ❌ 不要选中
   - **Add .gitignore**: ❌ 不要选中
   - **Choose a license**: ❌ 不要选中
3. 点击 **Create repository**

## 第二步：推送代码

仓库创建后，回到终端执行：

```bash
cd /Users/zmh/.openclaw/workspace/gaokao-countdown-miniprogram

# 确认远程地址
git remote -v

# 推送代码
git push -u origin main
```

## 第三步：启用 GitHub Pages

1. 进入你的仓库页面：https://github.com/Mingda/gaokao-countdown
2. 点击 **Settings** (设置标签)
3. 左侧找到 **Pages**
4. **Build and deployment**:
   - Source: Deploy from a branch
   - Branch: 选择 `main` + `/ (root)`
5. 点击 **Save**

## 第四步：等待部署

等待 1-2 分钟，页面会显示：
```
Your site is live at https://Mingda.github.io/gaokao-countdown/
```

---

**创建完仓库后告诉我，我帮你更新二维码！** 🚀
