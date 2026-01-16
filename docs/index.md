---
layout: home

hero:
  name: askills
  tagline: 可通过 askills 命令安装内置 skills 到当前项目或者全局目录。
  actions:
    - theme: brand
      text: 使用教程
      link: /installation

features:
  - title: CLI 工具
    details: 简单易用的命令行工具，快速安装和管理 Claude Code Skills
  - title: 多个 Skills
    details: 包含 git-commit-message 和 auto-vitepress 等实用 Skills
  - title: 开源
    details: Apache License 2.0，欢迎贡献
---

## 什么是 askills？

askills 是一个 npm 包，提供了命令行工具来管理 Claude Code Skills 的安装、卸载和查看。

## 快速开始

### 安装 askills

```bash
# 全局安装
npm i askills -g

# 或使用 npx 直接运行（无需安装）
npx askills ls
```

### 安装 Skills

```bash
# 列出所有可用Skills
askills ls

# 安装 Skills 到当前项目
askills install <name>

# 全局安装（所有项目可用 ~/.claude）
askills install <name> -g
```
