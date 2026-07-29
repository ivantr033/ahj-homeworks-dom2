export default class TableSorter {
  constructor(container, data) {
    this.container = container;
    this.data = [...data]; // Save a copy in memory
    
    // List of required sorting sequences
    this.sortFields = [
      { field: 'id', order: 'asc' },
      { field: 'id', order: 'desc' },
      { field: 'title', order: 'asc' },
      { field: 'title', order: 'desc' },
      { field: 'year', order: 'asc' },
      { field: 'year', order: 'desc' },
      { field: 'imdb', order: 'asc' },
      { field: 'imdb', order: 'desc' },
    ];
    
    this.currentIndex = 0;
    this.intervalId = null;
  }

  init() {
    this.renderSkeleton();
    this.renderRows();
    this.startAutoSort();
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <table class="sort-table">
        <thead>
          <tr>
            <th data-column="id">id</th>
            <th data-column="title">title</th>
            <th data-column="year">year</th>
            <th data-column="imdb">imdb</th>
          </tr>
        </thead>
        <tbody class="table-body"></tbody>
      </table>
    `;
    this.tbody = this.container.querySelector('.table-body');
    this.headers = this.container.querySelectorAll('th');
  }

  renderRows() {
    this.tbody.innerHTML = '';

    this.data.forEach((item) => {
      const tr = document.createElement('tr');
      tr.dataset.id = item.id;
      tr.dataset.title = item.title;
      tr.dataset.year = item.year;
      tr.dataset.imdb = item.imdb.toFixed(2);

      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>
      `;

      this.tbody.appendChild(tr);
    });
  }

  updateHeaderArrows(field, order) {
    this.headers.forEach((th) => {
      const colName = th.dataset.column;
      if (colName === field) {
        const arrow = order === 'asc' ? ' ↑' : ' ↓';
        th.textContent = `${colName}${arrow}`;
      } else {
        th.textContent = colName;
      }
    });
  }

  sortCurrent() {
    const { field, order } = this.sortFields[this.currentIndex];

    this.data.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });

    this.updateHeaderArrows(field, order);
    this.renderRows();
  }

  nextSort() {
    this.sortCurrent();
    this.currentIndex = (this.currentIndex + 1) % this.sortFields.length;
  }

  startAutoSort(intervalMs = 2000) {
    this.nextSort(); // First immediate order
    this.intervalId = setInterval(() => {
      this.nextSort();
    }, intervalMs);
  }

  stopAutoSort() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}