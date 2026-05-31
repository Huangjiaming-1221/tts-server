const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 静态文件服务
const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
app.use('/audio', express.static(audioDir));

// 自动清理旧文件
setInterval(() => {
    fs.readdir(audioDir, (err, files) => {
        if (err) return;
        const now = Date.now();
        files.forEach(file => {
            const fp = path.join(audioDir, file);
            fs.stat(fp, (e, stats) => {
                if (!e && now - stats.mtime > 3600000) fs.unlink(fp, () => {});
            });
        });
    });
}, 600000);

app.post('/tts', (req, res) => {
    const { text, voice = 'zh-CN-XiaoxiaoNeural' } = req.body;
    
    if (!text?.trim()) return res.status(400).json({ error: '文本不能为空' });
    if (text.length > 5000) return res.status(400).json({ error: '超过5000字符' });

    const hash = crypto.createHash('md5').update(text + voice).digest('hex').slice(0, 12);
    const filename = `${voice}-${hash}.mp3`;
    const filepath = path.join(audioDir, filename);

    // 缓存命中直接返回
    if (fs.existsSync(filepath)) {
        return res.json({ 
            success: true, 
            audioUrl: `${req.protocol}://${req.get('host')}/audio/${filename}`,
            cached: true 
        });
    }

    const cmd = `edge-tts --voice "${voice}" --text "${text.replace(/"/g, '\\"')}" --write-media "${filepath}"`;

    exec(cmd, { timeout: 60000 }, (error) => {
        if (error) {
            console.error('TTS Error:', error);
            return res.status(500).json({ error: '生成失败' });
        }
        res.json({ 
            success: true, 
            audioUrl: `${req.protocol}://${req.get('host')}/audio/${filename}`
        });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));