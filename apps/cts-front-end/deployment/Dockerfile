FROM nginx:alpine

COPY ./frontend /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/nginx.conf.template

CMD envsubst '${VITE_APP_HOST}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
