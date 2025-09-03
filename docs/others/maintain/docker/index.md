# Docker 入门与实践

## 什么是 Docker？

Docker 是一个开源的容器化平台，它可以让开发者将应用程序和其依赖打包到一个可移植的容器中，然后在任何地方运行。Docker 容器包含了运行应用程序所需的一切：代码、运行时环境、系统工具、系统库和设置。

## Docker 的主要用途

1. **应用程序部署**

   - 快速部署应用及其依赖
   - 确保开发、测试和生产环境的一致性
   - 简化持续集成和持续部署(CI/CD)流程

2. **环境隔离**

   - 不同应用之间相互隔离
   - 避免系统依赖冲突
   - 资源的有效隔离和限制

3. **微服务架构**
   - 支持微服务的独立部署和扩展
   - 便于服务的版本控制和更新
   - 方便服务之间的集成和通信

## Docker 的优势

1. **一致的运行环境**

   - 消除"在我电脑上能运行"的问题
   - 保证开发和生产环境的一致性
   - 简化团队协作

2. **快速部署**

   - 容器启动速度快（秒级）
   - 支持快速扩展和缩减
   - 方便的版本控制和回滚机制

3. **资源高效利用**

   - 比传统虚拟机更轻量级
   - 共享主机操作系统内核
   - 更高的资源利用率

4. **易于维护**
   - 标准化的应用打包方式
   - 简化应用程序的管理和维护
   - 方便的日志管理和监控

## Docker 的核心概念

### 1. Dockerfile

Dockerfile 是一个文本文件，包含了一系列指令和参数，用于自动化构建 Docker 镜像。它定义了镜像的构建过程，包括：

- 基础镜像的选择（FROM）
- 环境变量的设置（ENV）
- 依赖包的安装（RUN）
- 文件的复制（COPY/ADD）
- 容器启动时执行的命令（CMD/ENTRYPOINT）
- 端口映射（EXPOSE）等

### 2. Docker 镜像（Image）

Docker 镜像是一个只读的模板，包含：

- 运行应用所需的完整环境
- 应用程序的代码和依赖
- 配置文件和运行时
- 系统工具和函数库

特点：

- 分层结构，每一层代表一个 Dockerfile 指令
- 可以基于基础镜像构建
- 支持版本控制和标签管理
- 可以在 Docker Hub 上共享和下载

### 3. Docker 容器（Container）

容器是镜像的运行实例，具有以下特性：

- 提供独立的运行环境和资源空间
- 可以启动、停止、删除和暂停
- 支持数据持久化（通过数据卷）
- 可以与其他容器和外部网络通信

### 4. Docker Registry（镜像仓库）

用于存储和分发 Docker 镜像的服务，分为：

- 公共仓库（如 Docker Hub）
- 私有仓库（企业内部使用）

### 5. 概念之间的关系

1. **Dockerfile → Image → Container**

   - Dockerfile 定义了如何构建镜像
   - 镜像是容器的模板
   - 容器是镜像的运行实例

2. **数据持久化**

   - 容器是临时的，但可以通过数据卷（Volume）持久化数据
   - 多个容器可以共享同一个数据卷

3. **网络通信**
   - 容器可以通过 Docker 网络互相通信
   - 支持端口映射到宿主机
   - 可以创建自定义网络隔离容器

## 实战案例：Vue2 项目部署到 Docker

下面我们将通过一个实际案例，演示如何将 Vue2 项目使用 Docker 和 Nginx 进行部署。

### 1. 准备工作

首先，确保你的 Vue2 项目已经开发完成，并且能够正常构建。项目结构可能如下：

```
my-vue-app/
├── src/
├── public/
├── package.json
├── vue.config.js
└── node_modules/
```

### 2. 创建 Nginx 配置文件

在项目根目录创建 `nginx.conf`：

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 3. 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. 构建和运行 Docker 镜像

在项目根目录下执行以下命令：

```bash
# 构建Docker镜像
docker build -t my-vue-app .

# 运行容器
docker run -d -p 8080:80 my-vue-app
```

### 5. 验证部署

现在可以通过访问 `http://localhost:8080` 来查看你的 Vue 应用了。

## 常见问题和注意事项

1. **构建优化**

   - 使用.dockerignore 排除不必要的文件
   - 合理使用多阶段构建减小镜像大小
   - 选择合适的基础镜像

2. **安全考虑**

   - 不要在容器中运行 root 用户
   - 定期更新基础镜像
   - 使用安全扫描工具检查漏洞

3. **性能优化**
   - 合理配置 Nginx 参数
   - 优化静态资源缓存
   - 监控容器资源使用情况
