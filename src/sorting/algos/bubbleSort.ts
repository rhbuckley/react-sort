import { SortingAlgorithm } from "./helpers/SortingAlgorithm";

/** Implementation of BubbleSort */
export class BubbleSort extends SortingAlgorithm {
    timeComplexity = 'O(n^2)';
    spaceComplexity = 'O(1)';

    protected sort() {
        for (let i = 0; i < this.size - 1; i++) {

            for (let j = 0; j < this.size - 1 - i; j++) {

              this.comparisons++;
              if (this.array[j] > this.array[j + 1]) {
                this.swap(j, j + 1);
              }

            }

            this.saveStep();

        }
      
        this.checkSort();
    }
}