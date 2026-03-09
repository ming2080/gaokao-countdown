// pages/index/index.js
const app = getApp();

Page({
  data: {
    daysLeft: 0,
    gaokaoDate: '',
    displayDate: '',
    quote: '',
    hoursLeft: 0,
    minutesLeft: 0,
    secondsLeft: 0,
    progress: 0,
    yearProgress: 0
  },

  onLoad() {
    this.loadGaokaoDate();
    this.calculateCountdown();
    this.data.quote = app.getDailyQuote();
    
    // 启动定时器
    this.startTimer();
  },

  onShow() {
    // 每次显示页面时重新加载日期
    this.loadGaokaoDate();
    this.calculateCountdown();
  },

  onUnload() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  // 加载高考日期
  loadGaokaoDate() {
    let gaokaoDate = wx.getStorageSync('gaokaoDate');
    if (!gaokaoDate) {
      // 设置默认日期
      const now = new Date();
      const currentYear = now.getFullYear();
      gaokaoDate = `${currentYear + 1}-06-07`;
      wx.setStorageSync('gaokaoDate', gaokaoDate);
    }
    
    const date = new Date(gaokaoDate);
    this.setData({
      gaokaoDate: gaokaoDate,
      displayDate: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    });
  },

  // 计算倒计时
  calculateCountdown() {
    const gaokaoDate = new Date(this.data.gaokaoDate);
    const now = new Date();
    const diff = gaokaoDate - now;

    if (diff <= 0) {
      // 高考已到或已过
      this.setData({
        daysLeft: 0,
        hoursLeft: 0,
        minutesLeft: 0,
        secondsLeft: 0,
        progress: 100
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 计算年度进度（从 9 月 1 日到次年 6 月 7 日）
    const schoolYearStart = new Date(now.getFullYear(), 8, 1); // 9 月 1 日
    if (now.getMonth() < 8) {
      schoolYearStart.setFullYear(now.getFullYear() - 1);
    }
    const totalDays = Math.floor((gaokaoDate - schoolYearStart) / (1000 * 60 * 60 * 24));
    const passedDays = Math.floor((now - schoolYearStart) / (1000 * 60 * 60 * 24));
    const progress = Math.min(100, Math.floor((passedDays / totalDays) * 100));

    this.setData({
      daysLeft: days,
      hoursLeft: hours,
      minutesLeft: minutes,
      secondsLeft: seconds,
      progress: progress
    });
  },

  // 启动定时器
  startTimer() {
    this.timer = setInterval(() => {
      this.calculateCountdown();
    }, 1000);
  },

  // 修改高考日期
  onChangeDate() {
    const that = this;
    wx.showActionSheet({
      itemList: ['修改高考日期', '重置为默认日期'],
      success(res) {
        if (res.tapIndex === 0) {
          that.showDatePicker();
        } else if (res.tapIndex === 1) {
          app.setDefaultGaokaoDate();
          that.loadGaokaoDate();
          that.calculateCountdown();
          wx.showToast({
            title: '已重置',
            icon: 'success'
          });
        }
      }
    });
  },

  // 显示日期选择器
  showDatePicker() {
    const that = this;
    wx.showModal({
      title: '修改高考日期',
      editable: true,
      placeholderText: '请输入日期 (格式：2025-06-07)',
      success(res) {
        if (res.confirm && res.content) {
          // 验证日期格式
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (dateRegex.test(res.content)) {
            wx.setStorageSync('gaokaoDate', res.content);
            that.loadGaokaoDate();
            that.calculateCountdown();
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: '日期格式错误',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `距离高考还有${this.data.daysLeft}天！一起加油！`,
      path: '/pages/index/index',
      imageUrl: ''
    };
  }
});
