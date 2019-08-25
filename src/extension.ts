import * as vscode from 'vscode';
import * as os from 'os';
import { isArray } from 'util';

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

// const config = vscode.workspace.getConfiguration();
// config.update("taskhere.tasks", [
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

// const config = vscode.workspace.getConfiguration();
// config.update("taskhere.tasks", {
// 	"gcc.exe": {
// 		"name": "gcc",
// 		"display": "show"
// 	}
// }, false);

function getPlatKV(t: any) {
	if (os.platform() === "win32") {
		return t.windows;
	}
	else if (os.platform() === "darwin") {
		return t.osx;
	}
	else {
		return t.linux;
	}
}

function getValue(t: any, g: any, k: string) {
	let pt = getPlatKV(t);
	if (typeof pt === 'object' && k in pt) {
		return pt[k];
	}
	if (k in t) {
		return t[k];
	}
	let gt = getPlatKV(g);
	if (typeof gt === 'object' && k in gt) {
		return gt[k];
	}
	if (k in g) {
		return g[k];
	}
}

function getValue2(t: any, g: any, k1: any, k2: any) {
	let pt = getPlatKV(t);
	if (typeof pt === 'object' && k1 in pt && k2 in pt[k1]) {
		return pt[k1][k2];
	}
	if (k1 in t && k2 in t[k1]) {
		return t[k1][k2];
	}
	let gt = getPlatKV(g);
	if (typeof gt === 'object' && k1 in gt && k2 in gt[k1]) {
		return gt[k1][k2];
	}
	if (k1 in g && k2 in g[k1]) {
		return g[k1][k2];
	}
}

function getTaskId(task: any, config:any): string | undefined {
	const props = [];
	const name = "label" in task ? task.label : task.taskName;
	const type = getValue(task, config, "type");
	const command = getValue(task, config, "command");
	const args = getValue(task, config, "args");
	props.push(name, type, command);
	if (isArray(args)) {
		for (const arg of args) {
			props.push(arg.value || arg);
		}
	}
	let id = '';
	for (const prop of props) {
		if (typeof prop === 'string') {
			id += prop.replace(/,/g, ',,') + ',';
		} else {
			return undefined;
		}
	}
	return id;
}

function loadTasks(context: vscode.ExtensionContext) {
	clear();

	// if taskhere.on == false, end function
	const config = vscode.workspace.getConfiguration();
	if (!(config.get("taskshere.on"))) {
		return;
	}

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

	let conf: any = {};

	for (const workspaceFolder of vscode.workspace.workspaceFolders!) {
		const config = vscode.workspace.getConfiguration('tasks', workspaceFolder.uri);
		if (!config || !Array.isArray(config.tasks)) {
			continue;
		}
		for (const task of config.tasks) {
			const id = getTaskId(task, config);
			// console.log(id);
			if (id) {
				conf[id] = {
					display: undefined,
					name: undefined
				};
				let display = getValue2(task, config, "options", "tasksHereDisplay");
				let name = getValue2(task, config, "options", "tasksHereName");
				conf[id]["display"] = typeof display === 'string'? display : undefined;
				conf[id]["name"] = typeof name === 'string'? name : undefined;
			}
		}
	}

	vscode.tasks.fetchTasks().then(async (tasks) => {
		for (const task of tasks) {
			let taskId = task.name + ',' + task.definition.id;

			if (task.source !== "Workspace") {
				continue;
			}
			if (!(taskId in conf)) {
				continue;
			}
			if (conf[taskId]["display"] === 'hide') {
				continue;
			}
			
			let name = conf[taskId]["name"] || task.name;

			const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 50);
			bar.text = name;
			bar.command = 'alexzshl.tasksHere.exec-task-' + commandIndex++;
			// bar.command = 'extension.alexzshl.vscodeTasks.' + task.name;
			bar.tooltip = 'Task: ' + task.name;
			bar.show();

			statusBarArray.push(bar);

			context.subscriptions.push(bar);
			let disposable = vscode.commands.registerCommand(bar.command, async () => {
				vscode.tasks.executeTask(task);
			});
			commandHandleArrray.push(disposable);
			context.subscriptions.push(disposable);
		}
	});
}

function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("extension.taskshere.on", async () => {
		const config = vscode.workspace.getConfiguration();
		config.update("taskshere.on", true, true).then(() => {
			vscode.window.showInformationMessage("Tasks Here Actived");
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand("extension.taskshere.off", async () => {
		const config = vscode.workspace.getConfiguration();
		config.update("taskshere.on", false, true).then(() => {
			vscode.window.showInformationMessage("Tasks Here Deactived");
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
