export default function decorate(block) {
  const table = document.createElement('table');
  table.className = 'custom-demo-table';
  
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);

  // Loop through the rows AEM generated
  [...block.children].forEach((row, index) => {
    const tr = document.createElement('tr');

    Array.from(row.attributes).forEach(attr => {
      tr.setAttribute(attr.name, attr.value);
    });

    // Convert columns to TH (headers) or TD (data cells)
    [...row.children].forEach((col) => {
      const cell = document.createElement(index === 0 ? 'th' : 'td');
      cell.innerHTML = col.innerHTML;
      tr.append(cell);
    });

    if (index === 0) {
      thead.append(tr);
    } else {
      tbody.append(tr);
    }
  });

  // Clear the original AEM divs and inject our perfect table
  block.textContent = '';
  block.append(table);
}