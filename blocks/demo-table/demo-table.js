export default function decorate(block) {
  const rows = [...block.children];
  
  if (rows.length === 0) return;

  block.textContent = ''; 

  const table = document.createElement('table');
  table.className = 'custom-demo-table';
  
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    
    const cols = [...row.children];
    
    cols.forEach((col) => {
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

  table.append(thead, tbody);
  block.append(table);
}