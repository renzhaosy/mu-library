export const tuple = <T extends string[]>(...args: T) => args;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  if (Object.getPrototypeOf(obj) === null) {
    return true
  }
  let proto = obj;
  while(Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === Object.getPrototypeOf(proto);
}
