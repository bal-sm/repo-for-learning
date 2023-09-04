# `tasks.json` of VSCode for Django

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "options": {
        "env": {
            // Don't forget to add for e.g DJANGO_SETTINGS_MODULE=project.setting.local withing settings.json for your workspace
            "DJANGO_SETTINGS_MODULE": "${config:DJANGO_SETTINGS_MODULE}",
        }
    },
    "tasks": [
        {
            "label": "Django Show Migrations",
            "type": "shell",
            "detail": "Show migrations for whole django project.",
            "command": "${config:python.defaultInterpreterPath}",
            "args": [
                "manage.py",
                "showmigrations",
            ],
            // just skip prompt for matchers
            "problemMatcher": [],
            "options": {
                "cwd": "${workspaceFolder}",
            },
        },
        {
            "label": "Django Make Migrations For App",
            "type": "shell",
            "detail": "Make migrations for particular django app.",
            "command": "${config:python.defaultInterpreterPath}",
            "args": [
                "manage.py",
                "makemigrations",
                "${input:appNamesCommand}"
            ],
            // just skip prompt for matchers
            "problemMatcher": [],
            "options": {
                "cwd": "${workspaceFolder}"
            },
        },
        {
            "label": "Django Migrate For App",
            "type": "shell",
            "detail": "Apply or unapply migrations for particular django app.",
            "command": "${config:python.defaultInterpreterPath}",
            "args": [
                "manage.py",
                "migrate",
                "${input:appNamesCommand}",
                "${input:migrationsForAppNameCommand}",
            ],
            // just skip prompt for matchers
            "problemMatcher": [],
            "options": {
                "cwd": "${workspaceFolder}"
            },
        },
        {
            "label": "Django Migrate",
            "type": "shell",
            "detail": "Apply migrations for whole django project.",
            "command": "${config:python.defaultInterpreterPath}",
            "args": [
                "manage.py",
                "migrate",
            ],
            // just skip prompt for matchers
            "problemMatcher": [],
            "options": {
                "cwd": "${workspaceFolder}"
            },
        },
        {
            "label": "Django Run Custom Command",
            "type": "shell",
            "detail": "Run custom management command.",
            "command": "${config:python.defaultInterpreterPath}",
            "args": [
                "manage.py",
                "${input:availableCommandNamesCommand}",
            ],
            // just skip prompt for matchers
            "problemMatcher": [],
            "options": {
                "cwd": "${workspaceFolder}"
            },
        },
    ],
    "inputs": [
        {
            "id": "migrationsForAppNameCommand",
            "command": "shellCommand.execute",
            "args": {
                // tail -n +2 - just skip first line which contains name for an app
                // sed -E 's/ \\[X\\] | \\[ \\] //g'  - simple regex to skip django markings for applied|unapplied 
                "command": "${config:python.defaultInterpreterPath} manage.py showmigrations ${input:appNamesCommand} | tail -n +2 | sed -E 's/ \\[X\\] | \\[ \\] //g' ",
                "cwd": "${workspaceFolder}",
                "env": {
                    // For some reason shellCommand.execute could not take envs from tasks global envs: line 6
                    "DJANGO_SETTINGS_MODULE": "${config:DJANGO_SETTINGS_MODULE}",
                },
                "description": "Chose migration module to run",
            },
            "type": "command"
        },
        {
            "id": "appNamesCommand",
            "command": "shellCommand.execute",
            "args": {
                "command": "echo 'from django.conf import settings;\nfor app in settings.INSTALLED_APPS:\n\tprint(app.rsplit(\".\")[-1])' | ${config:python.defaultInterpreterPath} manage.py shell",
                "cwd": "${workspaceFolder}",
                "env": {
                    // For some reason shellCommand.execute could not take envs from tasks global envs: line 6
                    "DJANGO_SETTINGS_MODULE": "${config:DJANGO_SETTINGS_MODULE}",
                },
                "description": "Chose django app",
            },
            "type": "command"
        },
        {
            "id": "availableCommandNamesCommand",
            "command": "shellCommand.execute",
            "args": {
                "command": "${config:python.defaultInterpreterPath} manage.py help --commands",
                "cwd": "${workspaceFolder}",
                "env": {
                    // For some reason shellCommand.execute could not take envs from tasks global envs: line 6
                    "DJANGO_SETTINGS_MODULE": "${config:DJANGO_SETTINGS_MODULE}",
                },
                "description": "Chose management command",
            },
            "type": "command"
        },
    ]
}
```

- Tidak lupa, install ext [ini](https://marketplace.visualstudio.com/items?itemName=augustocdias.tasks-shell-input).

> Thanks to @romaha from Medium. Read [more](https://medium.com/@romaha/vs-code-custom-tasks-for-python-web-development-422a4d31dd8c).
