import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'askills',
  description: '一些 Claude Code Skills 工具',
  themeConfig: {
    // Logo（未找到图片，使用 VitePress 官方默认 logo）
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/anghunk/my-skills' }
    ],
    // 侧边栏
    sidebar: [
      {
        text: 'CLI 命令',
        collapsed: false,
        items: [
          { text: '命令说明', link: '/commands' },
          { text: '安装与使用', link: '/installation' }
        ]
      },
      {
        text: '可用 Skills',
        collapsed: false,
        items: [
          { text: 'git-commit-message', link: '/skills/git-commit-message' },
          { text: 'auto-vitepress', link: '/skills/auto-vitepress' }
        ]
      }
    ],
    // 底部信息
    footer: {
      message: '基于 Apache License 2.0 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()} anghunk`
    },
    // 显示文档最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
