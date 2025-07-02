// 后台脚本 - 处理定时器和通知
class ReminderManager {
  constructor() {
    this.alarmName = 'hourlyReminder';
    this.init();
  }

  async init() {
    // 监听插件安装
    chrome.runtime.onInstalled.addListener(() => {
      console.log('每小时提醒插件已安装');
      this.createAlarm();
    });

    // 插件启动时恢复定时器（电脑重启后）
    chrome.runtime.onStartup.addListener(() => {
      console.log('每小时提醒插件已启动');
      this.createAlarm();
    });

    // 插件初始化时也要检查并恢复定时器
    this.createAlarm();

    // 监听闹钟触发
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === this.alarmName) {
        this.showReminder();
      }
    });

    // 监听来自popup的消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggleReminder') {
        this.toggleReminder(request.enabled);
        sendResponse({ success: true });
      } else if (request.action === 'getStatus') {
        this.getStatus().then(status => sendResponse(status));
        return true; // 保持消息通道开放
      }
    });
  }

  // 创建每小时闹钟
  async createAlarm() {
    const settings = await this.getSettings();
    
    // 先清除现有的定时器，避免重复
    chrome.alarms.clear(this.alarmName);
    
    if (settings.enabled) {
      chrome.alarms.create(this.alarmName, {
        delayInMinutes: settings.intervalMinutes,
        periodInMinutes: settings.intervalMinutes
      });
      console.log(`已设置${settings.intervalMinutes}分钟提醒`);
    } else {
      console.log('提醒已禁用');
    }
  }

  // 显示提醒通知
  async showReminder() {
    const settings = await this.getSettings();
    
    // 创建通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: settings.title,
      message: settings.message,
      priority: 2
    });

    // 记录提醒次数
    const stats = await this.getStats();
    stats.totalReminders++;
    stats.lastReminderTime = new Date().toISOString();
    await chrome.storage.local.set({ reminderStats: stats });

    console.log(`第${stats.totalReminders}次提醒: ${settings.message}`);
  }

  // 切换提醒开关
  async toggleReminder(enabled) {
    const settings = await this.getSettings();
    settings.enabled = enabled;
    await chrome.storage.local.set({ reminderSettings: settings });

    if (enabled) {
      this.createAlarm();
    } else {
      chrome.alarms.clear(this.alarmName);
    }
  }

  // 获取设置
  async getSettings() {
    const result = await chrome.storage.local.get('reminderSettings');
    return result.reminderSettings || {
      enabled: true,
      intervalMinutes: 60, // 默认60分钟
      title: '健康提醒',
      message: '该休息一下了！记得喝水、活动身体，保护视力哦～'
    };
  }

  // 获取统计信息
  async getStats() {
    const result = await chrome.storage.local.get('reminderStats');
    return result.reminderStats || {
      totalReminders: 0,
      lastReminderTime: null,
      installTime: new Date().toISOString()
    };
  }

  // 获取当前状态
  async getStatus() {
    const settings = await this.getSettings();
    const stats = await this.getStats();
    const alarms = await chrome.alarms.getAll();
    const hasActiveAlarm = alarms.some(alarm => alarm.name === this.alarmName);

    return {
      enabled: settings.enabled,
      intervalMinutes: settings.intervalMinutes,
      title: settings.title,
      message: settings.message,
      totalReminders: stats.totalReminders,
      lastReminderTime: stats.lastReminderTime,
      hasActiveAlarm
    };
  }
}

// 初始化提醒管理器
new ReminderManager();
