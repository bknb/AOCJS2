export const timedExecution = (fn, ...args) => {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}