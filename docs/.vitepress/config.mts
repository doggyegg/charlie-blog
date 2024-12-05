import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/charlie-blog/",
  title: "Charlie Blog",
  description: "Welcome to Charlie's blog!",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Front-end", link: "/blogs/front-end" },
      { text: "Back-end", link: "/blogs/back-end" },
      { text: "Others", link: "/blogs/others" },
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
  },
});
