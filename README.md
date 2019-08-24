# Task Here

loads vscode-tasks to status bar

This project evolved from the following project:
[vscode-tasks](https://github.com/actboy168/vscode-tasks)

## Extension Settings

Ctrl+Shift+P
search taskshere and active or deactive extension

## Preview

[![preview](https://raw.githubusercontent.com/alexzshl/vscode-taskshere/master/src/resource/preview.png)

## Settings

For ease of configuration, this extension takes the form of directly configuring **tasks.json**

By default, this extension will show all vscode-tasks on the status bar.If you want to hide a task, add the following configuration:

```json
        {
            "type":"shell",
            "label":"test",
            "command": "echo",
            "args": [
                "arg1"
            ],
            "options": {
                "tasksHereDisplay": "hide"
            }
        }
```

By default, this extension uses the label of the task as the display name on the status bar. But if these names are too long to fit for display, you can customize the name with the following configuration:

```json
        {
            "type":"shell",
            "label":"the label is long to show",
            "command": "echo",
            "args": [
                "arg1"
            ],
            "options": {
                "tasksHereName": "test"
            }
        }
```

If you prefer, you can even customize a name with an icon to help you better distinguish between tasks. This feature is provided by the VSCode API

```json
        {
            "type":"shell",
            "label":"this label is to long to display",
            "command": "echo",
            "args": [
                "arg1"
            ],
            "options": {
                "tasksHereName": "$(squirrel) test"
            }
        }
```

You can find a list of built-in icons provided by VSCode on this page: [icons-in-labels](https://code.visualstudio.com/api/references/icons-in-labels)

![name with icon](https://raw.githubusercontent.com/alexzshl/vscode-taskhere/master/src/resource/labelwithicon.png)
