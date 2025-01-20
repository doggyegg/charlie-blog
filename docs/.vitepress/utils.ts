export default {
  getSideBar(path) {
    const wholeList = [
      {
        text: "front",
        items: [
          {
            // collapsed: true,
            text: "前端工程化",
            items: [
              {
                text: "前端规范搭建",
                link: "/front/engi/rule/",
              },
              {
                text: "Monorepo理论与实践",
                link: "/front/engi/monorepo/",
              },
              {
                text: "微前端架构浅析",
                link: "/front/engi/microFront/",
              },
              {
                text: "搭建你的专属组件库",
                link: "/front/engi/components/",
              },
            ],
          },
          {
            text: "前端基础",
            items: [
              {
                text: "前端最全Debugger技巧",
                link: "/front/base/debugger/",
              },
              {
                text: "前端常见性能优化方案",
                link: "/front/base/performance/",
              },
            ],
          },
          {
            text: "Uniapp跨端开发",
            items: [
              {
                text: "包体积优化",
                link: "/front/mini/packageSize/",
              },
              {
                text: "自定义编译变量及环境变量",
                link: "/front/mini/var/",
              },
              {
                text: "从Hbuilder迁移到命令行编译",
                link: "/front/mini/hb2cli",
              },
              {
                text: "Uniapp对接微信原生SDK",
                link: "/front/mini/thirdSDK/",
              },
              {
                text: "Uniapp踩坑合集",
                link: "/front/mini/trap/",
              },
            ],
          },
          {
            text:"源码分析",
            items: [
              {
                text: "vue2响应式原理",
                link: "/front/source/vue2/reactive/",
              },
            ],
          },
          {
            text: "项目实践",
            items: [
              {
                text: "10分钟搭建一个属于自己的博客",
                link: "/front/practice/blog/",
              },
            ],
          },
        ],
      },
      {
        text: "back",
        items: [
          {
            text: "后端框架",
            items: [
              {
                text: "Nest",
                link: "/back/framework/nest/",
              },
            ],
          },
        ],
      },
      {
        text: "others",
        items: [
          {
            text: "常用操作指令",
            items: [
              {
                text: "Git",
                link: "/others/operation/git/",
              },
              {
                text: "MarkDown",
                link: "/others/operation/md/",
              },
            ],
          },
          {
            text: "网络与运维",
            items: [
              {
                text: "关于浏览器缓存那些事",
                link: "/others/maintain/cache/",
              },
              {
                text: "Nginx",
                link: "/others/maintain/ng/",
              },
            ],
          },
        ],
      },
    ];

    if (!path) {
      return wholeList;
    }

    return wholeList.filter((list) => list.text === path)[0];
  },
};
