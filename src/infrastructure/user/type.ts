export interface UserDriver {
  fetch<T>(): Promise<T>;
}
