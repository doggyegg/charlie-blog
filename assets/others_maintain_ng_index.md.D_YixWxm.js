import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.BiP9CoQA.js";const o=JSON.parse('{"title":"Nginx理论与实践","description":"","frontmatter":{},"headers":[],"relativePath":"others/maintain/ng/index.md","filePath":"others/maintain/ng/index.md"}'),h={name:"others/maintain/ng/index.md"};function p(t,s,e,k,r,d){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="nginx理论与实践" tabindex="-1">Nginx理论与实践 <a class="header-anchor" href="#nginx理论与实践" aria-label="Permalink to &quot;Nginx理论与实践&quot;">​</a></h1><h2 id="_1-什么是nginx" tabindex="-1">1. 什么是Nginx？ <a class="header-anchor" href="#_1-什么是nginx" aria-label="Permalink to &quot;1. 什么是Nginx？&quot;">​</a></h2><p>Nginx（发音为&quot;engine x&quot;）是一个高性能的开源Web服务器软件。它最初由毛子程序员创建，用于解决C10K问题（即单个服务器同时处理10,000个客户端连接的问题）。Nginx不仅可以作为Web服务器，还可以用作反向代理、负载均衡器和HTTP缓存。</p><h2 id="_2-nginx的主要作用" tabindex="-1">2. Nginx的主要作用 <a class="header-anchor" href="#_2-nginx的主要作用" aria-label="Permalink to &quot;2. Nginx的主要作用&quot;">​</a></h2><ol><li><p><strong>Web服务器</strong></p><ul><li>处理静态文件请求</li><li>支持HTTP/HTTPS协议</li><li>提供基本的认证功能</li></ul></li><li><p><strong>反向代理服务器</strong></p><ul><li>转发客户端请求到后端服务器</li><li>隐藏真实后端服务器信息</li><li>提供额外的安全层</li></ul></li><li><p><strong>负载均衡器</strong></p><ul><li>分发请求到多个服务器</li><li>支持多种负载均衡算法</li><li>健康检查功能</li></ul></li><li><p><strong>HTTP缓存</strong></p><ul><li>缓存静态内容</li><li>减少后端服务器压力</li><li>提升访问速度</li></ul></li></ol><h2 id="_3-nginx的核心优势" tabindex="-1">3. Nginx的核心优势 <a class="header-anchor" href="#_3-nginx的核心优势" aria-label="Permalink to &quot;3. Nginx的核心优势&quot;">​</a></h2><ol><li><p><strong>高性能</strong></p><ul><li>异步非阻塞架构</li><li>事件驱动模型</li><li>低内存消耗</li><li>高并发处理能力</li></ul></li><li><p><strong>高可靠性</strong></p><ul><li>主从架构设计</li><li>热部署支持</li><li>自动故障转移</li></ul></li><li><p><strong>扩展性</strong></p><ul><li>丰富的模块系统</li><li>支持自定义模块</li><li>灵活的配置选项</li></ul></li><li><p><strong>跨平台</strong></p><ul><li>支持主流操作系统</li><li>安装配置简单</li><li>维护成本低</li></ul></li></ol><h2 id="_4-实践案例-部署vue2项目并配置接口代理" tabindex="-1">4. 实践案例：部署Vue2项目并配置接口代理 <a class="header-anchor" href="#_4-实践案例-部署vue2项目并配置接口代理" aria-label="Permalink to &quot;4. 实践案例：部署Vue2项目并配置接口代理&quot;">​</a></h2><h3 id="_4-1-准备工作" tabindex="-1">4.1 准备工作 <a class="header-anchor" href="#_4-1-准备工作" aria-label="Permalink to &quot;4.1 准备工作&quot;">​</a></h3><ol><li>确保服务器已安装Nginx</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Ubuntu/Debian</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CentOS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> epel-release</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span></code></pre></div><ol start="2"><li>确保Vue2项目已经打包</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在Vue项目目录下执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><h3 id="_4-2-nginx配置文件示例" tabindex="-1">4.2 Nginx配置文件示例 <a class="header-anchor" href="#_4-2-nginx配置文件示例" aria-label="Permalink to &quot;4.2 Nginx配置文件示例&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /etc/nginx/conf.d/vue-app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    server_name </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">your-domain.com;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为你的域名或IP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Vue项目静态文件目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/var/www/vue-app/dist;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    index </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 处理Vue路由</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> / </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        try_files </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uri $uri/ /index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # API代理配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> /api/ </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_pass </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http://api-server.com/;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换为实际的API服务器地址</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        proxy_set_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X-Forwarded-Proto $scheme;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 跨域配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Methods </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;GET, POST, OPTIONS&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        add_header </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Access-Control-Allow-Headers </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ($request_method </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">= </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;OPTIONS&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 204</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 错误页面配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    error_page </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">404</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /404.html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    error_page </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 502</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 503</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 504</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /50x.html;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    location</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;"> /50x.html </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        root </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/usr/share/nginx/html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="_4-3-部署步骤" tabindex="-1">4.3 部署步骤 <a class="header-anchor" href="#_4-3-部署步骤" aria-label="Permalink to &quot;4.3 部署步骤&quot;">​</a></h3><ol><li><strong>部署Vue项目</strong></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建部署目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/www/vue-app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 复制打包后的文件到部署目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dist/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/www/vue-app/dist/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置目录权限</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chown</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx:nginx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/www/vue-app</span></span></code></pre></div><ol start="2"><li><strong>配置Nginx</strong></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 复制配置文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue-app.conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/conf.d/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试配置是否正确</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启Nginx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span></code></pre></div><h3 id="_4-4-常见问题处理" tabindex="-1">4.4 常见问题处理 <a class="header-anchor" href="#_4-4-常见问题处理" aria-label="Permalink to &quot;4.4 常见问题处理&quot;">​</a></h3><ol><li><strong>404错误</strong></li></ol><ul><li>检查文件路径是否正确</li><li>确认nginx用户是否有权限访问文件</li><li>检查SELinux设置（如果使用）</li></ul><ol start="2"><li><strong>跨域问题</strong></li></ol><ul><li>确认CORS配置是否正确</li><li>检查API服务器是否允许跨域请求</li></ul><ol start="3"><li><strong>代理失败</strong></li></ol><ul><li>检查后端服务器地址是否正确</li><li>确认后端服务器是否正常运行</li><li>查看Nginx错误日志排查问题</li></ul><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-label="Permalink to &quot;5. 总结&quot;">​</a></h2><p>Nginx作为一个强大的Web服务器和反向代理服务器，在现代Web架构中扮演着重要角色。通过本文的理论学习和实践案例，我们了解了：</p><ol><li>Nginx的基本概念和核心功能</li><li>Nginx的主要优势和应用场景</li><li>如何使用Nginx部署Vue项目</li><li>如何配置Nginx实现接口代理</li></ol><p>掌握Nginx不仅能够帮助我们更好地部署和维护Web应用，还能够优化应用性能，提供更好的用户体验。</p>`,31)]))}const F=i(h,[["render",p]]);export{o as __pageData,F as default};