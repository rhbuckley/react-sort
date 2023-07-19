import { SortingAlgorithm } from "./helpers/SortingAlgorithm";

/** Implementation of InsertionSort */
export class RadixSort extends SortingAlgorithm {
    timeComplexity = 'O(k * n) (k = number of digits in largest number)';
    spaceComplexity = 'O(n + k)';

    private getMaxIdx(): number {
        this.saveStep(); // clean slate

        // We want to iterate through the array, keeping track of the previous number (we will call)
        // this maxIdx and the current idx. If the current number is larger than the previous number, 
        // we update maxIdx to be the current idx. At the end of the iteration, maxIdx will be the index
        // of the largest number in the array.
        let maxElement = this.array[0];
        let maxIdx = 0;

        for (let i = 1 ; i < this.array.length ; i++) {
            if (this.array[i] > maxElement) {
                maxElement = this.array[i];
                maxIdx = i;
            }

            this.colors[i] = 'red';
            this.saveStep(this.delay / 2 );
        }

        this.colors[maxIdx] = 'blue';
        this.saveStep();

        return maxIdx;
    }

    protected sort() {
        // We need to know the number of digits that the largest number in the
        // array has. This is because we need to iterate over each digit of each
        // number in the array.
        const max_index = this.getMaxIdx();
        this.colors[max_index] = 'blue';
        this.saveStep();

        const num_digits = Math.floor(Math.log10(this.array[max_index])) + 1;

        // We need to be able to compare the digits of two numbers. To do this,
        // we will create a helper function, which will use the modulo operator
        // to extract a digit from a number. 
        const getDigit = (num: number, place: number) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;

        // Now we can begin looping through each digit of each number in the array.
        for (let i = 0 ; i < num_digits ; i++) {

            // Now, we need an array that is 10 elements long, where each element
            // is a bucket for a digit from 0 - 9. We will use this array to store
            // the numbers in the array, based on the digit we are currently looking at.
            const buckets: number[][] = Array.from({ length: 10 }, () => []);

            // We will loop through each number in the array, and place it in the
            // bucket that corresponds to the digit we are currently looking at.
            for (let j = 0 ; j < this.array.length ; j++) {
                const digit = getDigit(this.array[j], i);
                buckets[digit].push(this.array[j]);
                this.colors[j] = 'red';
                this.saveStep();
            }

            // Now, we need to loop through each bucket, and place the numbers back
            // into the array in the order they appear in the buckets.
            let e = 0;
            for (const bucket of buckets) {
                for (const num of bucket) {
                    this.array[e++] = num;
                    this.colors[e] = 'blue';
                    this.saveStep();
                }
            }

            this.saveStep();
        }

        this.checkSort();
    }
}