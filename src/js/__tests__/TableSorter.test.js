import TableSorter from '../TableSorter';
import { moviesData } from '../data';

describe('TableSorter', () => {
  let container;
  let sorter;

  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '<div id="table-container"></div>';
    container = document.getElementById('table-container');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('The basic structure must be initialized and rendered', () => {
    sorter = new TableSorter(container, moviesData);
    sorter.init();

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(moviesData.length);
  });

  test('The sorter must cycle through all 8 sorting criteria', () => {
    sorter = new TableSorter(container, moviesData);
    sorter.init(); // Paso 0 (id asc)

    // We advance 2 seconds for each criterion (8 criteria = 16 seconds)
    for (let i = 0; i < 8; i++) {
      jest.advanceTimersByTime(2000);
    }

    // Upon completing the full turn, should have returned to step 1.
    expect(sorter.currentIndex).toBe(1);
  });

  test('The sorter must stop autoSort when an active interval is present', () => {
    sorter = new TableSorter(container, moviesData);
    sorter.init();

    // Verify that intervalId is not null
    expect(sorter.intervalId).not.toBeNull();

    // Invoke stopAutoSort directly
    sorter.stopAutoSort();
  });

  test('stopAutoSort should not fail if intervalId is null', () => {
    sorter = new TableSorter(container, moviesData);
    sorter.intervalId = null;
    
    expect(() => sorter.stopAutoSort()).not.toThrow();
  });
});