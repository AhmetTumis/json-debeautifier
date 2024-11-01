import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


    const disposable = vscode.commands.registerCommand('json-debeautifier.debeautifyMyJSON', () => {
        
        vscode.window.showInformationMessage('JSON Debeautifier do be working eh?');

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor detected.');
        	return;
        }

        const document = editor.document;
        const selection = editor.selection;

        // Function to debeautify selected portion of JSON
        const debeautifySelectedJSON = (selectedText: string): string => {
            const leadingWhitespace = selectedText.match(/^\s*/)?.[0] || '';
            const trailingWhitespace = selectedText.match(/\s*$/)?.[0] || '';

            let finalText = selectedText.trim();
            const scopesToDebeautify: { start: number; end: number }[] = [];
            const stack: number[] = [];

            // Iterate through the selected text to identify complete JSON structures
            for (let i = 0; i < finalText.length; i++) {
                const char = finalText[i];

                // Identifying start of a JSON object / array
                if (char === '{' || char === '[') {
                    stack.push(i);
                } else if (char === '}' || char === ']') {
                    if (stack.length > 0) {
                        const start = stack.pop()!;
                        const end = i + 1;

                        // Validate if the entire scope is within the selection bounds
                        if (start >= 0 && end <= finalText.length) {
                            scopesToDebeautify.push({ start, end });
                        }
                    }
                }
            }

            // Debeautify found scopes
            if (scopesToDebeautify.length > 0) {
                // Sort matches by start index to prevent replacement conflicts
                scopesToDebeautify.sort((a, b) => b.start - a.start);

                // Replace each identified scope
                for (const { start, end } of scopesToDebeautify) {
                    const scopeText = finalText.slice(start, end);

                    // Debeautify the content of the scope
                    const debeautifiedScope = scopeText
                        .replace(/(\s*:\s*)/g, ':')
                        .replace(/(\s*,\s*)/g, ',')
                        .replace(/(\s+)/g, ' ')
                        .replace(/"\s+/g, '"')
                        .replace(/\s+"/g, '"')
                        .trim();

                    // Update the final text with the debeautified scope
                    finalText = finalText.slice(0, start) + debeautifiedScope + finalText.slice(end);
                }

                return `${leadingWhitespace}${finalText}${trailingWhitespace}`;
            } else {
                vscode.window.showErrorMessage('Invalid JSON selected. Please select a valid JSON');
                return '';
            }
        };

        // Function to debeautify the entire document
        const debeautifyWholeJSON = (text: string): string => {
            try {
                const jsonObject = JSON.parse(text);
                return JSON.stringify(jsonObject);
            } catch(error) {
            	vscode.window.showErrorMessage('Invalid JSON selected. Ensure your document contains valid JSON syntax.');
            	return '';
            }
        };

        // Determine to debeautify whole JSON file or selected portion of the JSON file
        let finalText: string;
        if (!selection.isEmpty) {
            const selectedText = document.getText(selection);
            finalText = debeautifySelectedJSON(selectedText);
        } else {
            finalText = debeautifyWholeJSON(document.getText());
        }

        // Apply changes to the editor
        if (finalText) {
            editor.edit(editBuilder => {
                if (!selection.isEmpty) {
                    editBuilder.replace(selection, finalText);
                } else {
                    const firstLine = document.lineAt(0);
                    const lastLine = document.lineAt(document.lineCount - 1);
                    const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
                    editBuilder.replace(fullRange, finalText);
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
