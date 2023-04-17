export function debounce(fun, delay) {
  let timerId;
  return function (...params) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fun(...params);
    }, [delay]);
  };
}
