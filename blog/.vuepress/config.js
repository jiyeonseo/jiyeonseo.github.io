const path = require("path");
const feed_options = {
  canonical_base: "https://jiyeonseo.github.io",
  sort: entries => entries.sort( (a,b) => b.date - a.date )
};

module.exports = {
  title: "Daily Log",
  description: "Blog by developer cheese",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "../assets/favicons/apple-touch-icon.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "../assets/favicons/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "../assets/favicons/favicon-16x16.png"
      }
    ],
    ["link", { rel: "shortcut icon", href: "../assets/favicons/favicon.ico" }]
  ],
  theme: "@vuepress/theme-blog",
  alias: {
    "@assets": path.resolve(__dirname, "../assets")
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-63830559-1"
      }
    ],
    ["feed", feed_options],
    ['@maginapp/vuepress-plugin-katex', { delimiters: 'dollars' }],
  ],
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    dateFormat: "YYYY-MM-DD",
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions;
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: "Blog",
        link: "/"
      },
      {
        text: "Tags",
        link: "/tag/"
      },
      {
        dirname: "about.html",
        text: "About Me",
        link: "/about",
      }
    ],
    feed: {
      canonical_base: "https://jiyeonseo.github.io/",
      rss: true,
      atom: true,
      json: true
    },
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/jiyeonseo"
        },
        {
          type: "twitter",
          link: "https://twitter.com/seojeee"
        }
      ],
      copyright: [
        {
          text: "Copyright © Jiyeon Seo 2020",
          link: ""
        }
      ]
    }
  }
};
