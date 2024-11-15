FROM nginx:alpine

# 創建必要的目錄並設置權限
RUN mkdir -p /usr/share/nginx/html \
    && mkdir -p /var/cache/nginx \
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R 755 /var/cache/nginx

COPY ./frontend /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./Procfile ./Procfile

# 確保文件權限正確
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
