export type Response<T> = {
  data: T;
};

export class ApiClient {
  request(path: string): Response<unknown> {
    throw new Error("省略してます");
  }
}
