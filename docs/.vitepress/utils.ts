export default {
  getSideBar(path) {
    const wholeList = [
      {
        text: "front",
        // collapsed: true,
        items: [
          {
            text: "Html",
            items: [
              {
                text: "瀑布流",
                link: "/front/waterfall",
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
