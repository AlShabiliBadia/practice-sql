# Practice SQL
I needed a straightforward way to quickly practice SQL commands without setting up a full database environment. Practice SQL is a simple web tool born out of that need – designed to be an accessible sandbox for anyone learning or working with SQL.

It lets you run SQL queries (using the standard SQLite syntax via sql.js) directly in your browser and see the results instantly.

## Key Features
* **Run SQL Commands:** Execute `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`, etc. (SQLite syntax).
* **Instant Output:** See table results or error messages right away.
* **Pin Results:** Use the "Pin Output" button to keep specific table results visible for reference while you work.
* **Browser-Based:** Runs entirely in your browser using sql.js. No installation, no server required, just open and start typing.
* **Simple Workflow:** Input clears on success; use `Ctrl+Enter` or `Cmd+Enter`  to run commands quickly.

## How to Use
1.  **Live Demo:** Visit the live application here: [https://alshabili.site/practice-sql/](https://alshabili.site/practice-sql/)
    *(Or open `index.html` locally in your browser)*
2.  Type SQL into the input box.
3.  Click "Run SQL" or press `Ctrl+Enter` / `Cmd+Enter`.
4.  View results in the "Output" area.
5.  Click "Pin Output" (when a table is shown) to keep it below. Use the 'X' to remove pinned items.
6.  Click the "Help" button for examples.


## Technology Stack
* HTML5
* CSS3 
* sql.js

## Current State
This project fulfills its original goal: a simple, accessible SQL sandbox. While complete in its core function, many potential client-side features could be added (like syntax highlighting or schema viewing) while preserving its simplicity. I plan to explore these improvements as time permits.
