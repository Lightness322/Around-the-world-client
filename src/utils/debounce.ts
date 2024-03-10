export function debounce(callback: Function, timeout: number) {
  let timerId: number

  return () => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(callback, timeout)
  }
}
