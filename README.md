# json-debeautifier README

Welcome to json-debeautifier, a Visual Studio Code extension designed to take beautified (formatted) JSON and collapse it into the most ugly (compact) form possible without altering the data itself. You may need this extension to be able to collapse your recently beautified JSON files to their former form or making them easier to transfer or store, without changing the structure.

## Features

* Collapse JSON: Select any JSON code in your active editor, and this extension will remove all unnecessary whitespace and line breaks, compressing it into a single line.

* Works on entire documents or selected parts: If nothing is selected, the extension collapses the entire JSON content of the document.

![Debeautify the JSON](https://res.cloudinary.com/desaiww43/image/upload/v1728812714/json_debeaut_fmema9.gif)

## Requirements

There are no special dependencies or requirements for this extension. It works out-of-the-box with any version of VS Code that is 1.94.0 or newer.

## Extension Settings

This extension does not contribute any additional settings at this time.


## Known Issues

* This extension does not support partial JSON objects (e.g., just a portion of a valid JSON file).


## Release Notes

### 1.0.2

* The extension now identifies and processes JSON objects and arrays within selected text.

### 1.0.1

* Added a proper logo

### 1.0.0

* Initial release of json-debeautifier.

* Supports collapsing of entire JSON documents or selected JSON code.

**Enjoy!**
