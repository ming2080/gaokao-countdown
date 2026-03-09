// pages/target/target.js
Page({
  data: {
    targetUniversity: '',
    targetScore: '',
    currentScore: '',
    scoreGap: 0,
    isEditing: false,
    universityOptions: [
      '清华大学', '北京大学', '复旦大学', '上海交通大学',
      '浙江大学', '南京大学', '中国科学技术大学', '中国人民大学',
      '同济大学', '武汉大学', '华中科技大学', '中山大学',
      '四川大学', '西安交通大学', '哈尔滨工业大学', '南开大学',
      '天津大学', '北京师范大学', '厦门大学', '东南大学'
    ]
  },

  onLoad() {
    this.loadTarget();
  },

  onShow() {
    this.loadTarget();
  },

  // 加载目标数据
  loadTarget() {
    const target = wx.getStorageSync('targetUniversity') || '';
    const targetScore = wx.getStorageSync('targetScore') || '';
    const currentScore = wx.getStorageSync('currentScore') || '';
    
    let scoreGap = 0;
    if (targetScore && currentScore) {
      scoreGap = parseInt(targetScore) - parseInt(currentScore);
    }

    this.setData({
      targetUniversity: target,
      targetScore: targetScore,
      currentScore: currentScore,
      scoreGap: scoreGap
    });
  },

  // 保存目标
  saveTarget() {
    if (!this.data.targetUniversity) {
      wx.showToast({
        title: '请输入目标大学',
        icon: 'none'
      });
      return;
    }

    wx.setStorageSync('targetUniversity', this.data.targetUniversity);
    if (this.data.targetScore) {
      wx.setStorageSync('targetScore', this.data.targetScore);
    }
    if (this.data.currentScore) {
      wx.setStorageSync('currentScore', this.data.currentScore);
    }

    this.setData({ isEditing: false });
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  },

  // 输入目标大学
  onUniversityInput(e) {
    this.setData({
      targetUniversity: e.detail.value
    });
  },

  // 输入目标分数
  onTargetScoreInput(e) {
    this.setData({
      targetScore: e.detail.value
    });
    this.calculateGap();
  },

  // 输入当前分数
  onCurrentScoreInput(e) {
    this.setData({
      currentScore: e.detail.value
    });
    this.calculateGap();
  },

  // 计算分差
  calculateGap() {
    const targetScore = parseInt(this.data.targetScore) || 0;
    const currentScore = parseInt(this.data.currentScore) || 0;
    this.setData({
      scoreGap: targetScore - currentScore
    });
  },

  // 选择大学
  selectUniversity() {
    const that = this;
    wx.showActionSheet({
      itemList: this.data.universityOptions,
      success(res) {
        that.setData({
          targetUniversity: that.data.universityOptions[res.tapIndex]
        });
      }
    });
  },

  // 开始编辑
  startEdit() {
    this.setData({ isEditing: true });
  },

  // 取消编辑
  cancelEdit() {
    this.loadTarget();
    this.setData({ isEditing: false });
  },

  // 删除目标
  clearTarget() {
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '确定要清空目标大学吗？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('targetUniversity');
          wx.removeStorageSync('targetScore');
          wx.removeStorageSync('currentScore');
          that.loadTarget();
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});
