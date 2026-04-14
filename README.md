# ⚡ 本地离线翻译浏览器插件 (Local Offline Translator)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

这是一个轻量级的浏览器翻译扩展程序。与传统的在线翻译插件不同，它将所有翻译请求发送到**本地运行的翻译引擎**，这意味着你的文本数据**永远不会离开你的电脑**，百分百保护个人隐私。

## ✨ 功能特性

- **🔒 绝对隐私**：完全离线运行，数据不上传云端，适合翻译机密或敏感文件。
- **🔄 一键语种互换**：点击 `⇄` 按钮，瞬间交换源语言和目标语言，并自动对调输入/输出框内的文本，符合直觉。
- **🛡️ 智能防呆设计**：如果源语言和目标语言相同，自动阻断网络请求并直接复制文本，节省系统资源。
- **🎨 极简 UI**：干净现代的界面设计，支持多状态实时提示（就绪、翻译中、成功、错误）。
- **🌍 多语种支持**：内置中文 🇨🇳、英文 🇬🇧、德文 🇩🇪、西班牙文 🇪🇸（可按需轻松扩展）。

## 🛠️ 工作原理

本插件作为前端交互界面，核心翻译能力依赖于本地部署的 [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) 服务。
插件拦截你的输入，将其打包并发送至 `http://127.0.0.1:5000/translate`。

## 🚀 快速开始

### 1. 部署本地翻译引擎 (必需)
由于本插件是离线运行的，你需要先在本地跑起来一个翻译服务。最简单的方法是使用 Docker 运行 LibreTranslate：

```bash
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```
(注意：首次运行 Docker 可能会自动下载语言包，请耐心等待直到终端显示 Running on http://0.0.0.0:5000)

### 2. 安装浏览器插件
1. 下载或 git clone 本仓库代码到你的电脑上。
2. 打开 Chrome / Edge 浏览器，进入扩展程序页面：
  Chrome: 访问 chrome://extensions/
  Edge: 访问 edge://extensions/
3. 在右上角开启 “开发者模式” (Developer mode)。
4. 点击 “加载已解压的扩展程序” (Load unpacked)。
5. 选择本仓库所在的文件夹。
6. 将插件固定到浏览器工具栏，点击图标即可开始使用！

## ⚙️ 自定义与扩展
如果你想添加更多的语言支持，只需修改 popup.html 中的 <select> 标签即可。例如添加日语：
```html
<option value="ja">🇯🇵 日文</option>
```
(注意：请确保你的本地 LibreTranslate 引擎已经安装了对应的语言模型。)

## 📂 文件结构
- popup.html: 扩展程序的交互界面与样式 (UI & CSS)。
- popup.js: 核心逻辑处理（语种切换、网络请求、防呆拦截、状态渲染）。
- manifest.json: (需自行补充) 浏览器扩展配置文件。

