import { BubbleSort } from "./bubbleSort";
import { SelectionSort } from "./selectionSort";
import { InsertionSort } from './insertionSort';
import { MergeSort } from "./mergeSort";
import { QuickSort } from "./quickSort";
import { Colors } from './helpers/colors';
import { RadixSort } from "./radixSort";


// This is the mapping of the sorting algorithm names to their respective classes
// and will be used in the SortingVisualizer component to create a new instance
// of the sorting algorithm class.

export const Algorithms = {
    bubble: BubbleSort,
    insertion: InsertionSort,
    merge: MergeSort,
    quick: QuickSort,
    selection: SelectionSort,
    radix: RadixSort,
};
  
export type AlgorithmName = keyof typeof Algorithms;
export const AlgorithmLiteral = Object.keys(Algorithms) as AlgorithmName[];

/** This is the interface used for representing each
 * step of the sorting algorithm. This will be used to
 * store the state of the array at each step of the
 * algorithm.
 */
export interface SortingStep {
    // This is the delay between this step and the next
    // step of the algorithm. 
    delay: number;

    // This is the array of objects that will be used to
    // represent the state of the array at this step of
    // the algorithm.
    data: SortingStepData[];

    // This is the description of the step of the algorithm.
    // This will be used to describe the step of the algorithm
    description?: string;

    // We want to know the statistics of the algorithm at
    // this step. This will be used to display the statistics
    // of the algorithm at this step.
    comparisons: number;
    accesses: number;
    swaps: number;
}

/**
 * This is the interface for representing the data
 * that is pertinent to the visualization of each step
 * ... value, percent, color
 */
export interface SortingStepData {
    value: number;
    percent: number;
    color: Colors;
}