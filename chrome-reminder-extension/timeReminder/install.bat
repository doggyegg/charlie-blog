@echo off
chcp 65001 >nul
echo.
echo ==========================================
echo    每小时提醒 Chrome 插件安装助手
echo ==========================================
echo.

echo 正在检查文件...
if not exist "manifest.json" (
    echo ❌ 错误：找不到 manifest.json 文件
    echo 请确保在插件目录中运行此脚本
    pause
    exit /b 1
)

echo ✅ 文件检查完成
echo.

echo 📋 安装步骤：
echo.
echo 1. 打开 Chrome 浏览器
echo 2. 地址栏输入：chrome://extensions/
echo 3. 开启右上角的"开发者模式"开关
echo 4. 点击"加载已解压的扩展程序"
echo 5. 选择当前文件夹：
echo    %~dp0
echo 6. 点击"选择文件夹"完成安装
echo.

echo 🎯 使用提示：
echo - 安装后工具栏会出现插件图标
echo - 点击图标可以打开设置面板
echo - 默认每小时提醒一次
echo - 可以自定义提醒间隔和内容
echo.

echo 📁 当前插件目录：
echo %~dp0
echo.

echo 是否要打开 Chrome 扩展程序页面？(Y/N)
set /p choice=请选择: 

if /i "%choice%"=="Y" (
    echo 正在打开 Chrome 扩展程序页面...
    start chrome://extensions/
) else (
    echo 请手动打开 chrome://extensions/ 进行安装
)

echo.
echo 🔗 如需帮助，请查看 README.md 文件
echo.
pause
