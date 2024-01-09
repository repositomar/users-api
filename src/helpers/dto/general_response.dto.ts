export interface GeneralResponse<T> {
  code: number;
  messsage: string;
  data: T;
}

export interface GeneralResponsePaginated<T> extends GeneralResponse<T> {
  totalData: number;
  page: number;
}
