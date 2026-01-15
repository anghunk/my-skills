#!/usr/bin/env node

import { readFileSync, existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取内置技能列表
function getBuiltInSkills() {
  const skillsDir = join(__dirname, 'skills');
  const skills = [];

  if (existsSync(skillsDir)) {
    const items = readdirSync(skillsDir);
    for (const item of items) {
      const itemPath = join(skillsDir, item);
      const stat = statSync(itemPath);
      if (stat.isDirectory()) {
        const skillPath = join(itemPath, 'SKILL.md');
        if (existsSync(skillPath)) {
          skills.push({
            name: item,
            path: itemPath,
            hasSkill: true
          });
        }
      }
    }
  }

  return skills;
}

// 获取目标安装目录
function getTargetDir(global = false) {
  if (global) {
    const os = process.platform;
    let homeDir;
    if (os === 'win32') {
      homeDir = process.env.USERPROFILE;
    } else {
      homeDir = process.env.HOME;
    }
    return join(homeDir, '.claude', 'skills');
  }
  return join(process.cwd(), '.claude', 'skills');
}

// 确保 .claude/skills 目录存在
function ensureTargetDir(targetDir) {
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
}

// 获取 askills 版本号
function getVersion() {
  const packagePath = join(__dirname, 'package.json');
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
  return pkg.version;
}

// 获取已安装的技能列表
function getInstalledSkills(targetDir) {
  const skills = [];

  if (existsSync(targetDir)) {
    const items = readdirSync(targetDir);
    for (const item of items) {
      const itemPath = join(targetDir, item);
      const stat = statSync(itemPath);
      if (stat.isDirectory()) {
        const skillPath = join(itemPath, 'SKILL.md');
        skills.push({
          name: item,
          installed: existsSync(skillPath)
        });
      }
    }
  }

  return skills;
}

// 显示帮助
function showHelp() {
  console.log(`
askills - 管理 Claude Code 技能工具

用法:
  askills <命令> [选项]

命令:
  askills ls / list              列出所有可用技能
  askills install <name>          安装技能到当前项目 (.claude/skills/)
  askills install <name> -g       全局安装 (~/.claude/skills/)
  askills uninstall <name>        卸载指定技能
  askills upgrade / update          升级 askills 到最新版本

选项:
  -g, --global                  全局安装/卸载模式
  -v, --version                 显示版本号
  -h, --help                   显示帮助信息

示例:
  askills ls
  askills install git-commit-message
  askills install auto-vitepress -g
  askills uninstall git-commit-message
  askills update
  askills -v
`);
}

// list 命令
function listCommand(global) {
  const builtIn = getBuiltInSkills();
  const targetDir = getTargetDir(global);
  const installed = getInstalledSkills(targetDir);
  const installedNames = new Set(installed.map(s => s.name));

  console.log('\n可用技能:\n');

  builtIn.forEach(skill => {
    const status = installedNames.has(skill.name) ? ' [已安装]' : '';
    console.log(`  ${skill.name}${status}`);
  });

  console.log('');
}

// install 命令
function installCommand(skillName, global) {
  const builtIn = getBuiltInSkills();
  const skill = builtIn.find(s => s.name === skillName);

  if (!skill) {
    console.error(`错误：找不到技能 "${skillName}"`);
    console.error('\n使用 "askills list" 查看可用技能列表。');
    process.exit(1);
  }

  const targetDir = getTargetDir(global);
  ensureTargetDir(targetDir);
  const targetPath = join(targetDir, skillName);

  const doInstall = () => {
    try {
      cpSync(skill.path, targetPath, { recursive: true });
      console.log(`✓ 技能 "${skillName}" 已安装到 ${targetPath}`);
    } catch (error) {
      console.error(`安装失败：${error.message}`);
      process.exit(1);
    }
  };

  if (existsSync(targetPath)) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`技能 "${skillName}" 已存在于 ${targetPath}\n是否覆盖？(yes/no): `, (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        rmSync(targetPath, { recursive: true, force: true });
        doInstall();
      } else {
        console.log('已取消安装');
      }
    });
  } else {
    doInstall();
  }
}

// uninstall 命令
function uninstallCommand(skillName, global) {
  const targetDir = getTargetDir(global);
  const targetPath = join(targetDir, skillName);

  if (!existsSync(targetPath)) {
    console.error(`错误：技能 "${skillName}" 未安装`);
    return;
  }

  try {
    rmSync(targetPath, { recursive: true, force: true });
    console.log(`✓ 技能 "${skillName}" 已卸载`);
  } catch (error) {
    console.error(`卸载失败：${error.message}`);
    process.exit(1);
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // 处理 --version 或 -v
  if (command === '--version' || command === '-v') {
    console.log(`askills v${getVersion()}`);
    return;
  }

  if (!command || command === '-h' || command === '--help') {
    showHelp();
    return;
  }

  const globalIndex = args.indexOf('-g') !== -1 ? args.indexOf('-g') : args.indexOf('--global');
  const isGlobal = globalIndex !== -1;

  switch (command) {
    case 'list':
    case 'ls':
      listCommand(isGlobal);
      break;

    case 'install':
      if (!args[1] || args[1].startsWith('-')) {
        console.error('错误：请指定要安装的技能名称');
        console.error('用法：askills install <skill-name> [--global]');
        process.exit(1);
      }
      installCommand(args[1], isGlobal);
      break;

    case 'uninstall':
      if (!args[1] || args[1].startsWith('-')) {
        console.error('错误：请指定要卸载的技能名称');
        console.error('用法：askills uninstall <skill-name> [--global]');
        process.exit(1);
      }
      uninstallCommand(args[1], isGlobal);
      break;

    case 'upgrade':
    case 'update':
      // 升级指令 - 更新 askills 本身
      console.log(`当前版本：askills v${getVersion()}`);
      console.log('请使用 npm 更新 askills:');
      console.log('  npm install -g askills@latest');
      console.log('  或 npm update -g askills');
      break;

    default:
      console.error(`错误：未知命令 "${command}"`);
      showHelp();
      process.exit(1);
  }
}

main();
