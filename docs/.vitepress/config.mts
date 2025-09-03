import { defineConfig } from "vitepress";
import utils from "./utils";
const { getSideBar } = utils;

export default defineConfig({
  base: "/charlie-blog/",
  title: "Charlie Blog",
  description: "Welcome to Charlie's blog!",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/charlie-blog/websiteLogo.svg",
      },
    ],
  ],
  cleanUrls: true,
  themeConfig: {
    logo: "/websiteLogo.svg",
    outline: "deep",
    nav: [
      { text: "Home", link: "/" },
      { text: "Front-end", link: "/front/engi/rule", activeMatch: "/front/" },
      {
        text: "Back-end",
        link: "/back/framework/chooseFrameWork",
        activeMatch: "/back/",
      },
      {
        text: "Others",
        link: "/others/operation/git",
        activeMatch: "/others/",
      },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/front/": getSideBar("front"),
      "/back/": getSideBar("back"),
      "/others": getSideBar("others"),
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/doggyegg/charlie-blog" },
    ],
    footer: {
      message: "本站所有内容均为原创，转载请注明出处",
      copyright: "Copyright © 2024-present charlie-chen",
    },
  },
});
