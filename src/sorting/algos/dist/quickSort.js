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
exports.QuickSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of QuickSort */
var QuickSort = /** @class */ (function (_super) {
    __extends(QuickSort, _super);
    function QuickSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(n log(n))';
        _this.spaceComplexity = 'O(log(n))';
        return _this;
    }
    QuickSort.prototype.sort = function () {
        this.saveStep();
        this.quickSort(0, this.size - 1);
        this.checkSort();
    };
    QuickSort.prototype.quickSort = function (start, end) {
        if (start < end) {
            var pivotIndex = this.partition(start, end);
            this.quickSort(start, pivotIndex - 1);
            this.quickSort(pivotIndex + 1, end);
        }
    };
    QuickSort.prototype.partition = function (start, end) {
        var pivotIndex = Math.floor((start + end) / 2);
        var pivotValue = this.array[pivotIndex];
        this.swap(pivotIndex, end); // Move pivot to the end
        this.colors[end] = 'lightgreen'; // Color the pivot
        var i = start;
        for (var j = start; j < end; j++) {
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
    };
    return QuickSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.QuickSort = QuickSort;
