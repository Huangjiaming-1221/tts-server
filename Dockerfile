FROM node:18-slim

# 安装 Python、pip 和 venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 创建虚拟环境并安装 edge-tts
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install edge-tts

# 添加到 PATH
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p audio

EXPOSE 3000

CMD ["node", "server.js"]
