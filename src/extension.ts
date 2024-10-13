import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	const disposable = vscode.commands.registerCommand('json-debeautifier.debeautifyMyJSON', () => {

		vscode.window.showInformationMessage('JSON Debeautifier do be working eh?');
	
		const editor = vscode.window.activeTextEditor;

		if(!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}
	
		const document = editor.document;
		const selection = editor.selection;
		const selectedText = document.getText(selection) || document .getText();

		try {

			const jsonObject = JSON.parse(selectedText);
			const collapsedJSON = JSON.stringify(jsonObject);

			editor.edit(editBuilder => {
				if(!selection.isEmpty){
					editBuilder.replace(selection, collapsedJSON);
				} else {
					const firstLine = document.lineAt(0);
					const lastLine = document.lineAt(document.lineCount - 1);
					const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
					editBuilder.replace(fullRange, collapsedJSON);
				}
			});
		} catch(error){
			vscode.window.showErrorMessage('Invalid JSON selected. Please select a valid JSON');
		}
	});

	context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() {}
