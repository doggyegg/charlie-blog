import{_ as t,c as e,a2 as a,j as i,G as h,a as k,B as l,o as p}from"./chunks/framework.BiP9CoQA.js";const r="/charlie-blog/assets/image.DpeVxkkQ.png",C=JSON.parse('{"title":"React-hooks源码阅读随记","description":"","frontmatter":{},"headers":[],"relativePath":"front/source/react/hooks/index.md","filePath":"front/source/react/hooks/index.md"}'),o={name:"front/source/react/hooks/index.md"};function E(d,s,g,y,c,F){const n=l("App");return p(),e("div",null,[s[2]||(s[2]=a('<h1 id="react-hooks源码阅读随记" tabindex="-1">React-hooks源码阅读随记 <a class="header-anchor" href="#react-hooks源码阅读随记" aria-label="Permalink to &quot;React-hooks源码阅读随记&quot;">​</a></h1><h2 id="createroot" tabindex="-1">createRoot <a class="header-anchor" href="#createroot" aria-label="Permalink to &quot;createRoot&quot;">​</a></h2><p><img src="'+r+'" alt="alt text"></p><p>main.js的起点，接受参数为dom节点，生成的实例对象上有render函数，将React-node传入，完成根组件的挂载</p>',4)),i("ul",null,[i("li",null,[h(n),s[0]||(s[0]=k(" 在 babel编译后，是调用React.createElement(App, null);"))]),s[1]||(s[1]=i("li",null,"该函数会返回ReactElement对象，在React调和阶段会调用该对象上的type，也就是指向App函数",-1))]),s[3]||(s[3]=a(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: App,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $$typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(react.element)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>createRoot 调用 createContainer =&gt; createFiberRoot =&gt;new FiberRootNode &amp;&amp; createHostRootFiber , 在这里创建了Fiber树结构的根及组件树的起点</li><li>返回值为 new ReactRootElement(), 上面会调用render()</li><li>每个函数组件经过babel编译后，都会生成对应实例，在后续reconcile阶段，会通过createFiberFromElement生成对应fiber节点，fiber节点上有memoizedState ，指向该组件的第一个Hook，每个Hook上的next指向下一个hook,形成链表, hook不会按照分类来储存，就是单纯按照定义的顺序来进行储存，如果是自定义hooks，会将自定义hook中用到的内部hook加入到链表中，demo如下，这也是为什么hook不能写在条件判断中，那样会打乱hook调用和更新的顺序，出现异常</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 自定义Hook</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useCustomHook</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">setValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 会被加入hooks链表</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  useEffect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*...*/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, []);           </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 会被加入hooks链表</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">setCount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hook #1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> customValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useCustomHook</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这里会展开成两个hook (#2, #3)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">setName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useState</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hook #4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,3))])}const m=t(o,[["render",E]]);export{C as __pageData,m as default};
