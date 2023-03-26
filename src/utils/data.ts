export const getRandomArray = (barCount: number) =>
  [...Array(barCount)].map(() => Math.random() * 100);
