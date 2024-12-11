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
                link: "/front/engi/rule.md",
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
                link: "/others/operation/md",
              },
            ],
          },
          {
            text: "运维相关",
            items: [
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
