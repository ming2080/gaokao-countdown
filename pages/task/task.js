// pages/task/task.js
Page({
  data: {
    tasks: [],
    newTask: '',
    selectedSubject: '全部',
    subjects: ['全部', '语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
    filterTasks: [],
    todayCompleted: 0,
    todayTotal: 0
  },

  onLoad() {
    this.loadTasks();
  },

  onShow() {
    this.loadTasks();
  },

  // 加载任务
  loadTasks() {
    let tasks = wx.getStorageSync('tasks') || [];
    
    // 检查并更新任务状态（过期的未完成）
    const today = this.getTodayString();
    tasks = tasks.map(task => {
      if (task.dueDate && task.dueDate < today && !task.completed) {
        return { ...task, overdue: true };
      }
      return task;
    });

    // 计算今日统计
    const todayTasks = tasks.filter(t => t.date === today);
    const completed = todayTasks.filter(t => t.completed).length;

    this.setData({
      tasks: tasks,
      filterTasks: tasks,
      todayCompleted: completed,
      todayTotal: todayTasks.length
    });
  },

  // 获取今日日期字符串
  getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },

  // 添加任务
  addTask() {
    if (!this.data.newTask.trim()) {
      wx.showToast({
        title: '请输入任务内容',
        icon: 'none'
      });
      return;
    }

    const tasks = this.data.tasks;
    const newTask = {
      id: Date.now(),
      content: this.data.newTask.trim(),
      subject: this.data.selectedSubject === '全部' ? '其他' : this.data.selectedSubject,
      completed: false,
      createdAt: this.getTodayString(),
      completedAt: null
    };

    tasks.unshift(newTask);
    wx.setStorageSync('tasks', tasks);

    this.setData({
      tasks: tasks,
      newTask: '',
      selectedSubject: '全部'
    });

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  },

  // 切换任务完成状态
  toggleTask(e) {
    const taskId = e.currentTarget.dataset.id;
    const tasks = this.data.tasks;
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? this.getTodayString() : null;

      wx.setStorageSync('tasks', tasks);
      this.loadTasks();
    }
  },

  // 删除任务
  deleteTask(e) {
    const taskId = e.currentTarget.dataset.id;
    const that = this;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个任务吗？',
      success(res) {
        if (res.confirm) {
          const tasks = that.data.tasks.filter(t => t.id !== taskId);
          wx.setStorageSync('tasks', tasks);
          that.loadTasks();
          wx.showToast({
            title: '已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 输入任务内容
  onTaskInput(e) {
    this.setData({
      newTask: e.detail.value
    });
  },

  // 选择科目
  selectSubject(e) {
    this.setData({
      selectedSubject: e.detail.value
    });
  },

  // 筛选科目
  filterBySubject(e) {
    const subject = e.currentTarget.dataset.subject;
    this.setData({
      selectedSubject: subject
    });

    if (subject === '全部') {
      this.setData({
        filterTasks: this.data.tasks
      });
    } else {
      const filtered = this.data.tasks.filter(t => t.subject === subject);
      this.setData({
        filterTasks: filtered
      });
    }
  },

  // 清空已完成
  clearCompleted() {
    const that = this;
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有已完成的任务吗？',
      success(res) {
        if (res.confirm) {
          const tasks = that.data.tasks.filter(t => !t.completed);
          wx.setStorageSync('tasks', tasks);
          that.loadTasks();
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  },

  // 统计完成率
  getCompletionRate() {
    if (this.data.todayTotal === 0) return 0;
    return Math.floor((this.data.todayCompleted / this.data.todayTotal) * 100);
  }
});
