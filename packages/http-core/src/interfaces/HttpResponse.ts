import { ResponseCode } from "../enums/ResponseCode.js";
import { ResponseData } from "./ResponseData.js";

export interface HttpResponse<M extends ResponseData> {
  headers?: Headers;
  data: M;
  message: string;
  status: ResponseCode;
}
