import { SortingAlgorithm } from "./helpers/SortingAlgorithm";

/** Implementation of MergeSort */
export class MergeSort extends SortingAlgorithm {
    timeComplexity = "O(n log(n))";
    spaceComplexity = "O(n)";

    protected sort() {
        this.mergeSort(0, this.size - 1);
        this.checkSort();
    }

    private mergeSort(start: number, end: number) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            this.mergeSort(start, mid);
            this.mergeSort(mid + 1, end);
            this.merge(start, mid, end);
        }
    }

    private merge(start: number, mid: number, end: number) {
        const leftArray = new Array(mid - start + 1);
        const rightArray = new Array(end - mid);

        for (let i = 0; i < leftArray.length; i++) {
            leftArray[i] = this.array[start + i];
        }
        for (let i = 0; i < rightArray.length; i++) {
            rightArray[i] = this.array[mid + 1 + i];
        }

        let leftIndex = 0;
        let rightIndex = 0;
        let mergeIndex = start;

        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            this.comparisons++;
            if (leftArray[leftIndex] <= rightArray[rightIndex]) {
                this.array[mergeIndex] = leftArray[leftIndex];
                leftIndex++;
            } else {
                this.array[mergeIndex] = rightArray[rightIndex];
                rightIndex++;
            }
            mergeIndex++;

            this.colors[mergeIndex] = "var(--color-bar-accent)"; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }

        while (leftIndex < leftArray.length) {
            this.array[mergeIndex] = leftArray[leftIndex];
            leftIndex++;
            mergeIndex++;

            this.colors[mergeIndex] = "var(--color-bar-accent)"; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }

        while (rightIndex < rightArray.length) {
            this.array[mergeIndex] = rightArray[rightIndex];
            rightIndex++;
            mergeIndex++;

            this.colors[mergeIndex] = "var(--color-bar-accent)"; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }

        this.saveStep();
    }
}
