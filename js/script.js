
// #region HTML References

// table elements

const smartTable = document.getElementById("smart-table");
const boxTable = document.getElementById("box-table");
const csvInput = document.getElementById("csvInput");
const markdownTable = document.getElementById("markdown-table");

// copy buttons
const copyButton = document.getElementById("copy");
const copyMarkdownButton = document.getElementById("copy-markdown");

// table buttons
const addRowButton = document.getElementById("add-row");
const removeRowButton = document.getElementById("remove-row");
const addColButton = document.getElementById("add-col");
const removeColButton = document.getElementById("remove-col");
const clearButton = document.getElementById("clear");
const resetButton = document.getElementById("reset");

// box table options
const styleSelector = document.getElementById("styleSelect");
const topCheckbox = document.getElementById("top");
const crossCheckbox = document.getElementById("cross");
const bottomCheckbox = document.getElementById("bottom");

// markdown options
const prettifyCheckbox = document.getElementById("prettify");

// #endregion


// populate the style selector with the available styles
for (let i = 0; i < boxTypes.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = boxTypes[i].name;
    styleSelector.appendChild(option);
}

// State variables
var cols = 3;
var rows = 4;
var readingFromCSV = false;

var boxTableOptions = {
    styleId: 0,
    top: false,
    cross: false,
    bottom: false
};


// Define a new table object and create the default table
var table = new Table(cols, rows);
table.defaultTable();
table.createTable(smartTable);
renderAll();

table.setInputCallback(renderAll);

function renderAll() {
    let tableUpdated = table.updateTable();
    if (!tableUpdated)
        table.createTable(smartTable);

    let styleId = styleSelector.value;
    boxTableOptions.styleId = styleId;

    csvInput.value = table.renderAsCSV();
    boxTable.innerHTML = table.renderAsBoxTable(boxTableOptions);
    markdownTable.innerHTML = table.renderAsMarkdown();
}

// #region Event Listeners

// Add event listeners to the buttons
addRowButton.addEventListener("click", () => {
    table.addRow();
    renderAll();
});
removeRowButton.addEventListener("click", () => {
    table.removeRow();
    renderAll();
});
addColButton.addEventListener("click", () => {
    table.addColumn();
    renderAll();
});
removeColButton.addEventListener("click", () => {
    table.removeColumn();
    renderAll();
});
clearButton.addEventListener("click", () => {
    table.clearTable();
    renderAll();
});
resetButton.addEventListener("click", () => {
    // delete the current table if it exists
    smartTable.innerHTML = "";

    table = new Table();

    table.defaultTable();
    renderAll();
});

// Add event listener to the style selector
styleSelector.addEventListener("change", () => {
    let styleId = styleSelector.value;
    boxTableOptions.styleId = styleId;

    boxTable.innerHTML = table.renderAsBoxTable(boxTableOptions);
});

// Add event listeners to the checkboxes
topCheckbox.addEventListener("change", () => {
    let top = topCheckbox.checked;
    boxTableOptions.top = top;
    boxTable.innerHTML = table.renderAsBoxTable(boxTableOptions);
});
crossCheckbox.addEventListener("change", () => {
    let cross = crossCheckbox.checked;
    boxTableOptions.cross = cross;
    boxTable.innerHTML = table.renderAsBoxTable(boxTableOptions);
});
bottomCheckbox.addEventListener("change", () => {
    let bottom = bottomCheckbox.checked;
    boxTableOptions.bottom = bottom;
    boxTable.innerHTML = table.renderAsBoxTable(boxTableOptions);
});

// Add event listener to the prettify checkbox
prettifyCheckbox.addEventListener("change", () => {
    let prettify = prettifyCheckbox.checked;
    markdownTable.innerText = table.renderAsMarkdown(prettify);
});

// add an event listener to the textarea to generate when a key is pressed
csvInput.addEventListener("input", () => {
    readingFromCSV = true;
    readFromCSVModule();
});

// Copy

// define an array that contains each button and its corresponding table
var copyButtons = [
    { button: copyButton, table: boxTable },
    { button: copyMarkdownButton, table: markdownTable }
];

for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].button.addEventListener("click", (e) => {
        copyToClipboard(copyButtons[i].table.innerText);
        buttonTextSwap(e, "Copied!");
    });
}
// #endregion


// read from CSV
function readFromCSVModule() {
    // use csv-js.js to parse the CSV

    var csvString = csvInput.value;
    try {
        var rows = CSV.parse(csvString);
    }
    catch (e) {
        // add "error" class to the textarea
        csvInput.classList.add("error");
        console.error(e);
        return;
    }
    // remove "error" class from the textarea
    csvInput.classList.remove("error");

    var cols = rows[0].length;

    table = new Table(cols, rows.length);
    table.createTable(smartTable, true);

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            let data = rows[i][j];
            table.setCell(i, j, data);
        }
    }

    renderAll();
}

// ┌──────┬─────┬───────────┐
// │ Name │ Age │ Job       │ ▒
// ├──────┼─────┼───────────┤ ▒
// │ John │ 25  │ Developer │ ▒
// ├──────┼─────┼───────────┤ ▒
// │ Jane │ 22  │ Designer  │ ▒
// ├──────┼─────┼───────────┤ ▒
// │ Doe  │ 30  │ Manager   │ ▒
// └──────┴─────┴───────────┘ ▒
//   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

// │ Name │ Age │ Job       │ ▒
// ├──────┼─────┼───────────┤ ▒
// │ John │ 25  │ Developer │ ▒
// │ Jane │ 22  │ Designer  │ ▒
// │ Doe  │ 30  │ Manager   │ ▒
//   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▒



// #region Helper functions
function buttonTextSwap(e, text) {
    // get the current button text
    var oldText = e.target.innerText;
    // set the button text to the new text
    e.target.innerText = text;
    // set a timeout to revert the text back to the previous text
    setTimeout(() => {
        e.target.innerText = oldText;
    }, 640);
}


// Copy to clipboard
function copyToClipboard(data) {
    navigator.clipboard.writeText(data).then(() => {
        // console.log("Copied to clipboard");
    });
}
// #endregion