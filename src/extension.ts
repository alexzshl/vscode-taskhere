import * as vscode from 'vscode';

let statusBarArray: vscode.StatusBarItem[] = [];
let commandIndex = 0;
let commandHandleArrray: vscode.Disposable[] = [];

// let config = vscode.workspace.getConfiguration("tasks");
// let tasks: any = config.get("tasks");
// console.log(vscode.workspace.getConfiguration());
// console.log(config);
// for (const task of tasks) {
// 	console.log(task);
// }

// const tson = vscode.workspace.getConfiguration();
// tson.update("taskhere.on", true);
// console.log(tson.get("taskhere.globalShow"));
// console.log(tson.inspect("taskhere.globalShow"));
// tson.update("taskhere.tasks", [
// 	{
// 		"task": "gcc.exe",
// 		"name": "task name show on status bar",
// 		"show": true
// 	},
// 	{
// 		"task": "gcc.exe",
// 		"name": "g++",
// 		"show": true
// 	}
// ], false);

function load(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration();
	let act = config.get("taskhere.on");
	console.log(act);
	if (act) {
		loadTasks(context);
	} else {
		clear();
	}
}

function loadTasks(context: vscode.ExtensionContext) {
	// reset statusBarItems
	// statusBarArray.forEach(i => {
	// i.hide();
	// i.dispose();
	// });
	// statusBarArray = [];
	// reset registered commands
	// commandHandleArrray.forEach(i => {
	// i.dispose();
	// });
	// commandHandleArrray = [];

	clear();

	const config = vscode.workspace.getConfiguration();
	let act = config.get("taskhere.on");
	console.log(act);
	if (!(act)) {
		return;
	}

	// let taskhere_on = vscode.workspace.getConfiguration().get("taskhere.on");
	// console.log(taskhere_on);
	// let taskhere_show = vscode.workspace.getConfiguration().get("taskhere.show");
	// console.log(taskhere_show);

	// support for old method
	// const wsfs = vscode.workspace.workspaceFolders;
	// if (wsfs) {
	// for (const workspaceFolder of wsfs) {
	// const config = vscode.workspace.getConfiguration("tasks", workspaceFolder.uri);
	// const config = vscode.workspace.getConfiguration();
	// const config_tasks = config.tasks;
	// console.log(config);
	// console.log(config.tasks.version);
	// console.log('========================================================================================');
	// for (const task of config.tasks.tasks) {
	// console.log(task);
	// console.log(task.type);
	// console.log(task.label);
	// console.log(task.command);
	// console.log(task.args);
	// console.log(task.group);
	// console.log(task.options);
	// console.log('-------------------------');
	// }
	// console.log('==================================================');
	// }
	// }

	// const config = vscode.workspace.getConfiguration();
	// let globalShow = config.get("taskhere.globalShow");
	// let hide = [];
	// let tasks = vscode.workspace.getConfiguration("tasks");
	// for (const task of tasks.tasks) {
	// 	let hide_t = undefined;
	// 	if ("options" in task) {
	// 		if ("statusbar" in task.options) {
	// 			hide_t = task.options.statusbar;
	// 		}
	// 	}
	// 	console.log(hide_t);
	// 	let hide_b = undefined;
	// 	switch (hide_t) {
	// 		case "show":
	// 			hide_b = true;
	// 			break;
	// 		case "hide":
	// 			hide_b = false;
	// 			break;
	// 		default:
	// 			hide_b = undefined;
	// 			break;
	// 	}
	// 	hide.push(hide_t);
	// }
	// console.log(hide);


	// support for new version
	vscode.tasks.fetchTasks().then((tasks) => {
		// console.log(tasks);
		for (const task of tasks) {
			let name = task!.name;
			let taskId = task.definition.id;

			const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 50);
			bar.text = name;
			bar.command = 'alexzshl.vscodeTasks.exec-task_' + commandIndex++;
			// bar.command = 'extension.alexzshl.vscodeTasks.' + task.name;
			bar.show();
			// bar.tooltip = task.definition.id;
			statusBarArray.push(bar);

			context.subscriptions.push(bar);
			let disposable = vscode.commands.registerCommand(bar.command, () => {
				vscode.tasks.executeTask(task);
			});
			commandHandleArrray.push(disposable);
			context.subscriptions.push(disposable);
		}

	});
}

function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("extension.taskhere.on", () => {
		const config = vscode.workspace.getConfiguration();
		config.update("taskhere.on", true, true).then(() => {
			vscode.window.showInformationMessage("taskhere active");	
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand("extension.taskhere.off", () => {
		const config = vscode.workspace.getConfiguration();
		config.update("taskhere.on", false, true).then(() => {
			vscode.window.showInformationMessage("taskhere deactive");
		});
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
		// console.log("onDidChangeConfiguration...");
		loadTasks(context);
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
		// console.log("onDidChangeWorkspaceFolders...");
		loadTasks(context);
	}));

	// context.subscriptions.push(vscode.tasks.onDidStartTask((event) => {
	// 	console.log("start task: " + event.execution.task.name);
	// }));
	// context.subscriptions.push(vscode.tasks.onDidEndTask((event) => {
	// 	console.log("end task: " + event.execution.task.name);
	// 	console.log("end task: " + event.execution.task.execution);
	// }));

	loadTasks(context);
}

function clear() {
	statusBarArray.forEach(i => {
		i.dispose();
	});
	commandHandleArrray.forEach(i => {
		i.dispose();
	});
	commandIndex = 0;
}

function deactivate() {
	clear();
}

exports.activate = activate;
exports.deactivate = deactivate;
