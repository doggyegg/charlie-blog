export default {
  getSideBar(path) {
    const wholeList = [
      {
        text: "front",
        // collapsed: true,
        items: [
          {
            text: "前端工程化",
            items: [
              {
                text: "前端规范搭建",
                link: "/front/engi/rule",
              },
              {
                text: "Monorepo理论与实践",
                link: "/front/engi/monorepo",
              },
              {
                text: "微前端架构浅析",
                link: "/front/engi/micro-front",
              },
            ],
          },
          {
            text: "前端基础",
            items: [
              {
                text: "前端常用Debugger技巧",
                link: "front/base/debugger",
              },
              {
                text: "浏览器工作原理",
                link: "front/base/browser",
              },
            ],
          },
          {
            text: "小程序",
            items: [
              {
                text: "包体积优化",
                link: "/front/mini/packageSize",
              },
              {
                text: "Uniapp踩坑合集",
                link: "/front/mini/uniapp",
              },
            ],
          },
          {
            text: "项目实践",
            items: [
              {
                text: "10分钟搭建一个属于自己的博客",
                link: "front/practice/blog",
              },
            ],
          },
        ],
      },
      {
        text: "back",
        items: [
          {
            text: "Framework",
            items: [
              {
                text: "Nest.js",
                link: "/back/nest",
              },
            ],
          },
          {
            text: "常用数据库浅析",
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
                text: "MarkDown",
                link: "/others/operation",
              },
            ],
          },
          {
            text: "网络与运维",
            items: [
              {
                text: "关于浏览器缓存那些事",
                link: "/others/maintain/cache",
              },
              {
                text: "Nginx",
                link: "/others/maintain/ng",
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
