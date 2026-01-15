---
name: git-commit-message
description: 读取暂存区变更（git diff --cached）并参考 git log 的最近提交风格生成提交消息。适用于用户让你读取暂存区、总结暂存变更或建议提交消息的场景。

## 安装

通过 askills 安装：

```bash
# 本地安装
askills install git-commit-message

# 全局安装
askills install git-commit-message -g
```
---

# Git 提交消息

## 概述

根据暂存区变更生成单行提交消息，并匹配仓库近期的提交风格与语言。

## 流程

1.  确认变更范围
    - 执行 `git status --short`。
    - 若无任何变更（暂存区和工作区都干净），说明情况并停止。
    - 若只有未暂存变更，询问用户是否基于未暂存变更生成消息。默认为否。
    - 默认处理暂存区变更。如果用户确认，则后续流程使用 `git diff` 而非 `git diff --cached`。

2.  读取变更内容
    - 根据第 1 步的选择，执行 `git diff --cached`（暂存区）或 `git diff`（未暂存区）。
    - **优化**：通过 `git diff --cached --numstat` 或 `git diff --numstat` 统计变更行数。如果总行数超过 100 行，则后续分析使用 `git diff --cached --stat` 或 `git diff --stat` 的摘要信息，以提升效率。

3.  匹配仓库风格
    - 执行 `git log -5 --pretty=format:%s` 获取最近 5 条提交消息的主题行。
    - 分析这些主题行的前缀（如 `feat:`、`fix:`、`docs:`）和语言风格。
    - **优化（处理新仓库）**：如果 `git log` 返回为空（即新仓库），则默认采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范（如 `feat: `、`fix: `）。

4.  起草提交消息
    - 根据变更内容和仓库风格，生成一个简洁、准确的主题行。
    - **优化（支持多行消息）**：如果变更复杂（例如，修改了多个模块或变更行数超过 100 行），在主题行之下增加一个空行和简要的正文（body），说明变更的背景、目的和主要内容。
    - 如果暂存区包含多种不相关的改动，建议用户拆分提交，或给出一个能涵盖所有改动的通用消息。

5.  回复
    - 输出推荐的单行或多行提交消息。
    - 如果工作区有未暂存的改动而本次处理的是暂存区，可以补充一句提醒，说明未暂存的改动不会被包含在消息内。