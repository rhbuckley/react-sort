import { SortingAlgorithm } from './helpers/SortingAlgorithm';

/** Implementation of SelectionSort */
export class SelectionSort extends SortingAlgorithm {
   timeComplexity = 'O(n^2)';
   spaceComplexity = 'O(1)';

    protected sort() {

        for (let i = 0; i < this.size - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < this.size; j++) {
               
               this.comparisons++;
               if (this.array[j] < this.array[minIndex]) {
                  minIndex = j;
               }
            
               this.colors[j] = 'lightblue';
               this.saveStep(this.delay / 2);
            }

            if (minIndex !== i) {
               this.swap(i, minIndex, this.delay * 3);
            }

            this.saveStep();
         }

        this.checkSort();
    }
}