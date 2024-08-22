<div align="center">
    <h1>Table Tool</h1>
    <img src="https://github.com/Jordy3D/TableThing/blob/main/favicon.png">
    <p>A tool for tables. Yay.</p>
</div>

## Features

-   Simple graphical table editor
-   Read table from CSV
-   Export table to CSV
-   Export table to Box Drawing
-   Export table to Markdown

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

The table can be displayed in box drawing format like these (with options):

<table>
  <tr>
    <th>Clean</th>
    <th>Complete</th>
  </tr>
  <tr>
    <td>
      <pre>│ Name │ Age │ Job       │
├──────┼─────┼───────────┤
│ John │ 25  │ Developer │
│ Jane │ 22  │ Designer  │
│ Doe  │ 30  │ Manager   │</pre>
    </td>
    <td>
      <pre>┌──────┬─────┬───────────┐
│ Name │ Age │ Job       │
├──────┼─────┼───────────┤
│ John │ 25  │ Developer │
│ Jane │ 22  │ Designer  │
│ Doe  │ 30  │ Manager   │
└──────┴─────┴───────────┘</pre>
    </td>
  </tr>
</table>

#### Options

-   Whether or not to draw the top border
-   Whether or not to draw the bottom border
-   Whether or not to draw borders between rows
-   Thickness of the borders

### Markdown

The table can be displayed in markdown format as follows:

<table>
  <tr>
    <th>Markdown</th>
    <th>Rendered</th>
  </tr>
  <tr>
    <td>
      <pre>| Name | Age | Job       |
| ---- | --- | --------- |
| John | 25  | Developer |
| Jane | 22  | Designer  |
| Doe  | 30  | Manager   |</pre>
    </td>
    <td>
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Job</th>
            </tr>
            <tr>
                <td>John</td>
                <td>25</td>
                <td>Developer</td>
            </tr>
            <tr>
                <td>Jane</td>
                <td>22</td>
                <td>Designer</td>
            </tr>
            <tr>
                <td>Doe</td>
                <td>30</td>
                <td>Manager</td>
            </tr>
        </table>
    </td>
  </tr>
</table>

#### Options

- Whether or not to pretty print the markdown table

## Notes

-   The table editor is a simple text editor that allows you to edit the table in a graphical way. It is not a full-fledged table editor.
-   The top row is always considered as a header row.

## TODO

-   [ ] Improve the table editor with the ability to navigate the table using arrow keys
-   [ ] Add support for more export formats
-   [ ] Add support for more import formats
-   [ ] Improve CSV parsing to handle more complex CSV data
