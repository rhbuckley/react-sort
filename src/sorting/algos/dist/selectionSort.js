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
exports.SelectionSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of SelectionSort */
var SelectionSort = /** @class */ (function (_super) {
    __extends(SelectionSort, _super);
    function SelectionSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(n^2)';
        _this.spaceComplexity = 'O(1)';
        return _this;
    }
    SelectionSort.prototype.sort = function () {
        this.saveStep();
        for (var i = 0; i < this.size - 1; i++) {
            var minIndex = i;
            for (var j = i + 1; j < this.size; j++) {
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
    };
    return SelectionSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.SelectionSort = SelectionSort;
