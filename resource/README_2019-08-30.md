# Tasks Here

Load VSCode-tasks into status bar.

[![version](https://img.shields.io/visual-studio-marketplace/v/alexzshl.tasks-here?style=flat-square&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=alexzshl.tasks-here)
[![license](https://img.shields.io/github/license/alexzshl/vscode-taskshere?style=flat-square)](https://github.com/alexzshl/vscode-taskshere/blob/master/LICENSE)

Notice: version 3.0.0 starts to use the new configuration form in **tasks.json**, the previous users please try to migrate.

## Derived

This extension derived from another VSCode extension and based on v0.2.7:

[![version](https://img.shields.io/visual-studio-marketplace/v/actboy168.tasks?style=flat-square&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=actboy168.tasks)

## Preview

![preview](resource/image/preview.png)

## Features

- Load VSCode-tasks into status bar
- Customize the name of the status bar item
- Customize the name with VSCode builtin icons
- Customize the foreground of the status bar item

## Configuration - tasks.json

For ease of configuration,this extension personalize tasks with **tasks.json**.

If you want to hide a task, add an configuration in tasks.json:

[*options-tasksHere-display*]

```json
        {
            "type":"shell",
            "label":"test",
            "command": "echo",
            "args": [
                "arg1"
            ],
            "options": {
                "tasksHere": {
                    "display": false
                }
            }
        }
```

If the task name is too long to fit for display and you don't want to change it, you can customize it by add an configuration in tasks.json:

[*options-tasksHere-name*]

```json
        {
            "type":"shell",
            "label":"g++.exe build active file",
            "command": "g++",
            "args": [
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "options": {
                "tasksHere": {
                    "name": "g++"
                }
            }
        }
```

You can "add" a built-in icon to the task name with a special syntax, which will appear as an icon on the status bar:

[*options-tasksHere-name*]

```json
        {
            "type":"shell",
            "label":"test",
            "command": "echo",
            "args": [
                "arg1"
            ],
            "options": {
                "tasksHere": {
                    "name": "$(squirrel) test"
                }
            }
        }
```

![icon-in-label](resource/image/new/label_icon.png)

You can find a list of built-in icons provided by VSCode on this page:

[![icons-in-labels](https://img.shields.io/badge/VS%20Code-icons--in--labels-blue?logo=visual-studio-code&style=flat-square)](https://code.visualstudio.com/api/references/icons-in-labels)

You can specify the foreground of the task name.You can use legal color expressions supported by CSS. For example: "DeepPink", "#00f", "#adff2f".Or use the color picker(hover over the color string) provided by VSCode to select the color directly.If you use icon,the foreground of the icon will change as well.

[*options-tasksHere-color*]

```json
       {
            "type": "shell",
            "label": "cpp.exe build active file",
            "command":"C:\\MinGW64\\x86_64-8.1.0-release-win32-seh-rt_v6-rev0\\mingw64\\bin\\cpp.exe",
            "args": [
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "options": {
                "cwd": "C:\\MinGW64\\x86_64-8.1.0-release-win32-seh-rt_v6-rev0\\mingw64\\bin",
                "tasksHere": {
                    "name": "cpp",
                    "color": "#ff00ff"
                }
            }
        }
```

![label_color](resource/image/new/label_color.png)

![label_color](resource/image/new/labe_color_selector.png)

## Settings

Configuration with VSCode settings:

- `taskshere.on` - Enable/Disable the extension
- `taskshere.display` - Global display for tasks.Default is true.If you have too many tasks, you can set it to false, then display the tasks you want to display by configuring tasks.json
- `taskshere.color` - Global foreground color for tasks

## Commands

The following commands are provided, which can be accessed from the command palette (F1), or bound to keys:

- `taskshere.refresh`
- `taskshere.on`
- `taskshere.off`
