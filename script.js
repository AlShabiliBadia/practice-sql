const sqlInput = document.getElementById('sql-input');
const runSqlButton = document.getElementById('run-sql-button');
const outputArea = document.getElementById('output-area');
const pinOutputButton = document.getElementById('pin-output-button');
const pinnedOutputsContainer = document.getElementById('pinned-outputs');
const helpButton = document.getElementById('help-button');
const helpModal = document.getElementById('help-modal');
const closeHelpButton = document.getElementById('close-help-button');

let db = null;

const config = {
    locateFile: filename => `https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/${filename}`
};

initSqlJs(config).then(function(SQL){
    db = new SQL.Database();
    outputArea.textContent = 'SQL engine initialized. Ready for commands.';
    runSqlButton.disabled = false;
    pinOutputButton.disabled = false;
}).catch(function(error) {
    outputArea.innerHTML = `<span class="error-message">Error initializing SQL engine: ${error.message}</span>`;
    runSqlButton.disabled = true;
    pinOutputButton.disabled = true;
});

runSqlButton.disabled = true;
pinOutputButton.disabled = true;

function renderResults(results) {
    outputArea.innerHTML = '';

    if (!results || results.length === 0) {
         outputArea.innerHTML = '<span class="success-message">Command executed successfully.</span>';
         return;
    }

    results.forEach((result, index) => {
        if (index > 0) {
            outputArea.appendChild(document.createElement('hr'));
        }

        if (result.columns && result.columns.length > 0 && result.values && result.values.length > 0) {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');
            const headerRow = document.createElement('tr');

            result.columns.forEach(columnName => {
                const th = document.createElement('th');
                th.textContent = columnName;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            result.values.forEach(rowData => {
                const dataRow = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData === null ? 'NULL' : cellData;
                    dataRow.appendChild(td);
                });
                tbody.appendChild(dataRow);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            outputArea.appendChild(table);

            const rowCount = document.createElement('p');
            rowCount.textContent = `(${result.values.length} row${result.values.length !== 1 ? 's' : ''} returned)`;
            outputArea.appendChild(rowCount);

        } else {
             const successMsg = document.createElement('p');
             successMsg.innerHTML = '<span class="success-message">Command executed successfully (no data returned).</span>';
             if (outputArea.innerHTML === '' || outputArea.textContent === 'Executing...') {
                 outputArea.appendChild(successMsg);
             }
        }
    });
}

function executeSql() {
    if (!db) {
        outputArea.innerHTML = '<span class="error-message">Database is not ready.</span>';
        return;
    }

    const sqlCommands = sqlInput.value.trim();
    if (!sqlCommands) {
        outputArea.innerHTML = '<span class="error-message">Please enter SQL commands.</span>';
        return;
    }

    outputArea.innerHTML = 'Executing...';

    try {
        const results = db.exec(sqlCommands);
        renderResults(results);
        sqlInput.value = '';
    } catch (error) {
        outputArea.innerHTML = `<span class="error-message">Error: ${error.message}</span>`;
    }
}

function handlePinOutput() {
    const tableElement = outputArea.querySelector('table');

    if (!tableElement) {
        console.log("Pinning is only available for table results (output of SELECT queries).");
        pinOutputButton.classList.add('flash-disabled');
        setTimeout(() => {
            pinOutputButton.classList.remove('flash-disabled');
        }, 600);
        return;
    }

    const currentOutputHTML = outputArea.innerHTML;

    const pinnedItem = document.createElement('div');
    pinnedItem.className = 'pinned-item';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-pinned';
    closeButton.innerHTML = '&times;';

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = currentOutputHTML;

    pinnedItem.appendChild(closeButton);
    pinnedItem.appendChild(contentDiv);

    pinnedOutputsContainer.appendChild(pinnedItem);
}

pinOutputButton.addEventListener('click', handlePinOutput);

pinnedOutputsContainer.addEventListener('click', function(event) {
     if (event.target && event.target.classList.contains('close-pinned')) {
        const itemToRemove = event.target.closest('.pinned-item');
        if (itemToRemove) {
            itemToRemove.remove();
        }
    }
});

runSqlButton.addEventListener('click', executeSql);

sqlInput.addEventListener('keydown', function(event) {
     if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
         event.preventDefault();
         executeSql();
    }
});

function openHelpModal() {
    helpModal.style.display = 'flex';
}

function closeHelpModal() {
     helpModal.style.display = 'none';
}

helpButton.addEventListener('click', openHelpModal);
closeHelpButton.addEventListener('click', closeHelpModal);

helpModal.addEventListener('click', function(event) {
    if (event.target === helpModal) {
        closeHelpModal();
    }
});