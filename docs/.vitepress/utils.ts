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
            text: "运维",
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
