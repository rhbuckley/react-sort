import { SortingAlgorithm } from "./helpers/SortingAlgorithm";

/** Implementation of InsertionSort */
export class InsertionSort extends SortingAlgorithm {
    timeComplexity = 'O(n^2)';
    spaceComplexity = 'O(1)';

    protected sort() {
        for (let i = 1; i < this.size ; i++) {
            let j = i;

            // Warning: this.comparisons++ may not be exactly accurate, as
            // the while loop condition is checked before the comparison
            // is made. However, if we do not make the comparison increase
            // here the number of comparisons will be off by 1.
            this.comparisons++;
            while (j > 0 && this.array[j] < this.array[j - 1]) {
                this.comparisons++;
                this.swap(j, j - 1);
                j--;
            }

            this.saveStep();
        }

        this.checkSort();
    }
}