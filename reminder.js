const { exec } = require('child_process');
const path = require('path');

// 配置选项
const CONFIG = {
    // 提醒间隔（毫秒）- 1小时 = 60 * 60 * 1000
    interval: 1 * 60 * 1000,
    // 提醒消息
    title: '定时提醒',
    message: '该休息一下了！记得保护眼睛，适当活动身体。',
    // 是否显示控制台日志
    showLog: true
};

/**
 * 显示Windows通知
 * @param {string} title 通知标题
 * @param {string} message 通知内容
 */
function showWindowsNotification(title, message) {
    // 方法1: 使用Windows Toast通知
    const toastScript = `
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        [Windows.UI.Notifications.ToastNotification, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
        
        $template = @"
<toast>
    <visual>
        <binding template="ToastGeneric">
            <text>${title}</text>
            <text>${message}</text>
        </binding>
    </visual>
</toast>
"@
        
        $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
        $xml.LoadXml($template)
        $toast = New-Object Windows.UI.Notifications.ToastNotification $xml
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("定时提醒").Show($toast)
    `;
    
    exec(`powershell -Command "${toastScript}"`, (error, stdout, stderr) => {
        if (error) {
            // 如果Toast失败，尝试传统气泡通知
            const balloonScript = `
                Add-Type -AssemblyName System.Windows.Forms
                $notification = New-Object System.Windows.Forms.NotifyIcon
                $notification.Icon = [System.Drawing.SystemIcons]::Information
                $notification.BalloonTipTitle = "${title}"
                $notification.BalloonTipText = "${message}"
                $notification.Visible = $true
                $notification.ShowBalloonTip(5000)
                Start-Sleep -Seconds 6
                $notification.Dispose()
            `;
            
            exec(`powershell -Command "${balloonScript}"`, (error2) => {
                if (error2 && CONFIG.showLog) {
                    console.log('❌ 通知显示失败:', error2.message);
                    console.log('💡 请检查Windows通知设置是否允许显示通知');
                }
            });
        } else if (CONFIG.showLog) {
            console.log('✅ 通知已显示');
        }
    });
}

/**
 * 播放系统提示音
 */
function playSystemSound() {
    // 播放Windows系统提示音
    exec('powershell -c "[console]::beep(800,300)"', (error) => {
        if (error && CONFIG.showLog) {
            console.log('提示音播放失败:', error.message);
        }
    });
}

/**
 * 获取当前时间字符串
 */
function getCurrentTime() {
    return new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

/**
 * 执行提醒
 */
function executeReminder() {
    const currentTime = getCurrentTime();
    
    if (CONFIG.showLog) {
        console.log(`\n⏰ [${currentTime}] 定时提醒触发`);
        console.log(`📢 ${CONFIG.message}`);
        console.log('=' .repeat(50));
    }
    
    // 显示通知
    showWindowsNotification(CONFIG.title, CONFIG.message);
    
    // 播放提示音
    playSystemSound();
}

/**
 * 启动定时器
 */
function startReminder() {
    console.log('🚀 定时提醒脚本已启动');
    console.log(`⏱️  提醒间隔: ${CONFIG.interval / (60 * 1000)} 分钟`);
    console.log(`📝 提醒内容: ${CONFIG.message}`);
    console.log(`🕐 当前时间: ${getCurrentTime()}`);
    console.log(`🔔 下次提醒: ${new Date(Date.now() + CONFIG.interval).toLocaleString('zh-CN')}`);
    console.log('=' .repeat(50));
    console.log('按 Ctrl+C 停止程序\n');
    
    // 立即执行一次（可选）
    executeReminder();
    
    // 设置定时器
    const timer = setInterval(() => {
        executeReminder();
    }, CONFIG.interval);
    
    // 优雅退出处理
    process.on('SIGINT', () => {
        console.log('\n\n🛑 正在停止定时提醒...');
        clearInterval(timer);
        console.log('✅ 定时提醒已停止，再见！');
        process.exit(0);
    });
    
    // 防止程序意外退出
    process.on('uncaughtException', (error) => {
        console.error('❌ 程序发生错误:', error.message);
        console.log('🔄 程序将继续运行...');
    });
}

// 如果直接运行此文件，则启动提醒
if (require.main === module) {
    startReminder();
}

// 导出函数供其他模块使用
module.exports = {
    startReminder,
    executeReminder,
    showWindowsNotification,
    CONFIG
};