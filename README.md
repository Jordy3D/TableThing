<div align="center">
    <h1>Table Tool</h1>
    <p>A tool for tables. Yay.</p>
</div>

## Features

-   Read table from CSV
-   Simple graphical table editor
-   Export table to CSV
-   Export table to Markdown
-   Export table to Box Drawing

## Examples

### CSV

Below is the "default data" table in CSV format:

```csv
Name,Age,Job
John,25,Developer
Jane,22,Designer
Doe,30,Manager
```

### Box Drawing

The table can be displayed in box drawing format as follows:

```plaintext
│ Name │ Age │ Job       │
├──────┼─────┼───────────┤
│ John │ 25  │ Developer │
│ Jane │ 22  │ Designer  │
│ Doe  │ 30  │ Manager   │
```

### Markdown

The table can be displayed in markdown format as follows:

```markdown
| Name | Age | Job       |
| ---- | --- | --------- |
| John | 25  | Developer |
| Jane | 22  | Designer  |
| Doe  | 30  | Manager   |
```

which will be rendered as:
| Name | Age | Job |
|------|-----|-----------|
| John | 25 | Developer |
| Jane | 22 | Designer |
| Doe | 30 | Manager |


## Notes

-  The table editor is a simple text editor that allows you to edit the table in a graphical way. It is not a full-fledged table editor.
- The top row is always considered as a header row.

## TODO

- [ ] Improve the table editor with the ability to navigate the table using arrow keys.
- [ ] Add support for more export formats.
- [ ] Add support for more import formats.
- [ ] Improve CSV parsing to handle more complex CSV files.