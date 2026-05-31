FROM node:18-slim

# 安装 Python 和 pip
RUN apt-get update && apt-get install -y python3 python3-pip && \
    pip3 install edge-tts && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 先复制 package.json 安装依赖（利用缓存）
COPY package*.json ./
RUN npm install

# 复制所有代码
COPY . .

# 创建音频目录
RUN mkdir -p audio

EXPOSE 3000

CMD ["node", "server.js"]
