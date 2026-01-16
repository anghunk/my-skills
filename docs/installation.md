# 安装与使用

## 安装 askills

### 通过 npm 全局安装

```bash
npm i askills -g
askills ls # 查看全部 skills
```

### 通过 npx 直接使用（无需安装）

```bash
npx askills ls
```

## 安装 Skills

### 本地安装

安装 Skills 到当前项目的 `.claude/skills/` 目录：

```bash
askills install <name>
```

### 全局安装

安装 Skills 到全局 `~/.claude/skills/` 目录，所有项目都可以使用：

```bash
askills install <name> -g
```

### 覆盖已安装的 Skills

如果目标 Skills 已存在，会询问是否覆盖：

```bash
askills install <name> -g

# 输出：
# Skills "<name>" 已存在于 /Users/user/.claude/skills/<name>
# 是否覆盖？(yes/no):
```

- 输入 `yes` 或 `y` → 覆盖安装
- 其他输入 → 取消安装

## 卸载 Skills

```bash
# 本地卸载
askills uninstall <name>

# 全局卸载<name>
askills uninstall <name> -g
```

## 手动安装

将 `skills` 目录下你需要的 Skills 工具放在项目或者全局的 `.claude/skills/` 路径下即可生效。

参考文档：[Claude Code Skills 官方文档](https://code.claude.com/docs/zh-CN/skills)
