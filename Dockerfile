# 使用 nginx 镜像
FROM nginx:latest
EXPOSE 80

# 覆盖默认 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 清空默认 html 目录并复制本地 dist
RUN rm -rf /usr/share/nginx/html
COPY ./apps/web-antd/dist /usr/share/nginx/html

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
