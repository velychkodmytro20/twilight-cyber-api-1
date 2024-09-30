export enum ApiResponseStatus {
  OK = "OK",
  FAILED = "FAILED",
}

export interface IApiResponse<T> {
  status: ApiResponseStatus;
  data?: T;
  error?: any;
}
