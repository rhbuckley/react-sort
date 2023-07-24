type SortingOrder = 'sorted' | 'sorted-desc' | 'normal' | 'normal-skew-left' | 'normal-skew-right' | 'perfect-bell-curve';
// Standard Normal variate using Box-Muller transform.

function generateNormalDistribution(mean: number, stdDev: number, size: number, skew: number = 0) {
    const distribution = [];
    
    for (let i = 0; i < size; i++) {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      
      const z1 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      const x = (mean + skew) * (z1 * stdDev);
      distribution.push(x);
    }

    console.log("Normal:", distribution);
    
    return distribution.map((val) => Math.floor(val + Math.max(distribution))) as number[];
}

function perfectBellCurve(size: number): number[] {
    const mid = Math.floor(size / 2);

    return new Array(size).fill(0).map((_, i) => {
      if (i <= mid) return i + 1;
      return size - i;
    })
}

export const customOrder = (order: SortingOrder, size: number): number[] => {
    // sorted-desc
    if (order === 'sorted-desc') return new Array(size).fill(0).map((_, i) => size - i);

    // normal
    if (order === 'normal') return generateNormalDistribution(size / 2, size / 4, size).map((x) => Math.round(x));

    // normal-skew-left
    if (order === 'normal-skew-left') return generateNormalDistribution(size / 4, size / 2, size).map((x) => Math.round(x), 1.2);

    // normal-skew-right
    if (order === 'normal-skew-right') return generateNormalDistribution(size / 4, size / 2, size).map((x) => Math.round(x), -1.2);

    // perfect-bell
    if (order === 'perfect-bell-curve') return perfectBellCurve(size);

    // sorted
    return new Array(size).fill(0).map((_, i) => i + 1);
}

export const sort5Elements = (arr: number[]): number[] => {
  let stop = -1;

  // just going to do a basic insertion sort
  for (let idx = 1 ; idx < arr.length && (idx < stop || stop === -1) ; idx++) {
    if (arr[idx] >= arr[idx - 1]) continue;
    if (stop === -1) stop = Math.floor(idx / 5) * 5 + 5;

    let j = idx;

    while (j > 0 && arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }

  return arr.slice();
};
