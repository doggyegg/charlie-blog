import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/charlie-blog/",
  title: "Charlie Blog",
  description: "Welcome to Charlie's blog!",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Front-end", link: "/front-end/index" },
      { text: "Back-end", link: "/back-end/index" },
      { text: "Others", link: "/others/index" },
    ],
    sidebar: [
      {
        text: "Examples1",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/doggyegg/charlie-blog" },
    ],
    footer: {
      message: "本站所有内容均为原创，转载请注明出处",
      copyright: "Copyright © 2024-present charlie-chen",
    },
  },
});
