
# AI语音生成器

基于微软 Edge-TTS 的免费语音合成服务，支持单人朗读、多人齐读和多人对话模式。

## 功能特点

- 🎙️ **单人朗读** - 选择音色，输入文本，生成语音
- 👥 **多人齐读** - 最多5人同时朗读同一段文字
- 💬 **多人对话** - 设置多段对话，不同角色轮流说话，自然停顿
- 🌍 **70+ 种音色** - 中文（含方言）、英语美式/英式/其他口音
- 👶 **童声支持** - 中文女童、英语女童等
- 🆓 **完全免费** - 基于 Edge-TTS，无需付费
- 📱 **跨设备使用** - 手机/电脑都能访问

## 音色分类

| 分类 | 数量 | 说明 |
|:---|:---|:---|
| 中文女声 | 10 | 温柔、知性、甜美、女童等 |
| 中文男声 | 8 | 沉稳、少年、活泼、磁性等 |
| 中文方言 | 10 | 粤语、东北话、四川话、台湾国语等 |
| 英语美式 | 21 | 男/女/童声，多种风格 |
| 英语英式 | 6 | BBC风格、优雅知性等 |
| 英语其他 | 13 | 澳洲、加拿大、爱尔兰、印度等口音 |

## 技术栈

- 后端：Node.js + Express + Edge-TTS（Docker）
- 前端：HTML + Tailwind CSS（GitHub Pages）
- 部署：Railway + GitHub Pages

## 部署

### 后端（Railway）

1. Fork 本仓库
2. 在 Railway 创建项目，自动识别 Dockerfile
3. 获取服务地址

### 前端（GitHub Pages）

1. 将 `index.html` 上传到 GitHub 仓库
2. 修改 `API_URL` 为你的 Railway 地址
3. 开启 GitHub Pages

## API 接口

### 生成语音

```http
POST /tts
Content-Type: application/json

{
  "text": "你好世界",
  "voice": "zh-CN-XiaoxiaoNeural"
}
```

**响应：**

```json
{
  "success": true,
  "audioUrl": "https://.../audio/xxx.mp3"
}
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|:---|:---|:---|:---|
| text | string | 是 | 要合成的文本（最多5000字）|
| voice | string | 否 | 音色ID，默认 zh-CN-XiaoxiaoNeural |

## 对话模式说明

1. 选择参与对话的角色（可多选）
2. 添加对话段落，每段选择说话人
3. 点击"生成对话语音"
4. 使用"按顺序播放"体验自然对话
5. 两人对话间有 0.8-1.5 秒随机停顿，更真实

## 开源协议

MIT
