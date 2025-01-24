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
                text: "前端常见性能优化方案",
                link: "/front/base/performance/",
              },
              {
                text:"前端资源部署策略",
                link:"/front/engi/deploy/"
              },
              
              {
                text: "微前端架构浅析",
                link: "/front/engi/microFront/",
              },
              {
                text:"前端视角看CICD",
                link:"/front/engi/CICD/"
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
                text:"从前端视角看AI世界",
                link:"/front/base/Ai/"
              },
              {
                text: "vue2响应式原理",
                link: "/front/source/vue2/reactive/",
              },
              {
                text:'TS入门及实践',
                link:"/front/base/TS/"
              },
              {
                text: "10分钟搭建一个属于自己的博客",
                link: "/front/practice/blog/",
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
                text: "Uniapp对接微信原生SDK",
                link: "/front/mini/thirdSDK/",
              },
              {
                text: "Uniapp踩坑合集",
                link: "/front/mini/trap/",
              },
            ],
          }
          
        ],
      },
      {
        text: "back",
        items: [
          {
            text: "后端基础",
            items: [
              {
                text:"论全干工程师的自我修养",
                link:"/back/framework/chooseFrameWork/"
              },
              {
                text:"浅析后端三层架构",
                link:"/back/framework/structure/"
              },
             
              {
                text: "Nest入门与实践",
                link: "/back/framework/nest/",
              },
              {
                text:"Redis入门与实践",
                link:"/back/framework/redis/"
              },
              {
                text:"关系型数据与非关系型数据库",
                link:"/back/framework/database"
              },
              {
                text:"MySql入门与实践",
                link:"/back/framework/mysql"
              }

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
              {
                text:"Linux",
                link:"/others/operation/linux/"
              }
            ],
          },
          {
            text: "网络与运维",
            items: [
              {
                text: "Nginx",
                link: "/others/maintain/ng/",
              },
              {
                text:"Docker",
                link:"/others/maintain/docker/"
              },
              {
                text:"Jenkins",
                link:"/others/maintain/jenkins/"
              },
              {
                text: "浅析浏览器缓存",
                link: "/others/maintain/cache/",
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
