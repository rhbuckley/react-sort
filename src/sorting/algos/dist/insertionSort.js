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
exports.InsertionSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of InsertionSort */
var InsertionSort = /** @class */ (function (_super) {
    __extends(InsertionSort, _super);
    function InsertionSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(n^2)';
        _this.spaceComplexity = 'O(1)';
        return _this;
    }
    InsertionSort.prototype.sort = function () {
        this.saveStep();
        for (var i = 1; i < this.size; i++) {
            var j = i;
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
    };
    return InsertionSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.InsertionSort = InsertionSort;
