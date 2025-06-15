import { ResponseCode } from "../enums/ResponseCode.js";
import { ResponseData } from "./ResponseData.js";

export interface HttpResponse<M extends ResponseData> {
  data: M;
  message: string;
  status: ResponseCode;
}
