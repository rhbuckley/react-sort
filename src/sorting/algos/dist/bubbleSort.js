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
exports.BubbleSort = void 0;
var SortingAlgorithm_1 = require("./helpers/SortingAlgorithm");
/** Implementation of BubbleSort */
var BubbleSort = /** @class */ (function (_super) {
    __extends(BubbleSort, _super);
    function BubbleSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeComplexity = 'O(n^2)';
        _this.spaceComplexity = 'O(1)';
        return _this;
    }
    BubbleSort.prototype.sort = function () {
        for (var i = 0; i < this.size - 1; i++) {
            for (var j = 0; j < this.size - 1 - i; j++) {
                this.comparisons++;
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1);
                }
            }
            this.saveStep();
        }
        this.checkSort();
    };
    return BubbleSort;
}(SortingAlgorithm_1.SortingAlgorithm));
exports.BubbleSort = BubbleSort;
