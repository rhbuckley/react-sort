"use strict";
exports.__esModule = true;
exports.AlgorithmLiteral = exports.Algorithms = void 0;
var bubbleSort_1 = require("./bubbleSort");
var selectionSort_1 = require("./selectionSort");
var insertionSort_1 = require("./insertionSort");
var mergeSort_1 = require("./mergeSort");
var quickSort_1 = require("./quickSort");
var radixSort_1 = require("./radixSort");
// This is the mapping of the sorting algorithm names to their respective classes
// and will be used in the SortingVisualizer component to create a new instance
// of the sorting algorithm class.
exports.Algorithms = {
    bubble: bubbleSort_1.BubbleSort,
    insertion: insertionSort_1.InsertionSort,
    merge: mergeSort_1.MergeSort,
    quick: quickSort_1.QuickSort,
    selection: selectionSort_1.SelectionSort,
    radix: radixSort_1.RadixSort
};
exports.AlgorithmLiteral = Object.keys(exports.Algorithms);
