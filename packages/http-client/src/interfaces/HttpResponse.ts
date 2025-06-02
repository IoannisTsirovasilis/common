import { ResponseCode } from "../enums/ResponseCode";
import { ResponseData } from "./ResponseData";

export interface HttpResponse<M extends ResponseData> {
  data: M;
  message: string;
  status: ResponseCode;
}
