
const boxTypes = [
    {
        name: "normal",
        shapes: [
            "─",
            "│",
            "┌",
            "┐",
            "└",
            "┘",
            "├",
            "┤",
            "┬",
            "┴",
            "┼",
        ],
    },
    {
        name: "thick",
        shapes: [
            "━",
            "┃",
            "┏",
            "┓",
            "┗",
            "┛",
            "┣",
            "┫",
            "┳",
            "┻",
            "╋",
        ],
    },
    {
        name: "double",
        shapes: [
            "═",
            "║",
            "╔",
            "╗",
            "╚",
            "╝",
            "╠",
            "╣",
            "╦",
            "╩",
            "╬",
        ],
    },
    // {
    //     name: "thicc",
    //     shapes: [
    //         "▄",
    //         "▐",
    //         "▐",
    //         "▌",
    //         "▐",
    //         "▐",
    //         "▐",
    //         "▌",
    //         "▄",
    //         "▀",
    //         "█",
    //     ],
    // },
];


class Table {
    // define the largest value in each column
    largestColVals = [];
    tableElement = null;

    constructor(cols = 3, rows = 4) {
        this.cols = cols;
        this.rows = rows;
        this.cells = [];
        for (let i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < cols; j++) {
                this.cells[i][j] = "";
            }
        }
    }

    // assign a function to call after input
    setInputCallback(callback) {
        this.inputcallback = callback;
    }


    // Add a column to the table
    addColumn() {
        this.cols++;
        for (let i = 0; i < this.rows; i++) {
            this.cells[i].push("");
        }
    }

    // Add a row to the table
    addRow() {
        this.rows++;
        this.cells.push([]);
        for (let i = 0; i < this.cols; i++) {
            this.cells[this.rows - 1].push("");
        }
    }

    // Remove a column from the table
    removeColumn() {
        if (this.cols > 1) {
            this.cols--;
            for (let i = 0; i < this.rows; i++) {
                this.cells[i].pop();
            }
        }
    }

    // Remove a row from the table
    removeRow() {
        if (this.rows > 1) {
            this.rows--;
            this.cells.pop();
        }
    }

    // Get the value of a cell
    getCell(row, col) {
        return this.cells[row][col];
    }

    // Set the value of a cell
    setCell(row, col, value) {
        this.cells[row][col] = value;
    }

    // Clear the table of all data
    clearTable() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.setCell(i, j, "");
            }
        }
    }

    // Create the table element
    createTable(parent = document.body, clearParent = false) {
        if (clearParent) parent.innerHTML = "";

        let tableElement = document.createElement("table");
        tableElement.style.width = "100%";
        tableElement.style.border = "1px solid black";
        tableElement.style.borderCollapse = "collapse";
        for (let i = 0; i < this.rows; i++) {
            var rowElement = document.createElement("tr");
            for (let j = 0; j < this.cols; j++) {
                var cellElement = document.createElement("td");
                cellElement.style.border = "1px solid black";
                cellElement.innerHTML = this.getCell(i, j);
                rowElement.appendChild(cellElement);
            }
            tableElement.appendChild(rowElement);
        }
        parent.appendChild(tableElement);

        this.tableElement = tableElement;
    }

    // Populate the table with default data
    defaultTable() {
        var data = [
            ["Name", "Age", "Job"],
            ["John", "25", "Developer"],
            ["Jane", "22", "Designer"],
            ["Doe", "30", "Manager"],
        ];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                this.setCell(i, j, data[i][j]);
            }
        }
    }

    // Update the table
    updateTable() {
        console.log("Updating table...");

        // if the table element is not defined, return false to flag that the table needs to be created
        if (!this.tableElement) {
            console.log("Table element not defined");
            return false;
        }

        // Give every cell an input field
        function addCellInputs(tb) {
            if (!tb.tableElement) return;

            for (let i = 0; i < tb.tableElement.rows.length; i++) {
                for (let j = 0; j < tb.tableElement.rows[0].cells.length; j++) {
                    var cell = tb.tableElement.rows[i].cells[j];

                    (function (cell, i, j, table) {
                        function showCellInput() {
                            var input = document.createElement("input");
                            input.value = table.getCell(i, j);

                            // input.addEventListener("mousedown", (event) => {
                            //     event.stopPropagation();
                            //     input.clicked = true;
                            // });

                            input.addEventListener("blur", () => {
                                if (input.clicked) {
                                    input.clicked = false;
                                    return;
                                }
                                table.setCell(i, j, input.value);
                                table.updateTable();

                                if (table.inputcallback) table.inputcallback();
                            });

                            cell.innerHTML = "";
                            cell.appendChild(input);
                            input.focus();

                            input.addEventListener("focus", () => {
                                input.setSelectionRange(0, input.value.length);
                            });
                        }

                        cell.addEventListener("click", () => {
                            showCellInput();
                        });

                        cell.addEventListener("focus", () => {
                            showCellInput();
                        });
                    })(cell, i, j, tb);
                }
            }
        }

        this.tableElement.innerHTML = "";
        for (let i = 0; i < this.rows; i++) {
            var rowElement = document.createElement("tr");
            for (let j = 0; j < this.cols; j++) {
                var cellElement = document.createElement("td");
                cellElement.style.border = "1px solid black";

                let data = this.getCell(i, j);
                if (data === undefined) data = "";
                cellElement.innerHTML = data;
                cellElement.id = `r${i}c${j}`;
                rowElement.appendChild(cellElement);
            }
            this.tableElement.appendChild(rowElement);
        }

        addCellInputs(this);
        this.getLargestColVals();

        return true;
    }

    // Find the largest value in each column
    getLargestColVals() {
        this.largestColVals = [];
        for (let i = 0; i < this.cols; i++) {
            var largest = 0;
            for (let j = 0; j < this.rows; j++) {
                let cellData = this.getCell(j, i).toString();
                if (cellData.length > largest) {
                    largest = cellData.length;
                }
            }
            this.largestColVals.push(largest);
        }
    }

    // Find a cell in the table given its row and column
    findCell(row, col) {
        return document.querySelector(`#r${row}c${col}`);
    }

    // Rendering

    // Render the table as a box table
    renderAsBoxTable(options = {}) {

        // Set default option object
        options = Object.assign({
            styleId: 0,
            top: false,
            cross: false,
            bottom: false,
        }, options);
        
        let padding = 1;

        this.getLargestColVals();

        // draw the box table
        var boxTableString = "\n";

        const [hr, vr, tl, tr, bl, br, lc, rc, tc, bc, fc] = boxTypes[options.styleId].shapes;

        function drawTop(tb) {
            var out = tl;
            for (let i = 0; i < table.cols; i++) {
                out += hr.repeat(tb.largestColVals[i] + padding * 2);
                if (i < table.cols - 1) out += tc;
            }
            out += tr + "\n";

            return out;
        }

        function drawData(tb, row) {
            var out = vr;
            for (let i = 0; i < table.cols; i++) {
                out += " ".repeat(padding) + table.getCell(row, i);

                let cellData = table.getCell(row, i);
                let cellLength = cellData.toString().length;
                let largestColVal = tb.largestColVals[i];
                let paddingLength = largestColVal - cellLength + padding;

                // Ensure paddingLength is non-negative
                if (paddingLength < 0) {
                    paddingLength = 0;

                    // print the cell value in the console
                    console.log(`Cell value: ${cellData} of length ${cellLength}, largestColVal: ${largestColVal}`);
                }

                out += " ".repeat(paddingLength);
                out += vr;
            }
            out += "\n";

            return out;
        }

        function drawCross(tb) {
            var out = lc;
            for (let i = 0; i < table.cols; i++) {
                out += hr.repeat(tb.largestColVals[i] + padding * 2);
                if (i < table.cols - 1) out += fc;
            }
            out += rc + "\n";

            return out;
        }

        function drawBottom(tb) {
            var out = bl;
            for (let i = 0; i < table.cols; i++) {
                out += hr.repeat(tb.largestColVals[i] + padding * 2);
                if (i < table.cols - 1) out += bc;
            }
            out += br + "\n";

            return out;
        }

        if (options.top) boxTableString += drawTop(this); // Draw the top section
        boxTableString += drawData(this, 0); // Draw the header data
        boxTableString += drawCross(this); // Draw the first cross

        for (let i = 1; i < table.rows; i++) {
            // For every cell following...
            boxTableString += drawData(this, i); // ...draw the data, then
            if (i < table.rows - 1 && options.cross)
                // if it's not the last row,
                boxTableString += drawCross(this); // draw the next cross
        }

        if (options.bottom) boxTableString += drawBottom(this); // Draw the bottom

        // remove lines that are blank or just \n
        var lines = boxTableString.split("\n");

        boxTableString = lines
            .filter(function (el) {
                return el != "" && el != "\n";
            })
            .join("\n");

        return boxTableString;
    }

    // Render the table as Markdown
    renderAsMarkdown(prettify = true) {
        var padding = 1;

        this.getLargestColVals();

        console.log(`Prettify: ${prettify}`);

        if (prettify) {
            for (let i = 0; i < table.rows; i++) {
                for (let j = 0; j < table.cols; j++) {
                    let cellContent = table.getCell(i, j);
                    if (cellContent.length > this.largestColVals[j]) {
                        this.largestColVals[j] = cellContent.length;
                    }
                }
            }
        }

        // function to draw a row of the table
        function drawRow(tb, row) {
            var out = "|";
            for (let i = 0; i < table.cols; i++) {
                try {
                    let cellData = table.getCell(row, i);
                    cellData = cellData.toString();
                    if (prettify) {
                        cellData = cellData.padEnd(tb.largestColVals[i]);
                    }
                    out += " " + cellData + " |";
                }
                catch (e) {
                    console.log(`Error at ${row},${i}`);
                    console.log(table.getCell(row, i));
                }
            }
            out += "\n";

            return out;
        }

        // function to draw the header row
        function drawBeam(tb) {
            var out = "|";
            for (let i = 0; i < table.cols; i++) {

                let repeat = 0;
                if (prettify)
                    repeat = tb.largestColVals[i];


                out += "-".repeat(repeat + (prettify ? padding * 2 : 1)) + "|";
            }
            out += "\n";

            return out;
        }

        var markdownString = "";

        for (let i = 0; i < table.rows; i++) {
            markdownString += drawRow(this, i);
            if (i == 0) {
                markdownString += drawBeam(this);
            }
        }

        return markdownString;
    }

    // Render the cell data as CSV
    renderAsCSV() {
        var csvString = "";
        for (let i = 0; i < table.rows; i++) {
            for (let j = 0; j < table.cols; j++) {
                let data = table.getCell(i, j).toString();
                if (data.includes(",") || data.includes("\n"))
                    data = `"${data}"`;

                csvString += data;
                if (j < table.cols - 1) csvString += ",";
            }
            csvString += "\n";
        }
        // remove trailing newline
        csvString = csvString.slice(0, -1);

        return csvString
    }
}