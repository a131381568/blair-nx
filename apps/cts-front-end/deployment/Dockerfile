FROM node:20.17.0-alpine AS builder

RUN echo "printenv env: " && \
    printenv

RUN echo "env: " && \
    env

WORKDIR /middle_layer
COPY . .

# 安裝構建工具和依賴
RUN npm install -g pnpm@8.15.3 && \
    pnpm install

# 執行構建
RUN pnpm exec nx build cts-front-end

# 部署階段
FROM nginx:alpine AS deploy

COPY --from=builder /middle_layer/dist/ctsf/frontend /usr/share/nginx/html/
COPY --from=builder /middle_layer/apps/cts-front-end/deployment/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
