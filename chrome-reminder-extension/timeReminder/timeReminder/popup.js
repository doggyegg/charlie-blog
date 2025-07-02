// 弹窗页面脚本
class PopupManager {
  constructor() {
    this.elements = {
      enableToggle: document.getElementById('enableToggle'),
      intervalInput: document.getElementById('intervalInput'),
      titleInput: document.getElementById('titleInput'),
      messageInput: document.getElementById('messageInput'),
      saveBtn: document.getElementById('saveBtn'),
      statusIndicator: document.getElementById('statusIndicator'),
      totalReminders: document.getElementById('totalReminders'),
      lastReminder: document.getElementById('lastReminder'),
      alarmStatus: document.getElementById('alarmStatus')
    };

    this.init();
  }

  async init() {
    // 加载当前状态
    await this.loadStatus();
    
    // 绑定事件
    this.bindEvents();
  }

  bindEvents() {
    // 开关切换
    this.elements.enableToggle.addEventListener('change', (e) => {
      this.toggleReminder(e.target.checked);
    });

    // 保存设置
    this.elements.saveBtn.addEventListener('click', () => {
      this.saveSettings();
    });

    // 输入框变化时启用保存按钮
    [this.elements.intervalInput, this.elements.titleInput, this.elements.messageInput].forEach(input => {
      input.addEventListener('input', () => {
        this.elements.saveBtn.disabled = false;
        this.elements.saveBtn.textContent = '保存设置';
      });
    });
  }

  async loadStatus() {
    try {
      const status = await this.sendMessage({ action: 'getStatus' });
      
      // 更新UI
      this.elements.enableToggle.checked = status.enabled;
      this.elements.intervalInput.value = status.intervalMinutes;
      this.elements.titleInput.value = status.title;
      this.elements.messageInput.value = status.message;
      
      // 更新状态指示器
      this.updateStatusIndicator(status.enabled);
      
      // 更新统计信息
      this.elements.totalReminders.textContent = status.totalReminders;
      this.elements.lastReminder.textContent = status.lastReminderTime 
        ? this.formatTime(status.lastReminderTime) 
        : '从未';
      this.elements.alarmStatus.textContent = status.hasActiveAlarm ? '运行中' : '已停止';
      
    } catch (error) {
      console.error('加载状态失败:', error);
      this.showError('加载设置失败');
    }
  }

  async toggleReminder(enabled) {
    try {
      await this.sendMessage({ action: 'toggleReminder', enabled });
      this.updateStatusIndicator(enabled);
      
      // 重新加载状态以更新定时器状态
      setTimeout(() => this.loadStatus(), 100);
      
    } catch (error) {
      console.error('切换提醒失败:', error);
      this.showError('操作失败');
      // 恢复开关状态
      this.elements.enableToggle.checked = !enabled;
    }
  }

  async saveSettings() {
    const settings = {
      enabled: this.elements.enableToggle.checked,
      intervalMinutes: parseInt(this.elements.intervalInput.value),
      title: this.elements.titleInput.value.trim(),
      message: this.elements.messageInput.value.trim()
    };

    // 验证输入
    if (settings.intervalMinutes < 1 || settings.intervalMinutes > 1440) {
      this.showError('间隔时间必须在1-1440分钟之间');
      return;
    }

    if (!settings.title) {
      this.showError('请输入提醒标题');
      return;
    }

    if (!settings.message) {
      this.showError('请输入提醒内容');
      return;
    }

    try {
      this.elements.saveBtn.disabled = true;
      this.elements.saveBtn.textContent = '保存中...';

      // 保存到存储
      await chrome.storage.local.set({ reminderSettings: settings });
      
      // 如果启用了提醒，重新创建定时器
      if (settings.enabled) {
        await this.sendMessage({ action: 'toggleReminder', enabled: true });
      }

      this.elements.saveBtn.textContent = '已保存';
      setTimeout(() => {
        this.elements.saveBtn.textContent = '保存设置';
        this.elements.saveBtn.disabled = false;
      }, 1000);

      // 重新加载状态
      setTimeout(() => this.loadStatus(), 100);

    } catch (error) {
      console.error('保存设置失败:', error);
      this.showError('保存失败');
      this.elements.saveBtn.disabled = false;
      this.elements.saveBtn.textContent = '保存设置';
    }
  }

  updateStatusIndicator(enabled) {
    this.elements.statusIndicator.className = enabled 
      ? 'status-indicator status-active' 
      : 'status-indicator status-inactive';
  }

  formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}小时前`;
    return `${Math.floor(diffMins / 1440)}天前`;
  }



  showError(message) {
    // 简单的错误提示
    const originalText = this.elements.saveBtn.textContent;
    this.elements.saveBtn.textContent = message;
    this.elements.saveBtn.style.background = 'rgba(244, 67, 54, 0.3)';
    
    setTimeout(() => {
      this.elements.saveBtn.textContent = originalText;
      this.elements.saveBtn.style.background = '';
    }, 2000);
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});
