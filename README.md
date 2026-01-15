# askills

一些 Claude Code Skills Skills 工具。

## 安装

```bash
# npm install
npm install -g askills

# 或使用 npx 直接运行（无需安装）
npx askills ls
```

## 使用方法

### 通过 Cli 安装 Skills

```bash
# 列出所有可用 Skills
askills ls

# 安装 Skills 到当前项目
askills install git-commit-message

# 全局安装（所有项目可用 ~/.claude）
askills install auto-vitepress -g

# 卸载Skills
askills uninstall git-commit-message
```

### 手动安装

将 `skills` 目录下你需要的 Skills 工具放在项目或者全局的 `.claude/skills/` 路径下即可生效。

参考文档：[Claude Code Skills 官方文档](https://code.claude.com/docs/zh-CN/skills)

## 命令说明

| 命令                          | 说明                           |
| ----------------------------- | ------------------------------ |
| `askills ls` / `askills list` | 列出所有可用 Skills            |
| `askills install <name>`      | 安装 Skills 到当前项目         |
| `askills install <name> -g`   | 全局安装到 `~/.claude/skills/` |
| `askills uninstall <name>`    | 卸载 Skills                    |

## 可用 Skills

详情请参考每个 skill 的 `SKILL.md`：

| Skills               | 说明                                    |
| -------------------- | --------------------------------------- |
| `git-commit-message` | 自动生成符合 Git 提交规范的提交信息     |
| `auto-vitepress`     | 自动为当前项目生成或更新 VitePress 文档 |

## License

Apache License 2.0
