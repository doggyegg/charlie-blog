import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.BiP9CoQA.js";const g=JSON.parse('{"title":"前端视角看CICD","description":"","frontmatter":{},"headers":[],"relativePath":"front/engi/CICD/index.md","filePath":"front/engi/CICD/index.md"}'),p={name:"front/engi/CICD/index.md"};function h(e,s,t,k,E,r){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="前端视角看cicd" tabindex="-1">前端视角看CICD <a class="header-anchor" href="#前端视角看cicd" aria-label="Permalink to &quot;前端视角看CICD&quot;">​</a></h1><h2 id="什么是ci-cd" tabindex="-1">什么是CI/CD？ <a class="header-anchor" href="#什么是ci-cd" aria-label="Permalink to &quot;什么是CI/CD？&quot;">​</a></h2><p>CI/CD（持续集成/持续交付）是现代软件开发中的重要实践，它通过自动化的流程来提高软件交付的效率和质量。</p><ul><li><strong>CI（持续集成）</strong>：开发人员频繁地将代码集成到主干分支，每次集成都通过自动化构建和测试来验证，从而尽早发现问题。</li><li><strong>CD（持续交付/部署）</strong>：将软件自动化地部署到各种环境中（测试环境、预发环境、生产环境等）。</li></ul><h2 id="ci-cd的优势" tabindex="-1">CI/CD的优势 <a class="header-anchor" href="#ci-cd的优势" aria-label="Permalink to &quot;CI/CD的优势&quot;">​</a></h2><ol><li><p><strong>提高开发效率</strong></p><ul><li>自动化构建和部署，减少人工操作</li><li>快速发现并解决问题</li><li>减少重复性工作</li></ul></li><li><p><strong>保证代码质量</strong></p><ul><li>自动化测试确保代码质量</li><li>统一的构建流程</li><li>代码规范检查</li></ul></li><li><p><strong>降低部署风险</strong></p><ul><li>环境一致性</li><li>可回滚机制</li><li>分步骤部署</li></ul></li></ol><h2 id="核心工具介绍" tabindex="-1">核心工具介绍 <a class="header-anchor" href="#核心工具介绍" aria-label="Permalink to &quot;核心工具介绍&quot;">​</a></h2><h3 id="jenkins" tabindex="-1">Jenkins <a class="header-anchor" href="#jenkins" aria-label="Permalink to &quot;Jenkins&quot;">​</a></h3><p>Jenkins是最流行的CI/CD工具之一，具有以下特点：</p><ol><li><p><strong>强大的插件生态</strong></p><ul><li>支持各种构建工具</li><li>丰富的集成能力</li><li>自定义扩展性强</li></ul></li><li><p><strong>Pipeline即代码</strong></p><ul><li>使用Jenkinsfile描述整个流水线</li><li>版本控制</li><li>可复用性高</li></ul></li><li><p><strong>分布式构建</strong></p><ul><li>Master-Slave架构</li><li>负载均衡</li><li>跨平台支持</li></ul></li></ol><p><a href="https://doggyegg.github.io/charlie-blog/others/maintain/jenkins/" target="_blank" rel="noreferrer">更多内容</a></p><h3 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h3><p>Docker是容器化技术的代表，在CI/CD中发挥着重要作用：</p><ol><li><p><strong>环境隔离</strong></p><ul><li>应用程序及其依赖打包</li><li>确保开发和生产环境一致</li><li>快速部署和扩展</li></ul></li><li><p><strong>镜像管理</strong></p><ul><li>版本控制</li><li>快速回滚</li><li>镜像复用</li></ul></li><li><p><strong>资源优化</strong></p><ul><li>轻量级虚拟化</li><li>快速启动</li><li>资源利用率高</li></ul></li></ol><p><a href="https://doggyegg.github.io/charlie-blog/others/maintain/docker/" target="_blank" rel="noreferrer">更多内容</a></p><h3 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h3><p>Nginx作为高性能的Web服务器，在前端部署中具有重要作用：</p><ol><li><p><strong>反向代理</strong></p><ul><li>负载均衡</li><li>安全防护</li><li>缓存加速</li></ul></li><li><p><strong>静态资源服务</strong></p><ul><li>高效的静态文件服务</li><li>Gzip压缩</li><li>缓存控制</li></ul></li></ol><p><a href="https://doggyegg.github.io/charlie-blog/others/maintain/ng/" target="_blank" rel="noreferrer">更多内容</a></p><h2 id="实战案例-vue2项目的ci-cd部署" tabindex="-1">实战案例：Vue2项目的CI/CD部署 <a class="header-anchor" href="#实战案例-vue2项目的ci-cd部署" aria-label="Permalink to &quot;实战案例：Vue2项目的CI/CD部署&quot;">​</a></h2><h3 id="_1-jenkins-pipeline配置" tabindex="-1">1. Jenkins Pipeline配置 <a class="header-anchor" href="#_1-jenkins-pipeline配置" aria-label="Permalink to &quot;1. Jenkins Pipeline配置&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    environment {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        DOCKER_IMAGE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue-app&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        DOCKER_TAG</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\${BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stage(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Checkout&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                checkout scm</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stage(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Install Dependencies&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                sh </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;npm install&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stage(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Build&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                sh </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;npm run build&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stage(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Docker Build&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                script {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">build(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;\${DOCKER_IMAGE}:\${DOCKER_TAG}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stage(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Deploy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                sh </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                    docker stop \${DOCKER_IMAGE} || true</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                    docker rm \${DOCKER_IMAGE} || true</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                    docker run -d --name \${DOCKER_IMAGE} -p 8080:80 \${DOCKER_IMAGE}:\${DOCKER_TAG}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_2-dockerfile配置" tabindex="-1">2. Dockerfile配置 <a class="header-anchor" href="#_2-dockerfile配置" aria-label="Permalink to &quot;2. Dockerfile配置&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 构建阶段</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node:14 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> builder</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> package*.json ./</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm install</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> . .</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生产阶段</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx:alpine</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=builder /app/dist /usr/share/nginx/html</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nginx.conf /etc/nginx/conf.d/default.conf</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">EXPOSE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 80</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nginx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-g&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;daemon off;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><h3 id="_3-nginx配置" tabindex="-1">3. Nginx配置 <a class="header-anchor" href="#_3-nginx配置" aria-label="Permalink to &quot;3. Nginx配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">localhost;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/usr/share/nginx/html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # API代理配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> /api </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://backend-service;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 静态资源缓存配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> /static/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        expires </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Cache-Control </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;public, no-transform&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="部署流程说明" tabindex="-1">部署流程说明 <a class="header-anchor" href="#部署流程说明" aria-label="Permalink to &quot;部署流程说明&quot;">​</a></h2><ol><li><p><strong>代码提交触发Jenkins构建</strong></p><ul><li>开发人员提交代码到Git仓库</li><li>Webhook触发Jenkins构建任务</li><li>Jenkins拉取最新代码</li></ul></li><li><p><strong>Jenkins执行构建流程</strong></p><ul><li>安装项目依赖</li><li>执行代码检查和测试</li><li>构建生产环境代码</li></ul></li><li><p><strong>Docker镜像构建</strong></p><ul><li>基于Dockerfile构建应用镜像</li><li>多阶段构建优化镜像大小</li><li>推送镜像到镜像仓库</li></ul></li><li><p><strong>部署和服务配置</strong></p><ul><li>拉取Docker镜像</li><li>启动容器</li><li>Nginx配置生效</li></ul></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>通过CI/CD的实践，我们可以：</p><ul><li>实现自动化的构建和部署流程</li><li>提高开发团队的效率</li><li>保证部署的稳定性和可靠性</li><li>快速响应业务需求变化</li></ul><p>建议在实际项目中根据具体需求调整配置，并持续优化部署流程。</p>`,32)]))}const o=i(p,[["render",h]]);export{g as __pageData,o as default};