// app.js
App({
  onLaunch() {
    // 初始化本地存储
    this.initStorage();
    
    // 检查是否首次使用
    const isFirstLaunch = !wx.getStorageSync('hasLaunched');
    if (isFirstLaunch) {
      wx.setStorageSync('hasLaunched', true);
      this.setDefaultGaokaoDate();
    }
  },

  // 初始化默认数据
  initStorage() {
    if (!wx.getStorageSync('tasks')) {
      wx.setStorageSync('tasks', []);
    }
    if (!wx.getStorageSync('studyRecords')) {
      wx.setStorageSync('studyRecords', []);
    }
  },

  // 设置默认高考日期（次年 6 月 7 日）
  setDefaultGaokaoDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // 如果已过 6 月 7 日，则设置为明年
    let gaokaoYear = currentYear;
    if (currentMonth > 5 || (currentMonth === 5 && now.getDate() > 7)) {
      gaokaoYear = currentYear + 1;
    }
    
    const gaokaoDate = `${gaokaoYear}-06-07`;
    wx.setStorageSync('gaokaoDate', gaokaoDate);
  },

  // 计算倒计时
  calculateDaysLeft(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  },

  // 获取励志语录
  getDailyQuote() {
    const quotes = [
      "乾坤未定，你我皆是黑马！",
      "星光不问赶路人，时光不负有心人。",
      "将来的你，一定会感谢现在拼命的自己。",
      "没有横空出世的运气，只有不为人知的努力。",
      "越努力，越幸运！",
      "坚持到底，永不放弃！",
      "今天流下的汗水，是明天成功的泪水。",
      "梦想不会发光，发光的是追梦的你。",
      "熬过最苦的日子，做最酷的自己。",
      "你只管努力，上天自有安排。"
    ];
    const dayOfYear = this.getDayOfYear();
    return quotes[dayOfYear % quotes.length];
  },

  // 获取一年中的第几天
  getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  },

  globalData: {
    userInfo: null,
    gaokaoDate: null
  }
});
