import TableSorter from './TableSorter';
import { moviesData } from './data';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('table-container');

  if (container) {
    const tableSorter = new TableSorter(container, moviesData);
    tableSorter.init();
  }
});
