import * as vscode from 'vscode';

class MyStatuBar {
	public items: { item: vscode.StatusBarItem, commandHandle: vscode.Disposable }[] = [];
	public loadTasks(asd:string) {
		return "hello";
	}
}
const app = new MyStatuBar();
console.log(app.loadTasks("asdad"));

console.log(app);
