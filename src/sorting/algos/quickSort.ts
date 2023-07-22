import { SortingAlgorithm } from './helpers/SortingAlgorithm';

/** Implementation of QuickSort */
export class QuickSort extends SortingAlgorithm {
    timeComplexity = 'O(n log(n))';
    spaceComplexity = 'O(log(n))';

    protected sort() {
      this.saveStep();
      this.quickSort(0, this.size - 1);
      this.checkSort();
    }
  
    private quickSort(start: number, end: number) {
      if (start < end) {
        const pivotIndex = this.partition(start, end);
        this.quickSort(start, pivotIndex - 1);
        this.quickSort(pivotIndex + 1, end);
      }
    }
  
    private partition(start: number, end: number): number {
      const pivotIndex = Math.floor((start + end) / 2);
      const pivotValue = this.array[pivotIndex];
  
      this.swap(pivotIndex, end); // Move pivot to the end
      this.colors[end] = 'lightgreen'; // Color the pivot
  
      let i = start;
      for (let j = start; j < end; j++) {
        this.comparisons++;
        if (this.array[j] < pivotValue) {
          this.swap(i, j);
          i++;
        }
        this.colors[j] = 'lightblue'; // Color elements being compared with the pivot
        this.saveStep();
      }
  
      this.swap(i, end); // Move pivot to its sorted position
      this.colors[i] = 'lightgreen'; // Color the pivot at its sorted position
      this.saveStep();
  
      return i;
    }
  }
  