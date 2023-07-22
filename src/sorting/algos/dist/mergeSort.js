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
exports.MergeSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of MergeSort */
var MergeSort = /** @class */ (function (_super) {
    __extends(MergeSort, _super);
    function MergeSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(n log(n))';
        _this.spaceComplexity = 'O(n)';
        return _this;
    }
    MergeSort.prototype.sort = function () {
        this.mergeSort(0, this.size - 1);
        this.checkSort();
    };
    MergeSort.prototype.mergeSort = function (start, end) {
        if (start < end) {
            var mid = Math.floor((start + end) / 2);
            this.mergeSort(start, mid);
            this.mergeSort(mid + 1, end);
            this.merge(start, mid, end);
        }
    };
    MergeSort.prototype.merge = function (start, mid, end) {
        var leftArray = new Array(mid - start + 1);
        var rightArray = new Array(end - mid);
        for (var i = 0; i < leftArray.length; i++) {
            leftArray[i] = this.array[start + i];
        }
        for (var i = 0; i < rightArray.length; i++) {
            rightArray[i] = this.array[mid + 1 + i];
        }
        var leftIndex = 0;
        var rightIndex = 0;
        var mergeIndex = start;
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            this.comparisons++;
            if (leftArray[leftIndex] <= rightArray[rightIndex]) {
                this.array[mergeIndex] = leftArray[leftIndex];
                leftIndex++;
            }
            else {
                this.array[mergeIndex] = rightArray[rightIndex];
                rightIndex++;
            }
            mergeIndex++;
            this.colors[mergeIndex] = 'lightblue'; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }
        while (leftIndex < leftArray.length) {
            this.array[mergeIndex] = leftArray[leftIndex];
            leftIndex++;
            mergeIndex++;
            this.colors[mergeIndex] = 'lightblue'; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }
        while (rightIndex < rightArray.length) {
            this.array[mergeIndex] = rightArray[rightIndex];
            rightIndex++;
            mergeIndex++;
            this.colors[mergeIndex] = 'lightblue'; // Color the merged element
            this.saveStep(this.delay / 1.5);
        }
        this.saveStep();
    };
    return MergeSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.MergeSort = MergeSort;
