/**
 * @param {HTMLElement} table 
 * @param {{headers: string[], data: object[]}} config 
 */
function renderTable(table, config) {
    const { headers, data } = config;
    for (const item of data) {
        const tr = document.createElement('tr');
        for (const h of headers) {
            const td = document.createElement('td');
            if (h === 'title') {
                const link = document.createElement('a');
                link.href = 'article.html' + '#' + item.uuid;
                link.innerHTML = item[h] ?? null;
                td.appendChild(link);
            } else {
                td.innerHTML = item[h] ?? null;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}