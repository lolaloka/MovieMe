export function debounce(time: number, cb: Function) {
  let timeout: any;
  return function(event: Event) {

    if (timeout)
        clearTimeout(timeout);

    timeout = setTimeout(() => cb(event), time)
  }
}
