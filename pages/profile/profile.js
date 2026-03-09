// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    nickname: '高考学子',
    avatar: '',
    studyDays: 0,
    totalTasks: 0,
    completedTasks: 0,
    targetUniversity: '',
    version: '1.0.0',
    studyRecords: []
  },

  onLoad() {
    this.loadProfile();
  },

  onShow() {
    this.loadProfile();
  },

  // 加载个人资料
  loadProfile() {
    const nickname = wx.getStorageSync('nickname') || '高考学子';
    const studyRecords = wx.getStorageSync('studyRecords') || [];
    const tasks = wx.getStorageSync('tasks') || [];
    const targetUniversity = wx.getStorageSync('targetUniversity') || '';

    // 计算学习天数
    const uniqueDays = [...new Set(studyRecords.map(r => r.date))];
    
    // 计算任务统计
    const completedTasks = tasks.filter(t => t.completed).length;

    this.setData({
      nickname: nickname,
      studyDays: uniqueDays.length,
      totalTasks: tasks.length,
      completedTasks: completedTasks,
      targetUniversity: targetUniversity,
      studyRecords: studyRecords
    });
  },

  // 设置昵称
  setNickname() {
    const that = this;
    wx.showModal({
      title: '设置昵称',
      editable: true,
      placeholderText: '请输入昵称',
      success(res) {
        if (res.confirm && res.content) {
          wx.setStorageSync('nickname', res.content);
          that.setData({ nickname: res.content });
          wx.showToast({
            title: '设置成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 清除所有数据
  clearAllData() {
    const that = this;
    wx.showModal({
      title: '警告',
      content: '确定要清除所有数据吗？此操作不可恢复！',
      confirmText: '清除',
      confirmColor: '#FF6B6B',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          app.initStorage();
          app.setDefaultGaokaoDate();
          that.loadProfile();
          wx.showToast({
            title: '已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享小程序
  shareApp() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 关于
  showAbout() {
    wx.showModal({
      title: '关于高考倒计时',
      content: '版本：v' + this.data.version + '\n\n专为高考学子打造的倒计时工具，助你金榜题名！',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 反馈
  sendFeedback() {
    wx.showModal({
      title: '意见反馈',
      editable: true,
      placeholderText: '请输入您的建议或问题',
      success(res) {
        if (res.confirm && res.content) {
          // 这里可以接入实际的反馈接口
          wx.showToast({
            title: '感谢反馈',
            icon: 'success'
          });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '距离高考还有' + app.calculateDaysLeft(wx.getStorageSync('gaokaoDate') || '') + '天！一起加油！',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: '高考倒计时',
      query: ''
    };
  }
});
