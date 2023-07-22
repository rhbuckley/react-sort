"use strict";
exports.__esModule = true;
exports.SortingAlgorithm = void 0;
/**
 * This is the base class for all of the sorting algortihms that
 * we will be implementing. This class will handle the saving of
 * the state of each step of the algorithm. It will also provide
 * a method of adding color, a descriptuion, and a delay for each
 * step. The adjustable delay will be used to speed up the trivial
 * steps of the algorithms.
 */
var SortingAlgorithm = /** @class */ (function () {
    function SortingAlgorithm(arr) {
        // This is the default delay between each step of the algorithm
        // in milliseconds. This will be used to set the delay between
        // each step of the algorithm. This will be a 1, as an additional
        // dynamic multiplier will be added to this delay in a parent function.
        this.delay = 1000;
        // This is the current step the array is at. This will be used
        // to access the steps array.
        this.step = 0;
        // This is the maximum value of the array. This will be used to
        // provide a percentage to the SortingStep interface, which will
        // help with the visualization of the array.
        this.max = 0;
        // This is the array of colors that will be used to color the
        // bars in the visualization. This will be used to access the
        // colors of each bar in the visualization. This array will
        // be reset after each step of the algorithm, with its values
        // stored in the steps array.
        this.colors = [];
        // This is the array of steps that will be used to store the
        // state of the array at each step of the algorithm. This will
        // be used to access the steps of the algorithm.
        this.steps = [];
        // Here are the variables that will be used to store the
        // statistics that we will be tracking for each algorithm.
        this.comparisons = 0;
        this.accesses = 0;
        this.swaps = 0;
        // Finally, we want to store the algorithm's time complexity
        // and space complexity. This will be used to display the
        // time and space complexity of each algorithm.
        this.timeComplexity = '';
        this.spaceComplexity = '';
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
    SortingAlgorithm.prototype.getMax = function () {
        return Math.max.apply(Math, this.arr);
    };
    // This method is related to getMax... calcPercentage will be used to
    // take a number, and then use the max and rounding to get a percentage,
    // accurate to 1 decimal place
    SortingAlgorithm.prototype.calcPercentage = function (num) {
        return Math.floor((num / this.max) * 100 * 10) / 10;
    };
    // This is the method that will be used to get the next step
    // of the algorithm. This function will call the getStep() method
    // with the current step of the algorithm, and then increment the
    // step of the algorithm.
    SortingAlgorithm.prototype.getNextStep = function () {
        return this.getStep(this.step++);
    };
    // This is the method that will be used to get any step of the
    // algorithm. This function will return the state of the array
    // at the step passed in.
    SortingAlgorithm.prototype.getStep = function (step) {
        if (step === void 0) { step = this.step; }
        return this.steps[step];
    };
    Object.defineProperty(SortingAlgorithm.prototype, "maxStep", {
        // This is a getter for the max step of the algorithm. This will
        // be used to check if the algorithm is complete.
        get: function () {
            return this.steps.length - 1;
        },
        enumerable: false,
        configurable: true
    });
    // This is a getter for the current step of the algorithm. This
    // will be used to check if the algorithm is complete.
    SortingAlgorithm.prototype.isComplete = function () {
        return this.step >= this.maxStep;
    };
    Object.defineProperty(SortingAlgorithm.prototype, "currentDelay", {
        // This is a getter for the current delay of the algorithm. This
        // will be used to speed up the trivial steps of the algorithm.
        get: function () {
            return this.steps[this.step].delay;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SortingAlgorithm.prototype, "frame", {
        // This is a getter to see what frame the algorithm is on
        // This will be used to access the current step of the algorithm
        get: function () {
            return this.step;
        },
        // This is a setter to set the frame of the algorithm
        set: function (frame) {
            if (frame < 0 || frame > this.steps.length - 1)
                return;
            this.step = frame;
        },
        enumerable: false,
        configurable: true
    });
    // This is the method that will be used to go backwards in the
    // the algorithm. This function will call the getStep() method
    // and allow the user to show the previous state of the array
    SortingAlgorithm.prototype.getAndSetStep = function (step) {
        this.step = step;
        return this.getStep(step);
    };
    // Here is the function that will be used as an entrypoint in
    // sorting the algorithm. This function will be overridden in
    // each of the sorting algorithm classes. 
    SortingAlgorithm.prototype.sort = function () { };
    // This is the function that will be used to save the state of
    // the array at each step of the algorithm. This function will
    // be called at each step of the algorithm, and will save the
    // state of the array at that step.
    SortingAlgorithm.prototype.saveStep = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = this.delay; }
        // create a copy of the array
        var result = {
            data: this.arr.map(function (val, i) { return ({
                value: val,
                percent: _this.calcPercentage(val),
                color: _this.colors[i]
            }); }),
            delay: this.delay,
            accesses: this.accesses,
            comparisons: this.comparisons,
            swaps: this.swaps
        };
        // save a copy as a step
        this.steps.push(result);
        // Reset the colors of the bars to the default color
        this.colors = new Array(this.arr.length).fill('default');
    };
    // This is the function that will be used to show that the array is, in fact, 
    // sorted. This function will be called at the end of the algorithm, and will
    // show that the array is sorted, with both a visualization, and a logical check. 
    // This is not only a nice feature to have, but if we wish to provide a way for
    // a user to edit an algorithm, we want to give them a method to check if their
    // algorithm is correct.
    SortingAlgorithm.prototype.checkSort = function () {
        // move green cursor from left to right checking if the array is sorted
        for (var i = 0; i < this.size; i++) {
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
    };
    // This is the function that will be used to swap two elements in the array.
    // This function also adds coloring to the bars that are being swapped. This
    // allows for the user to see the swap in the visualization.
    SortingAlgorithm.prototype.swap = function (i, j, delay) {
        var _a;
        if (delay === void 0) { delay = this.delay; }
        this.colors[i] = 'red';
        this.colors[j] = 'green';
        _a = [this.arr[j], this.arr[i]], this.arr[i] = _a[0], this.arr[j] = _a[1];
        this.swaps++;
        this.saveStep(delay);
    };
    Object.defineProperty(SortingAlgorithm.prototype, "size", {
        // This is the function that will allow access to the size of the array in the
        // sorting algorithm
        get: function () { return this.arr.length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SortingAlgorithm.prototype, "array", {
        // This is the function that will allow access to the array in the sorting algorithm
        get: function () { this.accesses++; return this.arr; },
        enumerable: false,
        configurable: true
    });
    // We also want to be able to reset the statistics
    SortingAlgorithm.prototype.resetStats = function () {
        this.comparisons = 0;
        this.accesses = 0;
        this.swaps = 0;
    };
    Object.defineProperty(SortingAlgorithm.prototype, "timeComplex", {
        // and... here are the getters for the complexities
        get: function () { return this.timeComplexity; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SortingAlgorithm.prototype, "spaceComplex", {
        get: function () { return this.spaceComplexity; },
        enumerable: false,
        configurable: true
    });
    return SortingAlgorithm;
}());
exports.SortingAlgorithm = SortingAlgorithm;
