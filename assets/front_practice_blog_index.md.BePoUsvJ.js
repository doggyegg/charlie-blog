import{_ as a,c as n,a2 as i,o as p}from"./chunks/framework.BiP9CoQA.js";const l="/charlie-blog/assets/viteinit.DM4iZMH0.png",t="/charlie-blog/assets/vitestructure.BMFP56Yc.png",e="/charlie-blog/assets/home.BIlk63vf.png",h="/charlie-blog/assets/layout.v0WwFvZ-.png",k="/charlie-blog/assets/gitSetting.1sI5tb4-.png",m=JSON.parse('{"title":"Vitepress 快速搭建专属博客","description":"","frontmatter":{},"headers":[],"relativePath":"front/practice/blog/index.md","filePath":"front/practice/blog/index.md"}'),o={name:"front/practice/blog/index.md"};function r(E,s,c,d,g,u){return p(),n("div",null,s[0]||(s[0]=[i(`<h1 id="vitepress-快速搭建专属博客" tabindex="-1">Vitepress 快速搭建专属博客 <a class="header-anchor" href="#vitepress-快速搭建专属博客" aria-label="Permalink to &quot;Vitepress 快速搭建专属博客&quot;">​</a></h1><h2 id="vitepress-简介" tabindex="-1">VitePress 简介 <a class="header-anchor" href="#vitepress-简介" aria-label="Permalink to &quot;VitePress 简介&quot;">​</a></h2><p>VitePress 是一个底层为 Vue 的静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。</p><h2 id="项目搭建" tabindex="-1">项目搭建 <a class="header-anchor" href="#项目搭建" aria-label="Permalink to &quot;项目搭建&quot;">​</a></h2><h3 id="新建项目文件夹-并且进行项目初始化-以-pnpm-为例" tabindex="-1">新建项目文件夹，并且进行项目初始化（以 pnpm 为例） <a class="header-anchor" href="#新建项目文件夹-并且进行项目初始化-以-pnpm-为例" aria-label="Permalink to &quot;新建项目文件夹，并且进行项目初始化（以 pnpm 为例）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir my-blog</span></span>
<span class="line"><span>cd ./my-blog</span></span>
<span class="line"><span>pnpm init</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pnpm i vitepress -D</span></span>
<span class="line"><span>pnpm vitepress init</span></span></code></pre></div><p>初始化会进行配置问答，完成后会得到一个基础的 vitepress 项目</p><p><img src="`+l+'" alt="alt text"></p><p>项目结构如下</p><p><img src="'+t+'" alt="alt text"></p><h3 id="首页搭建-docs-index-md" tabindex="-1">首页搭建（docs/index.md） <a class="header-anchor" href="#首页搭建-docs-index-md" aria-label="Permalink to &quot;首页搭建（docs/index.md）&quot;">​</a></h3><p><img src="'+e+`" alt="alt text"></p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">layout: home // 声明当前页面的模块结构为首页，默认为 page</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hero: // banner 部分</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name: &quot;Charlie Blog&quot; // 主标题</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text: &quot;Welcome to Charlie&#39;s blog!&quot; // 副标题</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tagline: All articles on this website are original. Please indicate the source when reprinting! // 内容区</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">image: // 图片区</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src: /home/home-banner.jpg // 图片地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">alt: 加载失败 // 图片加载失败提示语</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">actions: - theme: brand // 按钮区域</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text: View Blogs // 按钮文案</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">link: /front/engi/rule // 跳转链接，以 docs 为根路径</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">features: // 功能区</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> title: Front End // 标题</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  icon: // 图标</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  src: /home/front-end-icon.svg // 图标地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  link: /front/engi/rule // 跳转链接</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  details: Front-end frameworks such as Vue and React, technical design such as micro-front-end and low code, and common front-end performance optimization schemes // 文案描述</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> title: Back End</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  icon:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  src: /home/back-end-icon.svg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  link: /back/index</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  details: Back-end framework applications such as express and nest.js, as well as the operation of common data such as mysql and mongodb</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> title: Others</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  icon:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  src: /home/network-icon.svg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  link: /others/operation/md</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  details: Git operation, network engineering, and some other commonly used programming tools, skills and so on</span></span></code></pre></div><h3 id="layout-搭建-docs-vitepress-config-mts" tabindex="-1">Layout 搭建（docs/.vitepress/config.mts） <a class="header-anchor" href="#layout-搭建-docs-vitepress-config-mts" aria-label="Permalink to &quot;Layout 搭建（docs/.vitepress/config.mts）&quot;">​</a></h3><p><img src="`+h+`" alt="alt text"></p><div class="language-mts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { defineConfig } from &quot;vitepress&quot;;</span></span>
<span class="line"><span>import utils from &quot;./utils&quot;;</span></span>
<span class="line"><span>const { getSideBar } = utils;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  base: &quot;/charlie-blog/&quot;, // 项目根路由，github部署后的基础路由如:xx.github.io/charlie-blog/</span></span>
<span class="line"><span>  title: &quot;Charlie Blog&quot;, // 浏览器标签标题</span></span>
<span class="line"><span>  // 浏览器标签的favicon</span></span>
<span class="line"><span>  head: [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>      &quot;link&quot;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        rel: &quot;icon&quot;,</span></span>
<span class="line"><span>        type: &quot;image/svg+xml&quot;,</span></span>
<span class="line"><span>        href: &quot;/charlie-blog/websiteLogo.svg&quot;,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  description: &quot;Welcome to Charlie&#39;s blog!&quot;, // 浏览器检索关键字</span></span>
<span class="line"><span>  cleanUrls: true, // 路由地址隐藏.html</span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>    logo: &quot;/websiteLogo.svg&quot;, // 站点标题前的icon</span></span>
<span class="line"><span>    outline: &quot;deep&quot;, // 文章目录显示方式，deep为完整显示，false不显示，[1,3]显示1-3级</span></span>
<span class="line"><span>    // 导航区域，text:文本  link:对应跳转链接  activeMatch,当路由里包含xx时，该项高亮</span></span>
<span class="line"><span>    nav: [</span></span>
<span class="line"><span>      { text: &quot;Home&quot;, link: &quot;/&quot; },</span></span>
<span class="line"><span>      { text: &quot;Front-end&quot;, link: &quot;/front/engi/rule&quot;, activeMatch: &quot;/front/&quot; },</span></span>
<span class="line"><span>      { text: &quot;Back-end&quot;, link: &quot;/back/index&quot;, activeMatch: &quot;/back/&quot; },</span></span>
<span class="line"><span>      { text: &quot;Others&quot;, link: &quot;/others/operation/md&quot;, activeMatch: &quot;/others/&quot; },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 启动本地搜索功能</span></span>
<span class="line"><span>    search: {</span></span>
<span class="line"><span>      provider: &quot;local&quot;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    // key:当路由中匹配到该项，value:返回值为对应的侧边栏，具体后边单独讲解</span></span>
<span class="line"><span>    sidebar: {</span></span>
<span class="line"><span>      &quot;/front/&quot;: getSideBar(&quot;front&quot;),</span></span>
<span class="line"><span>      &quot;/back/&quot;: getSideBar(&quot;back&quot;),</span></span>
<span class="line"><span>      &quot;/others&quot;: getSideBar(&quot;others&quot;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    // 可以添加外部社交网站地址，如github,掘金，微博等等</span></span>
<span class="line"><span>    socialLinks: [</span></span>
<span class="line"><span>      { icon: &quot;github&quot;, link: &quot;https://github.com/doggyegg/charlie-blog&quot; },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    // 底部区域，一般为版权相关</span></span>
<span class="line"><span>    footer: {</span></span>
<span class="line"><span>      message: &quot;本站所有内容均为原创，转载请注明出处&quot;,</span></span>
<span class="line"><span>      copyright: &quot;Copyright © 2024-present charlie-chen&quot;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="根据路由动态设置侧边栏" tabindex="-1">根据路由动态设置侧边栏 <a class="header-anchor" href="#根据路由动态设置侧边栏" aria-label="Permalink to &quot;根据路由动态设置侧边栏&quot;">​</a></h3><ol><li>在 config.mts 同级新建文件 utils.ts,并且暴露出 getSideBar 函数，在 getSidebar 函数中配置 Sidebar 数据</li></ol><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  getSideBar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> wholeList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;front&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 显示文本</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // collapsed: true,  // 子项是否可收起</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 下钻子项</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;前端工程化&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;前端规范搭建&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/front/engi/rule/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;back&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Framework&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Nest.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/back/nest/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;others&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;常用操作指令&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MarkDown&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/others/operation/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">path) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wholeList;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wholeList.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> list.text </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path)[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><ol start="2"><li>在 config.mts 文件中使用，具体参考 Layout 搭建中的代码</li></ol><h3 id="文章路径说明及编写规则" tabindex="-1">文章路径说明及编写规则 <a class="header-anchor" href="#文章路径说明及编写规则" aria-label="Permalink to &quot;文章路径说明及编写规则&quot;">​</a></h3><ul><li>路由均由 docs 为根路径，如文件目录为 /docs/front/engi/rule.md,则路由为/front/engi/rule</li><li>文章编写按照 MD 语法编写即可</li></ul><h2 id="自动化部署到-github" tabindex="-1">自动化部署到 github <a class="header-anchor" href="#自动化部署到-github" aria-label="Permalink to &quot;自动化部署到 github&quot;">​</a></h2><h3 id="编写-github-workflow-脚本" tabindex="-1">编写 github-workflow 脚本 <a class="header-anchor" href="#编写-github-workflow-脚本" aria-label="Permalink to &quot;编写 github-workflow 脚本&quot;">​</a></h3><ol><li>在项目根目录（与 docs 同级）</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir .github/workflows</span></span>
<span class="line"><span>cd ./.github/workflows</span></span>
<span class="line"><span></span></span>
<span class="line"><span>创建deploy.yml文件，并且粘贴以下代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>name: charlie-blog deploy workflow</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置触发时机，当推送master分支或者tag到远程时触发</span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    tags:</span></span>
<span class="line"><span>      - &quot;*&quot;</span></span>
<span class="line"><span>    branches:</span></span>
<span class="line"><span>      - master</span></span>
<span class="line"><span>  workflow_dispatch:</span></span>
<span class="line"><span># 各个脚本节点命令</span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  deploy-and-sync:</span></span>
<span class="line"><span>    # 执行环境为linux的ubuntu系统</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      # 从master分支拉取代码</span></span>
<span class="line"><span>      - name: Checkout 🛎️</span></span>
<span class="line"><span>        uses: actions/checkout@v4</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          ref: &quot;master&quot;</span></span>
<span class="line"><span>      # 安装pnpm</span></span>
<span class="line"><span>      - name: Install pnpm</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          corepack enable</span></span>
<span class="line"><span>          corepack prepare pnpm@latest --activate</span></span>
<span class="line"><span>      # 安装node环境</span></span>
<span class="line"><span>      - uses: actions/setup-node@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: &quot;18&quot;</span></span>
<span class="line"><span>          cache: &quot;pnpm&quot;</span></span>
<span class="line"><span>      # 使用pnpm安装依赖</span></span>
<span class="line"><span>      - name: Install dependencies</span></span>
<span class="line"><span>        run: pnpm install</span></span>
<span class="line"><span>      # 打包vitepress项目</span></span>
<span class="line"><span>      - name: Build Site</span></span>
<span class="line"><span>        run: pnpm run docs:build</span></span>
<span class="line"><span>      # 将打包后dist里的产物提交到prod分支</span></span>
<span class="line"><span>      - name: Deploy for Github 🚀</span></span>
<span class="line"><span>        uses: JamesIves/github-pages-deploy-action@v4.4.1</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          branch: prod</span></span>
<span class="line"><span>          folder: docs/.vitepress/dist</span></span>
<span class="line"><span>          single-commit: true</span></span>
<span class="line"><span>          clean: true</span></span></code></pre></div><ol start="2"><li>在项目创建 prod 分支，用于 github 自动化脚本打包后的部署分支</li><li>在 github 仓库中进行 io 设置 <img src="`+k+'" alt="alt text"></li></ol><p>配置完成后，当你每次在 master 分支提交代码或者推送 tag 时，github 都会自动化执行打包命令，并且将生成的 dist 文件目录下的产物覆盖拷贝到 prod 分支，然后以 prod 分支作为根路径进行静态资源部署</p><p>成功后，可以通过 https://&lt;github 账号名&gt;.github.io/&lt;config 中配置的 base&gt;/ 来访问你的项目，如<a href="https://doggyegg.github.io/charlie-blog/" target="_blank" rel="noreferrer">https://doggyegg.github.io/charlie-blog/</a></p><p>如果无法显示，请在 github actions 中查看对应失败原因，并做调整</p>',30)]))}const q=a(o,[["render",r]]);export{m as __pageData,q as default};
