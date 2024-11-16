FROM node:20.17.0-alpine

ARG DATABASE_URL
ARG API_HOST
ARG API_PREFIX
ARG PORT
ARG CRYPTO_KEY
ARG CRYPTO_IV
ARG JWT_SECRET

WORKDIR /middle_layer

copy . .

# 安裝構建工具和依賴
run apk add --no-cache netcat-openbsd
run apk add --no-cache postgresql-client

# 打包階段
RUN npm install -g pnpm@8.15.3 && \
    pnpm install && \
    pnpm exec nx prisma:g cts-back-end && \
    pnpm exec nx build cts-back-end
    
CMD ["node", "dist/ctsb/main.js"]
