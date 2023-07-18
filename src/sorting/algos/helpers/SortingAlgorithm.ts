import { SortingStep } from "../@index";
import { Colors } from "./colors";

/**
 * This is the base class for all of the sorting algortihms that
 * we will be implementing. This class will handle the saving of
 * the state of each step of the algorithm. It will also provide
 * a method of adding color, a descriptuion, and a delay for each
 * step. The adjustable delay will be used to speed up the trivial
 * steps of the algorithms.
 */
export class SortingAlgorithm {
    // This is the default delay between each step of the algorithm
    // in milliseconds. This will be used to set the delay between
    // each step of the algorithm. This will be a 1, as an additional
    // dynamic multiplier will be added to this delay in a parent function.
    protected readonly delay: number = 1000;

    // This is the current step the array is at. This will be used
    // to access the steps array.
    private step: number = 0;
    
    // This is the array that will be sorted. This will be used
    // to access the array, and will be initially set to the unsorted
    // array, but will be updated as the algorithm progresses.
    private arr: number[];

    // This is the maximum value of the array. This will be used to
    // provide a percentage to the SortingStep interface, which will
    // help with the visualization of the array.
    protected max: number = 0;

    // This is the array of colors that will be used to color the
    // bars in the visualization. This will be used to access the
    // colors of each bar in the visualization. This array will
    // be reset after each step of the algorithm, with its values
    // stored in the steps array.
    protected colors: Colors[] = [];
    
    // This is the array of steps that will be used to store the
    // state of the array at each step of the algorithm. This will
    // be used to access the steps of the algorithm.
    private steps: SortingStep[] = [];

    // Here are the variables that will be used to store the
    // statistics that we will be tracking for each algorithm.
    protected comparisons: number = 0;
    protected accesses: number = 0;
    protected swaps: number = 0;

    // Finally, we want to store the algorithm's time complexity
    // and space complexity. This will be used to display the
    // time and space complexity of each algorithm.
    protected timeComplexity: string = '';
    protected spaceComplexity: string = '';

    constructor(arr: number[]) {
        // Here, we are just updating the values of the class
        // variables to the values passed in the constructor.
        this.arr = arr;

        // We need to know the maximum value of the array for
        // the visualization. Let's set that now.
        this.max = this.getMax();

        // Initially, we want to set the colors of the bars to
        // the default color.
        this.colors = new Array(arr.length).fill('default');

        // We want to save this initial, unsorted state of the
        // array as the first step of the algorithm.
        this.saveStep();

        // Then we start the sorting algorithm by calling this.sort()
        // note: even though you will not see this implemented below
        // this.sort() will be implemented and overridden in each
        // of the sorting algorithm classes.
        this.sort();
    }

    // This method will allow for the user to get the maximum numerical
    // value of any element in the array. This will allow for the creation
    // of a percentage to be returned to the user
    private getMax() {
        return Math.max(...this.arr);
    }

    // This method is related to getMax... calcPercentage will be used to
    // take a number, and then use the max and rounding to get a percentage,
    // accurate to 1 decimal place
    private calcPercentage(num: number): number {
        return Math.floor((num / this.max) * 100 * 10) / 10;
    }

    // This is the method that will be used to get the next step
    // of the algorithm. This function will call the getStep() method
    // with the current step of the algorithm, and then increment the
    // step of the algorithm.
    public getNextStep() {
        return this.getStep(this.step++);
    }

    // This is the method that will be used to get any step of the
    // algorithm. This function will return the state of the array
    // at the step passed in.
    public getStep(step: number = this.step) {
        return this.steps[step];
    }

    // This is a getter for the max step of the algorithm. This will
    // be used to check if the algorithm is complete.
    public get maxStep() {
        return this.steps.length - 1;
    }

    // This is a getter for the current step of the algorithm. This
    // will be used to check if the algorithm is complete.
    public isComplete() {
        return this.step >= this.maxStep;
    }

    // This is a getter for the current delay of the algorithm. This
    // will be used to speed up the trivial steps of the algorithm.
    public get currentDelay() {
        return this.steps[this.step].delay;
    }

    // This is a getter to see what frame the algorithm is on
    // This will be used to access the current step of the algorithm
    public get frame() {
        return this.step;
    }

    // This is a setter to set the frame of the algorithm
    public set frame(frame: number) {
        if (frame < 0 || frame > this.steps.length - 1) return;
        this.step = frame;
    }

    // This is the method that will be used to go backwards in the
    // the algorithm. This function will call the getStep() method
    // and allow the user to show the previous state of the array
    public getAndSetStep(step: number) {
        this.step = step;
        return this.getStep(step);
    }

    // Here is the function that will be used as an entrypoint in
    // sorting the algorithm. This function will be overridden in
    // each of the sorting algorithm classes. 
    protected sort() {}

    // This is the function that will be used to save the state of
    // the array at each step of the algorithm. This function will
    // be called at each step of the algorithm, and will save the
    // state of the array at that step.
    protected saveStep(delay: number = this.delay) {
        // create a copy of the array
        const result: SortingStep = {
            data: this.arr.map((val, i) => ({
                value: val,
                percent: this.calcPercentage(val),
                color: this.colors[i]
            })),

            delay: this.delay,
            accesses: this.accesses,
            comparisons: this.comparisons,
            swaps: this.swaps,
        }

        // save a copy as a step
        this.steps.push(result);

        // Reset the colors of the bars to the default color
        this.colors = new Array(this.arr.length).fill('default');
    }

    // This is the function that will be used to show that the array is, in fact, 
    // sorted. This function will be called at the end of the algorithm, and will
    // show that the array is sorted, with both a visualization, and a logical check. 
    // This is not only a nice feature to have, but if we wish to provide a way for
    // a user to edit an algorithm, we want to give them a method to check if their
    // algorithm is correct.
    protected checkSort() {
        // move green cursor from left to right checking if the array is sorted
        for (let i = 0; i < this.size; i++) {
            this.colors[i] = 'green';

            this.saveStep();

            if (this.arr[i] > this.arr[i + 1]) {
                this.colors = new Array(this.arr.length).fill('red');
                return;
            }
        }

        // Save step for last value in loop
        this.saveStep();
        this.saveStep();
    }

    // This is the function that will be used to swap two elements in the array.
    // This function also adds coloring to the bars that are being swapped. This
    // allows for the user to see the swap in the visualization.
    protected swap(i: number, j: number, delay = this.delay) {
        this.colors[i] = 'red';
        this.colors[j] = 'green';

        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];

        this.swaps++;
        this.saveStep(delay);
    }

    // This is the function that will allow access to the size of the array in the
    // sorting algorithm
    get size() { return this.arr.length; }

    // This is the function that will allow access to the array in the sorting algorithm
    get array() { this.accesses++; return this.arr; }

    // We also want to be able to reset the statistics
    public resetStats() {
        this.comparisons = 0;
        this.accesses = 0;
        this.swaps = 0;
    }

    // and... here are the getters for the complexities
    get timeComplex() { return this.timeComplexity; }
    get spaceComplex() { return this.spaceComplexity; }
}