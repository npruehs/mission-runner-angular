export interface NetworkResponse<T> {
  success: boolean;
  data: T;
  error: any;
}
