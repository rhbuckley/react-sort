"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.RadixSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of InsertionSort */
var RadixSort = /** @class */ (function (_super) {
    __extends(RadixSort, _super);
    function RadixSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(k * n) (k = number of digits in largest number)';
        _this.spaceComplexity = 'O(n + k)';
        return _this;
    }
    RadixSort.prototype.getMaxIdx = function () {
        this.saveStep(); // clean slate
        // We want to iterate through the array, keeping track of the previous number (we will call)
        // this maxIdx and the current idx. If the current number is larger than the previous number, 
        // we update maxIdx to be the current idx. At the end of the iteration, maxIdx will be the index
        // of the largest number in the array.
        var maxElement = this.array[0];
        var maxIdx = 0;
        for (var i = 1; i < this.array.length; i++) {
            if (this.array[i] > maxElement) {
                maxElement = this.array[i];
                maxIdx = i;
            }
            this.colors[i] = 'red';
            this.saveStep(this.delay / 2);
        }
        this.colors[maxIdx] = 'blue';
        this.saveStep();
        return maxIdx;
    };
    RadixSort.prototype.sort = function () {
        // We need to know the number of digits that the largest number in the
        // array has. This is because we need to iterate over each digit of each
        // number in the array.
        var max_index = this.getMaxIdx();
        this.colors[max_index] = 'blue';
        this.saveStep();
        var num_digits = Math.floor(Math.log10(this.array[max_index])) + 1;
        // We need to be able to compare the digits of two numbers. To do this,
        // we will create a helper function, which will use the modulo operator
        // to extract a digit from a number. 
        var getDigit = function (num, place) { return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10; };
        // Now we can begin looping through each digit of each number in the array.
        for (var i = 0; i < num_digits; i++) {
            // Now, we need an array that is 10 elements long, where each element
            // is a bucket for a digit from 0 - 9. We will use this array to store
            // the numbers in the array, based on the digit we are currently looking at.
            var buckets = Array.from({ length: 10 }, function () { return []; });
            // We will loop through each number in the array, and place it in the
            // bucket that corresponds to the digit we are currently looking at.
            for (var j = 0; j < this.array.length; j++) {
                var digit = getDigit(this.array[j], i);
                buckets[digit].push(this.array[j]);
                this.colors[j] = 'red';
                this.saveStep();
            }
            // Now, we need to loop through each bucket, and place the numbers back
            // into the array in the order they appear in the buckets.
            var e = 0;
            for (var _i = 0, buckets_1 = buckets; _i < buckets_1.length; _i++) {
                var bucket = buckets_1[_i];
                for (var _a = 0, bucket_1 = bucket; _a < bucket_1.length; _a++) {
                    var num = bucket_1[_a];
                    this.array[e++] = num;
                    this.colors[e] = 'blue';
                    this.saveStep();
                }
            }
            this.saveStep();
        }
        this.checkSort();
    };
    return RadixSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.RadixSort = RadixSort;
